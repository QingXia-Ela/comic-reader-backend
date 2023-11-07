extern crate crypto;

use crypto::digest::Digest;

pub fn get_md5(data: String) -> String {
    let mut md5 = crypto::md5::Md5::new();
    // md5.
    md5.input_str(&data);
    md5.result_str()
}

pub fn encrypt(data: &Vec<u8>, key: String) -> Vec<u8> {
    let key = key.as_bytes();
    let mut res = vec![0; data.len()];
    for i in 0..data.len() {
        res[i] = data[i] ^ key[i % 32];
    }
    res
}

pub fn decrypt(data: &Vec<u8>, key: String) -> Vec<u8> {
    let key = key.as_bytes();
    let mut res = vec![0; data.len()];
    for i in 0..data.len() {
        res[i] = data[i] ^ key[i % 32];
    }
    res
}

pub fn aes_encrypt(data: &Vec<u8>, key: String) {
    todo!("")
}

pub fn aes_decrypt(data: &Vec<u8>, key: String) {
    todo!("")
}
