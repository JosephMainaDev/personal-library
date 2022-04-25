/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { ObjectId } = require('mongodb');
// MongoDB driver connection
const { dbConnection } = require('../db/conn');

const {
  books_get,
  book_post,
  books_delete,
  book_get,
  book_delete,
  book_comment
} = require('../controllers/controllers.js');

module.exports = function(app) {

  app.route('/api/books')
    .get(books_get)

    .post(book_post)

    .delete(books_delete)

  app.route('/api/books/:id')
    .get(book_get)

    .delete(book_delete)

    .post(book_comment)
};
