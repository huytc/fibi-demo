const express = require('express');
const router = express.Router();
const Form = require('../db/models/form');
const Answer = require('../db/models/answer');

router.get('/', async function (req, res, next) {
    const { form } = req.query;
    const { username } = req.cookies;
    if (!form || form.username !== username) return res.status(400).send();
    try {
        const answers = await Answer.find({ form });
        res.json(answers);
    } catch {
        res.status(400).send();
    }
});

router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    const { username } = req.cookies;
    try {
        const answer = await Answer.findById(id);
        answer.populate('form').execPopulate();
        if (!answer || answer.form.username !== username) return res.status(400).send();
        res.json(answer);
    } catch {
        res.status(400).send();
    }
});

router.post('/', async function (req, res, next) {
    const formId = req.body.form;
    const data = req.body.data;
    try {
        const form = await Form.findById(formId);
        if (!form) return res.status(400).send();
        const answer = new Answer({ form: formId, data });
        await answer.save();
        res.status(200).send('Submit success');
    } catch {
        res.status(400).send();
    }
});

module.exports = router;
