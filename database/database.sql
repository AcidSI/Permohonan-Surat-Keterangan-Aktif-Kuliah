CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    role ENUM('mahasiswa', 'admin') NOT NULL
);

-- Contoh Data Dummy (Password di bawah adalah contoh teks biasa, nanti akan di-hash oleh rekan Anda)
INSERT INTO users (username, password, nama_lengkap, role) VALUES 
('211152xxxx', 'password123', 'Budi Mahasiswa', 'mahasiswa'),
-- ('admin_pweb', 'adminoke', 'Staf Akademik', 'admin');