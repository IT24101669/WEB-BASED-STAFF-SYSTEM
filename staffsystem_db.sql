CREATE DATABASE IF NOT EXISTS staffsystem_db
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'staffuser'@'localhost' IDENTIFIED BY 'Staff@123';
GRANT ALL PRIVILEGES ON staffsystem_db.* TO 'staffuser'@'localhost';
FLUSH PRIVILEGES;