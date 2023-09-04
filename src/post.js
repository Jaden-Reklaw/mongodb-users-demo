const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Nested Document
const PostSchema = new Schema({
    title: String,
    content: String
});

module.exports = PostSchema;