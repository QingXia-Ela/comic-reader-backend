use image::DynamicImage;

pub struct ImgData {
    pub width: u32,
    pub height: u32,
    pub data: Vec<u8>,
}

impl ImgData {
    pub fn new(width: u32, height: u32) -> Self {
        ImgData {
            width,
            height,
            data: vec![255; (width * height * 4) as usize],
        }
    }
}

impl From<(u32, u32, Vec<u8>)> for ImgData {
    fn from(data: (u32, u32, Vec<u8>)) -> Self {
        let (width, height, data) = data;
        ImgData {
            width,
            height,
            data,
        }
    }
}

impl Into<ImgData> for DynamicImage {
    fn into(self) -> ImgData {
        let (width, height) = (self.width(), self.height());
        let data = self.to_rgba8().into_vec();
        ImgData {
            width,
            height,
            data,
        }
    }
}

impl Into<Option<DynamicImage>> for ImgData {
    fn into(self) -> Option<DynamicImage> {
        let (width, height) = (self.width, self.height);
        let data = self.data;
        if let Some(v) = image::RgbaImage::from_raw(width, height, data) {
            Some(DynamicImage::ImageRgba8(v))
        } else {
            None
        }
    }
}
