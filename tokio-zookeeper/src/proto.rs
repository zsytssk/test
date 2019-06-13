use failure;
use tokio;
use tokio::prelude::*;

struct Packetizer<S> {
    stream: S,
}

fn wrap<S>(stream: S) -> Packetizer
where
    S: AsyncRead + AsyncWrite,
{
    Packetizer { stream }
}

impl<S> Sink for Packetizer<S>
where
    S: AsyncWrite,
{
    type SinkItem = ZookeeperRequest;
    type SinkError = failure::Error;
}
