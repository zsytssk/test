use std::collections::BTreeMap;
use std::path::PathBuf;

pub struct Index {
    pub path:PathBuf,
    pub hashtree: BTreeMap<String, String>
}