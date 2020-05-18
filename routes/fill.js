const express = require('express');
const router = express.Router();
const Form = require('../db/models/form');

router.get('/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
        const form = await Form.findById(id);
        if (!form) return next();
        res.render('form-fill', { title: `${form.name} | Fibi`, id, data: JSON.stringify(form.data) });
    } catch {
        next();
    }
});

module.exports = router;
