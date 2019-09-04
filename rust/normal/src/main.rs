fn main() {
    let mut names = ["abe", "beth", "cory", "diane"];

    let alias = &mut names[0];
    *alias = "alex";
    println!("{}", names[0]);
}
