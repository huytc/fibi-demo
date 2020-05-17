const express = require('express');
const router = express.Router();
const Form = require('../db/models/form');

/* GET forms listing. */
router.get('/', async function (req, res, next) {
  const { username } = req.cookies;
  const forms = await Form.find({ username });
  res.render('forms', { title: 'Form của tôi | Fibi', forms, username });
});

router.get('/new', function (req, res, next) {
  const { username } = req.cookies;
  res.render('new-form', { title: 'Tạo form | Fibi', username });
});

module.exports = router;
