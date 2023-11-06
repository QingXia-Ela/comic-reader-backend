extern crate crypto;

use crypto::aes::{ecb_decryptor, ecb_encryptor, KeySize};
use crypto::buffer::{ReadBuffer, WriteBuffer};
use crypto::digest::Digest;

pub fn get_md5(data: String) -> String {
    let mut md5 = crypto::md5::Md5::new();
    // md5.
    md5.input_str(&data);
    md5.result_str()
}

pub fn encrypt(data: &mut Vec<u8>, key: String) -> Vec<u8> {
    let mut encryptor = ecb_encryptor(
        KeySize::KeySize128,
        key.as_bytes(),
        crypto::blockmodes::NoPadding,
    );
    let mut buffer = [0; 16];
    let mut read_buffer = crypto::buffer::RefReadBuffer::new(data);
    let mut write_buffer = crypto::buffer::RefWriteBuffer::new(&mut buffer);

    encryptor
        .encrypt(&mut read_buffer, &mut write_buffer, true)
        .unwrap();
    write_buffer.take_read_buffer().take_remaining().to_vec()
}

pub fn decrypt(data: &mut Vec<u8>, key: String) -> Vec<u8> {
    let mut decryptor = ecb_decryptor(
        KeySize::KeySize128,
        key.as_bytes(),
        crypto::blockmodes::NoPadding,
    );
    let mut buffer = [0; 16];
    let mut read_buffer = crypto::buffer::RefReadBuffer::new(data);
    let mut write_buffer = crypto::buffer::RefWriteBuffer::new(&mut buffer);

    let _ = decryptor.decrypt(&mut read_buffer, &mut write_buffer, true);
    write_buffer.take_read_buffer().take_remaining().to_vec()
}
