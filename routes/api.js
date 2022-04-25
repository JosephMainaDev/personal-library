/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

module.exports = function(app) {

  app.route('/api/books')
    .get(function(req, res) {
      // GET all books in library collection
      // Response will be array of book objects
      // Format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const dbConnect = dbo.getDb();
      dbConnect
        .collection('books')
        .aggregate([
          {
            $project: {
              title: 1,
              commentcount: { $size: '$comments' }
            }
          }
        ])
        .toArray(function(err, result) {
          if (err) throw (err);
          return res.json(result);
        });
    })

    .post(function(req, res) {
      // CREATE book record
      // Response will be the inserted book object including atleast _id and title
      // Format: {"_id": bookid, "title": book_title, "comments": []}
      let title = req.body.title;
      // missing title
      if (!title) {
        return res.send('missing required field title'); // return stops execution
      }
      const book = {
        title: title,
        comments: [],
      }
      const dbConnect = dbo.getDb();
      dbConnect
        .collection('books')
        .insertOne(book, function(err, result) {
          if (err) throw (err);
          return res.json({ title: title, _id: result.insertedId });
        });
    })

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
    });
};
