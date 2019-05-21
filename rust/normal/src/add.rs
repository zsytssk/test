use super::error::TgitError;

pub fn add_all(add_data: &Vec<&str>) -> Result<(), TgitError> {
    println!("{:?}", add_data);
    Ok(())
}
