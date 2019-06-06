use tokio;
use tokio::prelude::*;
use failure;

pub(crate) struct Packetizer<S> {}

fn wrap<S>(stream: S) -> Packetizer
where S: AsyncRead + AsyncWrite {
    Packetizer {stream}
}

impl<S> Sink for Packetizer<S> {

}
