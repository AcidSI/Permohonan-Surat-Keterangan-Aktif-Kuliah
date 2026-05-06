const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Konfigurasi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tb_pweb'
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Untuk memuat CSS
app.use(session({
    secret: 'kunci_rahasia_surat_aktif',
    resave: false,
    saveUninitialized: true
}));

// --- LOGIKA OTENTIKASI (Tugas 3) ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                // Simpan data ke Session
                req.session.loggedin = true;
                req.session.username = results[0].username;
                req.session.role = results[0].role;
                req.session.nama = results[0].nama_lengkap;

                // --- LOGIKA ACL (Tugas 4) ---
                // Redirect berdasarkan Role
                if (req.session.role === 'admin') {
                    res.redirect('/admin/dashboard');
                } else if (req.session.role === 'mahasiswa') {
                    res.redirect('/mahasiswa/dashboard');
                }
            } else {
                res.send('Username atau Password salah!');
            }
        });
    }
});

// Middleware untuk proteksi halaman (Hanya yang login bisa masuk)
const authCheck = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.send('Silahkan login terlebih dahulu!');
    }
};

// Route Dashboard Mahasiswa
app.get('/mahasiswa/dashboard', authCheck, (req, res) => {
    if (req.session.role !== 'mahasiswa') return res.status(403).send('Akses Dilarang!');
    res.send(`<h1>Halo Mahasiswa, ${req.session.nama}</h1><p>Ini halaman permohonan surat.</p> <a href="/logout">Logout</a>`);
});

// Route Dashboard Admin
app.get('/admin/dashboard', authCheck, (req, res) => {
    if (req.session.role !== 'admin') return res.status(403).send('Akses Dilarang!');
    res.send(`<h1>Halo Admin, ${req.session.nama}</h1><p>Ini halaman kelola surat mahasiswa.</p> <a href="/logout">Logout</a>`);
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});