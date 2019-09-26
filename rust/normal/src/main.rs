#[macro_export]
macro_rules! vt {
    [ $( $x:ident ),* ] => {
        {
            $(
                $x = 1;
            )*
        }
    };
}

fn main() {
    let mut x;
    let mut y;
    let mut z;
    vt! {x, y, z};
    println!("{} {} {}", x, y, z);
}
