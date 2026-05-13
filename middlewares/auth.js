// Memastikan user sudah login
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.loggedin) {
        return next();
    }
    res.redirect('/login');
};

// Logika ACL (Permission checking)
const checkRole = (roleDiminta) => {
    return (req, res, next) => {
        if (req.session.role === roleDiminta) {
            next();
        } else {
            res.status(403).send('Akses Dilarang: Anda tidak memiliki izin (Permission Denied).');
        }
    };
};

module.exports = { isAuthenticated, checkRole };