const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    form: { type: mongoose.SchemaTypes.ObjectId, ref: 'Form' },
    date: { type: Date, default: Date.now },
    data: 'string'
});
module.exports = mongoose.model('Answer', schema);