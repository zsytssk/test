extern crate futures;
extern crate tokio;

use futures::stream::Stream;
use std::io::prelude::*;
use std::net::SocketAddr;
use tokio::net::{TcpListener, TcpStream};

fn process_socket(mut socket: TcpStream) {
    socket.read();
    socket.write(b"sdfsdfsdfsdfsdfs");
    // ...
}

fn main() -> Result<(), Box<std::error::Error>> {
    let addr = "127.0.0.1:8080".parse::<SocketAddr>()?;
    let listener = TcpListener::bind(&addr)?;

    // accept connections and process them
    tokio::run(
        listener
            .incoming()
            .map_err(|e| eprintln!("failed to accept socket; error = {:?}", e))
            .for_each(|socket| {
                println!("sdfsdfsd");
                process(socket);
                Ok(())
            }),
    );
    Ok(())
}

fn process(socket: TcpStream) {
    // Wrap the socket with the `Lines` codec that we wrote above.
    //
    // By doing this, we can operate at the line level instead of doing raw byte
    // manipulation.
    let lines = Lines::new(socket);

    // The first line is treated as the client's name. The client is not added
    // to the set of connected peers until this line is received.
    //
    // We use the `into_future` combinator to extract the first item from the
    // lines stream. `into_future` takes a `Stream` and converts it to a future
    // of `(first, rest)` where `rest` is the original stream instance.
    let connection = lines
        .into_future()
        // `into_future` doesn't have the right error type, so map the error to
        // make it work.
        .map_err(|(e, _)| e)
        // Process the first received line as the client's name.
        .and_then(|(name, lines)| {
            // If `name` is `None`, then the client disconnected without
            // actually sending a line of data.
            //
            // Since the connection is closed, there is no further work that we
            // need to do. So, we just terminate processing by returning
            // `future::ok()`.
            //
            // The problem is that only a single future type can be returned
            // from a combinator closure, but we want to return both
            // `future::ok()` and `Peer` (below).
            //
            // This is a common problem, so the `futures` crate solves this by
            // providing the `Either` helper enum that allows creating a single
            // return type that covers two concrete future types.
            let name = match name {
                Some(name) => name,
                None => {
                    // The remote client closed the connection without sending
                    // any data.
                    return Either::A(future::ok(()));
                }
            };

            println!("`{:?}` is joining the chat", name);

            // Create the peer.
            //
            // This is also a future that processes the connection, only
            // completing when the socket closes.
            let peer = Peer::new(name, state, lines);

            // Wrap `peer` with `Either::B` to make the return type fit.
            Either::B(peer)
        })
        // Task futures have an error of type `()`, this ensures we handle the
        // error. We do this by printing the error to STDOUT.
        .map_err(|e| {
            println!("connection error = {:?}", e);
        });

    // Spawn the task. Internally, this submits the task to a thread pool.
    tokio::spawn(connection);
}
