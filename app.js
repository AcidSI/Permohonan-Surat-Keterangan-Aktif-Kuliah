const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Konfigurasi Session
app.use(session({
    secret: 'kunci_rahasia_super_aman',
    resave: false,
    saveUninitialized: true
}));

// Middleware bawaan
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Folder CSS

// --- MEMANGGIL FILE ROUTE ---
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Menjalankan Server
app.listen(3000, () => {
    console.log('Server menyala dan terhubung ke arsitektur MVC di http://localhost:3000');
});