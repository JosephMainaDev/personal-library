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
  books_delete
} = require('../controllers/controllers.js');

module.exports = function(app) {

  app.route('/api/books')
    .get(books_get)

    .post(book_post)

    .delete(books_delete)
/*
    .delete(function(req, res) {
      // DELETE all books in database
      //if successful response will be 'complete delete successful'
      const dbConnect = dbo.getDb();
      // dbConnect.drop(function(err, result) {
      dbConnect
        .collection('books')
        .deleteMany({}, function(err, result) {//.deleteMany
          if (err) throw (err);
          if (result.deletedCount) {
            return res.send('complete delete successful');
          } else {
            return res.send('no book exists');
          }
        })
    });


  app.route('/api/books/:id')
    .get(function(req, res) {
      // GET a single book that matches _id
      // Response will be a book object
      // Format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let book = { _id: new ObjectId(req.params.id) };
      const dbConnect = dbo.getDb();
      dbConnect
        .collection('books')
        .findOne(book, function(err, result) {
          if (err) throw (err);
          if (!result) {
            return res.send('no book exists');
          }
          return res.json(result);
        });
    })

    .post(function(req, res) {
      // POST comments to book with _id
      // Response will be a book object
      // Format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let comment = req.body.comment;
      if (!comment) {
        return res.send('missing required field comment');
      }
      let book = { _id: new ObjectId(req.params.id) };
      let update = {
        $push: {
          comments: comment
        }
      };
      const dbConnect = dbo.getDb();
      dbConnect
        .collection('books')
        .updateOne(book, update, function(err, result) {
          if (err) throw (err);
          if (!result.matchedCount) {
            return res.send('no book exists');
          }
          return res.json(result);
        });
    })

    .delete(function(req, res) {
      // DELETE a book record with _id from the collection
      // Response will be a string
      // Format: 'delete successful'
      let book = { _id: new ObjectId(req.params.id) };
      const dbConnect = dbo.getDb();
      dbConnect
        .collection('books')
        .deleteOne(book, function(err, result) {
          if (err) throw (err);
          if (!result) {
            return res.send('no book exists');
          }
          return res.send('delete successful');
        });
    });*/
};
