#[no_mangle]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
#[no_mangle]
pub fn sum(arr: &[i32]) -> i32 {
    let vec = arr.to_vec();
    let mut sum = 0;
    for i in vec {
        sum += i;
    }
    return sum;
}
