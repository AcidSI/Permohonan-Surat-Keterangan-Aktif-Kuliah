const bcrypt = require('bcrypt');

const passwordTeksBiasa = 'password123';

bcrypt.hash(passwordTeksBiasa, 10, (err, hash) => {
    if (err) throw err;
    console.log('--- HASIL HASH UNTUK DATABASE ---');
    console.log(hash);
    console.log('---------------------------------');
});