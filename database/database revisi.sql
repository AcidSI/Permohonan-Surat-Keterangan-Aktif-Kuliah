--Tabel Roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_role VARCHAR(50) NOT NULL UNIQUE
);

--Tabel Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Diperlebar menjadi 255 untuk Bcrypt
    nama_lengkap VARCHAR(100) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Data Dummy Role
INSERT INTO roles (nama_role) VALUES ('admin'), ('mahasiswa');

-- Data Dummy User
-- Catatan: Password di bawah ini adalah hasil HASH bcrypt dari kata sandi: "password123"
INSERT INTO users (username, password, nama_lengkap, role_id) VALUES 
('211152xxxx', '$2b$10$Rqu5Ibko3kpCiCocjvB/W.A5mRsbUTr3P3.TMg9IZTxwy8AXez.0y', 'Budi Mahasiswa', 2),
('admin_pweb', '$2b$10$Rqu5Ibko3kpCiCocjvB/W.A5mRsbUTr3P3.TMg9IZTxwy8AXez.0y', 'Staf Akademik', 1);