const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const path = require('path');

// Setup koneksi DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tb_pweb' 
});

exports.index = (req, res) => {
    res.redirect('/login');
};

exports.loginPage = (req, res) => {
    // Memanggil file index.html dari folder public
    res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    // --- 1. VALIDASI INPUT ---
    if (!username || !password) {
        return res.send('Validasi Gagal: Username dan Password tidak boleh kosong!');
    }
    
    // Validasi panjang karakter (misal minimal 5 karakter)
    if (username.length < 5 || password.length < 5) {
        return res.send('Validasi Gagal: Input minimal 5 karakter!');
    }

    // --- 2. QUERY KE DATABASE ---
    // Gunakan JOIN untuk mengambil nama_role dari tabel roles
    const query = `
        SELECT users.*, roles.nama_role 
        FROM users 
        JOIN roles ON users.role_id = roles.id 
        WHERE username = ?
    `;

    db.query(query, [username], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];

            // --- 3. HASH BCRYPT CHECK ---
            // Membandingkan password inputan dengan hash di database
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // --- 4. SET SESSION ---
                req.session.loggedin = true;
                req.session.username = user.username;
                req.session.role = user.nama_role;
                req.session.nama = user.nama_lengkap;

                // Redirect sesuai role
                res.redirect('/home');
            } else {
                res.send('Password salah!');
            }
        } else {
            res.send('Username tidak ditemukan!');
        }
    });
};

exports.home = (req, res) => {
    // Menampilkan halaman berdasarkan role
    if (req.session.role === 'admin') {
        res.send(`<h1>Dashboard Admin</h1><p>Selamat datang, ${req.session.nama}.</p><a href="/logout">Logout</a>`);
    } else {
        res.send(`<h1>Dashboard Mahasiswa</h1><p>Selamat datang, ${req.session.nama}.</p><a href="/logout">Logout</a>`);
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};