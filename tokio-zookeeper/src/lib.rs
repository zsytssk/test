use tokio::prelude::*;
use std::net::SocketAddr;
use failure::ResultExt;

mod proto;

pub struct ZooKeeper {}
impl ZooKeeper {
    pub connect(addr: &SocketAddr) -> impl Future<Item = Self, Error = failure::Error> {
        tokio::net::TcpStream::connect(addr: &SocketAddr).and_then(|stream| {

        })
    }
    pub handshake(stream: tokio::net::TcpStream) -> impl Future<Item = Self, Error = failure::Error> {
        let request = proto::Connect {};
        let mut stream = proto::wrap(stream);
        stream.send(request).and_then(|stream| {
            stream.receive()
        }).and_then(|(response, stream)| {
            ZooKeeper {}
        })
    }
}