#[derive(Debug)]
pub struct Config {
    dir_mode: bool,
    file_path: String,
    dir_path: String,
    output_path: String,
}

impl Config {
    pub fn new(args: &[String]) -> Config {
        let dir_mode = args.contains(&String::from("--dir"));
        let custom_output = args.contains(&String::from("--output"));
        Config {
            dir_mode,
            file_path: if dir_mode {
                String::new()
            } else {
                args[1].clone()
            },
            dir_path: if dir_mode {
                args[2].clone()
            } else {
                String::new()
            },
            output_path: if custom_output {
                args[4].clone()
            } else {
                String::new()
            },
        }
    }
}
