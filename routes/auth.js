const express = require('express');
const router = express.Router();

const users = {
  'fibi': 'fibi'
};

router.get('/login', function (req, res, next) {
  if (!!req.cookies.username) res.redirect('/forms');
  else res.render('login', { title: 'Đăng nhập | Fibi', fail: req.query.fail });
});

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  if (users[username] === password) {
    res.cookie('username', username, { httpOnly: true });
    res.redirect('/forms');
  } else {
    res.redirect('/auth/login?fail=1');
  }
});

router.get('/logout', function (req, res, next) {
  res.clearCookie('username');
  res.redirect('/');
});

module.exports = router;
