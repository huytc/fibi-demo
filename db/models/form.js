const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: 'string',
    name: 'string', 
    data: 'string',
    url: 'string'
});
module.exports = mongoose.model('Form', schema);