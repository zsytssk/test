pub fn connect() {
    test::connect();
}

pub mod test {
    pub fn connect() {
        ::network::connect();
        println!("server connected");
    }
}
