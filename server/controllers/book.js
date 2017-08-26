const Book = require('../models/book.js');

const BookController = {
  create: (req, res) => {
    const newBook = new Book();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.synopsis = req.body.synopsis;
    newBook.borrowed = false;
    newBook.date_borrowed = null;
    newBook.date_returned = null;

    newBook.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(201).send({
        message: 'Book added successfully!',
      });
    });
  },

  update: (req, res) => {
    Book
    .findById(req.params.id, (err, book) => {
      if (err) {
        return res.status(404);
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.synopsis = req.body.synopsis;
      book.borrowed = req.body.borrowed;
      book.date_borrowed = req.body.dateOut;
      book.date_returned = req.body.dateIn;

      book.save((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send({
          message: 'Book updated successfully!',
        });
      });
    });
  },

  read: (req, res) => {
    Book.find({}, (err, books) => {
      if (err) return res.status(404);
      return res.status(200).send(books);
    });
  },

  delete: (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(501).send(err);
      return res.status(200).send({
        message: 'Delete successfull!',
      });
    });
  },
}

module.exports = BookController;
