/// A filter over an iterator
struct Filter<I, F> {
    iter: I,
    pred: F,
}

/// Constructs a filter
fn filter<I, F>(iter: I, pred: F) -> Filter<I, F> {
    Filter { iter: iter, pred: pred }
}

impl<I, F> Iterator for Filter<I, F>
    where I: Iterator,
          F: Fn(&I::Item) -> bool,  // Magic! What's the lifetime?
{
    type Item = I::Item;

    fn next(&mut self) -> Option<I::Item> {
        while let Some(val) = self.iter.next() {
            if (self.pred)(&val) {
                return Some(val);
            }
        }
        None
    }
}

fn main() {
    let x = vec![1, 2, 3, 4, 5];
    for v in filter(x.into_iter(), |v: &i32| *v % 2 == 0) {
        println!("{}", v); // 2, 4
    }
}