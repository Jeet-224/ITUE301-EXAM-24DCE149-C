const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required']
  },
  author: {
    type: String,
    required: [true, 'Book author is required']
  },
  category: {
    type: String,
    required: [true, 'Book category is required']
  },
  isbn: {
    type: String,
    required: [true, 'Book ISBN is required'],
    unique: true
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
