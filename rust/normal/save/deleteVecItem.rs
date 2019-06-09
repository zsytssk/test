let mut v = vec![1, 2, 3, 4, 5];
for i in 0..v.len() {
    if v[i] == 2 {
        v.swap_remove(i);
        break;
    }
}