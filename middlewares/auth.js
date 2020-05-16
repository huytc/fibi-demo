module.exports = function (options) {
    return function (req, res, next) {
        if (!!req.cookies.username) next();
        else res.redirect('/auth/login');
    };
}