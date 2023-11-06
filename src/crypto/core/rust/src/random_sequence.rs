use crate::random::Random;

pub struct RandomSequence {
    rng: Random,
    list: Vec<u32>,
    next_min: usize,
}

impl RandomSequence {
    pub fn new(length: usize, seed: String) -> RandomSequence {
        let mut list = vec![0; length];
        for i in 0..length {
            list[i] = i as u32;
        }
        RandomSequence {
            rng: Random::new(seed),
            list,
            next_min: 0,
        }
    }

    pub fn next(&mut self) -> u32 {
        if self.next_min >= self.list.len() {
            self.next_min = 0;
        }
        let index =
            self.rng
                .randint(self.next_min as i32, (self.list.len() - 1) as i32) as usize;
        let res = self.list.get(index).unwrap().to_owned();
        self.list[index] = self.list[self.next_min];
        self.list[self.next_min] = res;
        self.next_min += 1;
        res
    }
}
