mod types;

use types::{Commutator, CommandEntry, BannerEntry};
use regex::Regex;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            hello_world
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn hello_world() -> String {
    "Hello World!".into()
}
