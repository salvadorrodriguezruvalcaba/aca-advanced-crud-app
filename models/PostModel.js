const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const blogSchema = new Schema({
    'title' : String,
    'author': {type: String, required: true },
    'date' : String,
    'text' : String
});

module.exports = mongoose.model('posts', blogSchema);
