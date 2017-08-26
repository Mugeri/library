const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  'title': String,
  'author': String,
  'synopsis': String,
  'user_id': Number,
  'borrowed': Boolean,
  'date_borrowed': Date,
  'date_returned': Date,
});

module.exports = mongoose.model('Book', bookSchema);
