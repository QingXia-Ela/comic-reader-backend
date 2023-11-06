use std::time::Instant;

use crate::{buffer_disorder::get_md5, core::encrypt_img};
extern crate crypto;

use image::{io::Reader, DynamicImage};

mod buffer_disorder;
mod core;
mod img_data;
mod random;
mod random_sequence;

fn main() {
    // println!("Hello, world!");
    let img = Reader::open("./test.jpg").unwrap().decode().unwrap();
    // let enc_img: Option<DynamicImage> = encrypt_img(img.into()).into();
    // enc_img.unwrap().save("./enc.jpg").unwrap();

    println!("{:?}", get_md5(String::from("test")).as_bytes());
    // let arr: Vec<u8> = img.as_rgba8().unwrap().to_vec();
}
