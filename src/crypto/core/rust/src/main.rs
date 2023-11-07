use std::{env, fs::File, io::Read, time::Instant};

use crate::{
    buffer_disorder::{decrypt, encrypt, get_md5},
    core::encrypt_img,
};
extern crate crypto;

mod buffer_disorder;
mod config;
mod core;
mod img_data;
mod random;
mod random_sequence;

fn main() {
    // let mut buffer = Vec::new();
    // File::open("./test.jpg")
    //     .unwrap()
    //     .read_to_end(&mut buffer)
    //     .unwrap();
    let args: Vec<String> = env::args().collect();
    let config = config::Config::new(&args);
    println!("{:?}", config);
}
