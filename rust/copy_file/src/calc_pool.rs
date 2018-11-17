use std::thread;

pub struct CalcPool<T>
where
    T: Fn() + Send,
{
    items: Vec<Box<T>>,
    num: u32,
}

impl<T> CalcPool<T>
where
    T: Fn() + Send,
{
    pub fn new() -> CalcPool<T> {
        CalcPool {
            items: vec![],
            num: 0,
        }
    }

    pub fn add(&mut self, fun: Box<T>) {
        self.items.push(fun);
        self.calc();
    }

    fn calc(&mut self) {
        if self.num > 3 {
            return;
        }
        if self.items.is_empty() {
            return;
        }
        let first_item_arr: Vec<Box<T>> = self.items.drain(0..1).collect();
        let first_fn = first_item_arr[0];
        thread::spawn(*first_fn);
    }
}
