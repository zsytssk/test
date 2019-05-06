extern crate tokio;

use std::fs::File;
use std::net::SocketAddr;
use std::net::ToSocketAddrs;
use tokio::io::{read_to_end, write_all};
use tokio::net::TcpStream;
use tokio::prelude::*;

fn download(host: String, path: String, filename: String) -> impl Future<Item = (), Error = ()> {
    let mut addr_iter = host.to_socket_addrs().unwrap();
    let addr = match addr_iter.next() {
        None => panic!("DNS resolution failed"),
        Some(addr) => addr,
    };
    let req_body = format!(
        "GET {} HTTP/1.1\r\nHost: {}:80\r\nConnection: close\r\n\r\n",
        path, host,
    );

    TcpStream::connect(&addr)
        .and_then(|stream| {
            write_all(stream, req_body).and_then(|(stream, _body)| {
                let buffer = vec![];
                read_to_end(stream, buffer).and_then(|(_stream, buffer)| {
                    File::create(filename).and_then(|mut file| file.write_all(&buffer))
                })
            })
        })
        .map_err(|e| eprintln!("Error occured: {:?}", e))
}

fn resolve_addr(host: &str) -> Result<SocketAddr, String> {
    let mut addr_iter = match host.to_socket_addrs() {
        Ok(addr_iter) => addr_iter,
        Err(e) => return Err(format!("Invalid host name {:?}: {:?}", host, e)),
    };

    match addr_iter.next() {
        None => Err(format!("No addresses found for host: {:?}", host)),
        Some(addr) => Ok(addr),
    }
}

fn main() {
    tokio::run(future::poll_fn(|| {
        let mut args = std::env::args().skip(1);
        loop {
            match (args.next(), args.next(), args.next()) {
                (Some(host), Some(path), Some(filename)) => {
                    tokio::spawn(download(host, path, filename));
                }
                _ => return Ok(Async::Ready(())),
            }
        }
    }))
}
