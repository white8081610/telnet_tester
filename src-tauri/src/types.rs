use std::collections::HashMap;
use regex::Regex;

// Базовая структура для команд и баннеров
#[derive(Debug, Clone)]
pub struct CommandEntry {
    pub command: String,       // Команда (например, "show interfaces")
    pub pattern: Regex,        // Регулярное выражение для парсинга ответа
}

// Если баннеры требуют собственной логики, вынесите в отдельную структуру
#[derive(Debug, Clone)]
pub struct BannerEntry {
    pub banner: String,        // Текст баннера
    pub pattern: Regex,        // Условие для выбора баннера
}

// Основной коммутатор
pub struct Commutator {
    pub model: String,                            // Модель коммутатора
    pub commands: HashMap<String, CommandEntry>,  // Ключ: имя команды (например, "get_interfaces")
    pub banners: HashMap<String, BannerEntry>,    // Ключ: имя баннера (например, "login_banner")
}