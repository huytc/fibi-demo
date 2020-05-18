const express = require('express');
const router = express.Router();
const Form = require('../db/models/form');
const Answer = require('../db/models/answer');
const us = require('../utils/url-shortener');

const { FILL_FORM_URL } = process.env;

router.get('/', async function (req, res, next) {
  const { username } = req.cookies;
  const forms = await Form.find({ username });
  res.render('forms', { title: 'Form của tôi | Fibi', forms, username, new: req.query.new });
});

router.get('/new', function (req, res, next) {
  const { username } = req.cookies;
  res.render('form-create', { title: 'Tạo form | Fibi', username });
});

router.get('/:id', async function (req, res, next) {
  const { username } = req.cookies;
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) {
      res.render('form', { title: 'Lỗi | Fibi', username, error: 'Không tìm thấy form' });
    } else if (form.username !== username) {
      res.render('form', { title: 'Lỗi | Fibi', username, error: 'Bạn không có quyền truy cập form này' });
    } else {
      const { name, url } = form;
      const answers = await Answer.find({ form: form._id });
      const answerData = answers.map(answer => JSON.parse(answer.data));
      const formData = JSON.parse(form.data);

      const headers = formData.pages[0].elements.map(element => {
        return {
          name: element.name,
          title: element.title
        };
      });

      for (const item of answerData) {
        for (const questionName of Object.keys(item)) {
          const choiceName = item[questionName];
          const question = formData.pages[0].elements.find(question => question.name === questionName);
          for (const choice of question.choices) {
            if (choice === choiceName) break;
            if (choice.value === choiceName) {
              item[questionName] = choice.text;
              break;
            }
          }
        }
      }

      res.render('form', {
        title: `${form.name} | Fibi`, username, id, name, url, answers: JSON.stringify(answerData),
        numAnswers: answers.length, headers: headers
      });
    }
  } catch {
    res.render('form', { title: 'Lỗi | Fibi', username, error: 'Không tìm thấy form' });
  }
});

router.get('/:id/edit', async function (req, res, next) {
  const { username } = req.cookies;
  const { id } = req.params;
  try {
    const form = await Form.findById(id);
    if (!form) {
      res.render('form', { title: 'Lỗi | Fibi', username, error: 'Không tìm thấy form' });
    } else if (form.username !== username) {
      res.render('form', { title: 'Lỗi | Fibi', username, error: 'Bạn không có quyền truy cập form này' });
    } else {
      const { name, url, data } = form;
      res.render('form-edit', { title: `${form.name} | Fibi`, username, id, name, url, data: JSON.stringify(data) });
    }
  } catch {
    res.render('form', { title: 'Lỗi | Fibi', username, error: 'Không tìm thấy form' });
  }
});

router.post('/', async function (req, res, next) {
  const { username } = req.cookies;
  const dataString = req.body.data;
  const data = JSON.parse(dataString);
  const form = new Form({
    username,
    name: data.title,
    data: dataString
  });
  const url = `${FILL_FORM_URL}/${form._id}`;
  const shortUrl = await us.shorten(url);
  form.url = shortUrl || url;
  await form.save();
  res.status(200).send(form._id);
});

router.post('/:id', async function (req, res, next) {
  const { username } = req.cookies;
  const { id } = req.params;
  const dataString = req.body.data;
  const data = JSON.parse(dataString);

  try {
    const form = await Form.findById(id);
    if (!form) return res.status(404).send();
    if (form.username !== username) return res.status(403).send();

    form.name = data.title;
    form.data = dataString;
    await form.save();

    res.status(200).send(form._id);
  } catch {
    res.status(400).send();
  }
});

router.delete('/:id', async function (req, res, next) {
  const { username } = req.cookies;
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) res.status(404).send();
    if (form.username !== username) return res.status(403).send();
    await form.remove();

    res.status(200).send(form._id);
  } catch {
    res.status(400).send();
  }
});

module.exports = router;
