const mongoose = require('mongoose');
// mongoose is mongoDB ORM
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
})

// model is a collection
// collection which is a book, with objects inside it that look like the bookSchema
module.exports = mongoose.model("Author", authorSchema);