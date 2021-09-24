const mongoose = require('mongoose');
// mongoose is mongoDB ORM
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        name: String,
        genre: String,
        authorId: String
    }
)

// model is a collection
// collection which is a book, with objects inside it that look like the bookSchema
module.exports = mongoose.model("Book", bookSchema)