const express = require('express');
const router = express.Router();

/* GET forms listing. */
router.get('/', function (req, res, next) {
  const { username } = req.cookies;
  res.render('forms', { title: 'Form của tôi | Fibi', forms: forms });
});

module.exports = router;
