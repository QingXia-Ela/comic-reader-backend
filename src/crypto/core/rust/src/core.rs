use crate::{img_data::ImgData, random_sequence::RandomSequence};

const DEFAULT_SEED: &str = "114514";

pub fn decrypt_img(img_data: ImgData) -> ImgData {
    let mut core = Core::new(img_data);
    core.decrypt()
}

pub fn encrypt_img(img_data: ImgData) -> ImgData {
    let mut core = Core::new(img_data);
    core.encrypt()
}

struct Core {
    img_data: ImgData,
}

impl Core {
    pub fn new(img_data: ImgData) -> Self {
        Self { img_data }
    }

    pub fn encrypt(&mut self) -> ImgData {
        self.do_common(|dst_img, block_x, block_y, new_block_x, new_block_y| {
            Self::copy_block(
                dst_img,
                new_block_x,
                new_block_y,
                &self.img_data,
                block_x,
                block_y,
            );
        })
    }

    pub fn decrypt(&mut self) -> ImgData {
        self.do_common(|dst_img, block_x, block_y, new_block_x, new_block_y| {
            Self::copy_block(
                dst_img,
                block_x,
                block_y,
                &self.img_data,
                new_block_x,
                new_block_y,
            )
        })
    }

    /// todo! explain copy_fn usage
    fn do_common<T>(&self, copy_fn: T) -> ImgData
    where
        T: Fn(&mut ImgData, u32, u32, u32, u32),
    {
        let block_width = self.img_data.width / 8;
        let block_height = self.img_data.height / 8;

        let mut result = ImgData::new(block_height * 8, block_height * 8);
        let mut seq = RandomSequence::new(
            (block_width * block_height) as usize,
            DEFAULT_SEED.to_string(),
        );

        for y in 0..block_height {
            for x in 0..block_width {
                let i = seq.next();
                let new_block_x = i % block_width;
                let new_block_y = i / block_width;
                copy_fn(&mut result, x, y, new_block_x, new_block_y);
            }
        }
        return result;
    }

    fn copy_block(
        dst_img: &mut ImgData,
        dst_block_x: u32,
        dst_block_y: u32,
        src_img: &ImgData,
        src_block_x: u32,
        src_block_y: u32,
    ) {
        let mut dst_start = ((dst_block_x + dst_block_y * dst_img.width) * 8 * 4) as usize;
        let mut src_start = ((src_block_x + src_block_y * src_img.width) * 8 * 4) as usize;
        for _ in 0..8 {
            for j in 0..8 * 4 {
                dst_img.data[dst_start + j] = src_img.data[src_start + j];
            }
            dst_start += (dst_img.width * 4) as usize;
            src_start += (src_img.width * 4) as usize;
        }
    }
}
