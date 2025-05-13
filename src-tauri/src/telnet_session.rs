use telnet::{Telnet, Event};
use std::io::{Result as IoResult, Write};

pub struct TelnetSession {
    telnet: Telnet,
    prompt: Vec<u8>,
}

impl TelnetSession {
    /// Подключается к устройству, проходит авторизацию
    pub fn connect(ip: &str, port: u16, username: &str, password: &str) -> anyhow::Result<Self> {
        let mut telnet = Telnet::connect((ip, port), 1024 * 1024)
            .map_err(|e| anyhow::anyhow!("Connection failed: {}", e))?;

        Self::expect_and_send(&mut telnet, b"login:", username.as_bytes())?;
        Self::expect_and_send(&mut telnet, b"Password:", password.as_bytes())?;

        let prompt = Self::detect_prompt(&mut telnet)?;

        Ok(Self {
            telnet,
            prompt,
        })
    }

    /// Считывает приветственное сообщение от устройства (баннер)
    pub fn read_banner(&mut self) -> anyhow::Result<Vec<u8>> {
        let mut buffer = Vec::new();

        loop {
            match self.telnet.read()? {
                Event::Data(bytes) => {
                    buffer.extend_from_slice(&bytes);
                    // Останавливаемся, если найдено начало строки авторизации
                    if buffer.windows(b"login:".len()).any(|w| w == b"login:") {
                        break;
                    }
                }
                Event::TimedOut => return Err(anyhow::anyhow!("Banner read timed out")),
                Event::WouldBlock => continue,
            }
        }

        Ok(buffer)
    }

    /// Выполняет команду и возвращает результат
    pub fn exec(&mut self, cmd: &str) -> anyhow::Result<String> {
        self.telnet.write(cmd.as_bytes())?;
        self.telnet.write(b"\r\n")?;
        let output = self.read_until_prompt()?;
        Ok(String::from_utf8_lossy(&output).to_string())
    }

    /// Закрывает соединение
    pub fn close(self) -> IoResult<()> {
        Ok(())
    }

    // === Вспомогательные методы ===

    fn expect_and_send(telnet: &mut Telnet, expected: &[u8], data: &[u8]) -> anyhow::Result<()> {
        let _ = Self::read_until(telnet, expected)?;
        telnet.write(data)?;
        telnet.write(b"\r\n")?;
        Ok(())
    }

    fn detect_prompt(telnet: &mut Telnet) -> anyhow::Result<Vec<u8>> {
        let buffer = Self::read_until(telnet, b">")?;
        Ok(vec![b'>'])
    }

    fn read_until(&mut self, expected: &[u8]) -> anyhow::Result<Vec<u8>> {
        let mut result = Vec::new();

        loop {
            match self.telnet.read()? {
                Event::Data(bytes) => {
                    result.extend_from_slice(&bytes);
                    if result.windows(expected.len()).any(|w| w == expected) {
                        break;
                    }
                }
                Event::TimedOut => return Err(anyhow::anyhow!("Read timed out")),
                Event::WouldBlock => continue,
            }
        }

        if let Some(pos) = result.windows(expected.len()).position(|w| w == expected) {
            result.truncate(pos + expected.len());
        }

        Ok(Self::strip_prompt(&result, &self.prompt)?)
    }

    fn strip_prompt(data: &[u8], prompt: &[u8]) -> anyhow::Result<Vec<u8>> {
        if data.ends_with(prompt) {
            Ok(data[..data.len() - prompt.len()].to_vec())
        } else {
            Ok(data.to_vec())
        }
    }
}