pub struct Random {
    rng_state: [u32; 2],
}

fn get_rng_state(seed: String) -> [u32; 2] {
    let seed = hash_code(seed);
    [seed & 0xFFFF, seed >> 16]
}

fn hash_code(str: String) -> u32 {
    let mut hash: u32 = 0;

    for i in str.chars() {
        hash = (hash * 31 + ((i as u8) as u32)) & 0xFFFFFFFF;
    }

    hash
}

impl Random {
    pub fn new(seed: String) -> Self {
        Random {
            rng_state: get_rng_state(seed),
        }
    }

    pub fn random(&mut self) -> f64 {
        let [r0, r1] = self.rng_state;
        let r0 = 18030 * (r0 & 0xFFFF) + (r0 >> 16);
        let r1 = 36969 * (r1 & 0xFFFF) + (r1 >> 16);

        self.rng_state = [r0, r1];

        let x = (r0 << 16) + (r1 & 0xFFFF);

        (x as f64) * 2.3283064365386962890625e-10
    }

    pub fn randint(&mut self, min: i32, max: i32) -> i32 {
        (self.random() * (max - min) as f64) as i32 + min
    }
}
