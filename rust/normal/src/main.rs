mod executor;
mod timer_future;

use std::time::Duration;

use executor::new_excutor_and_spawner;

fn main() {
    let (executor, spawner) = new_excutor_and_spawner();
    spawner.spawn(async {
        println!("howdy!");
        TimerFuture::new(Duration::new(2, 0)).await;
        println!("done!");
    });
    drop(spawner);
    executor.run();
}
