const { ObjectId } = require('mongodb');
const { getDb } = require('../db/conn');

exports.books_get = async function(req, res) {
  // GET all books in library collection
  // Response will be array of book objects
  // Format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  
  let books = await getDb();
  let query = [
      {
        $project: {
          title: 1,
          commentcount: { $size: '$comments' }
        }
      }
    ];
  try {
    let result = await books.aggregate(query).toArray();
    res.json(result);
  } catch (err) {
    return console.error(err);
  }
}

exports.book_post = async function(req, res) {
  // CREATE one book record
  // Response will be the inserted book object including atleast _id and title
  // Format: {"_id": bookid, "title": book_title, "comments": []}
  let title = req.body.title;
  // missing title
  if (!title) {
    return res.send('missing required field title');
  }
  const bookItem = {
    title: title,
    comments: [],
  }
  let book = await getDb();
  try {
    let result = await book.insertOne(bookItem);
    if (result.insertedId) {
      return res.json({ title: title, _id: result.insertedId });
    }
  } catch (err) {
    return console.error(err);
  }
}

exports.books_delete = async function (req, res) {
  // DELETE all books in database
  // if successful response will be 'complete delete successful'
  let books = await getDb();
  try {
    let result = await books.deleteMany({});
    if (result.deletedCount) {
      return res.send('complete delete successful');
    } else {
      return res.send('no book exists');
    }
  } catch(err) {
    return console.error(err);
  }
}

exports.book_get = async function(req, res) {
  // GET a single book that matches { _id: id }
  // Response will be a book object
  // Format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  let book = await getDb();
  let bookItem = { _id: new ObjectId(req.params.id) };
  try {
    let result = await book.findOne(bookItem);
    if (result) {
      return res.json(result);
    } else {
      return res.send('no book exists');
    }
  } catch(err) {
    return console.error(err);
  }
}

exports.book_delete = async function(req, res) {
  // DELETE a book record with _id from the collection
  // Response will be the string 'delete successful'
  let book = await getDb();
  let bookItem = { _id: new ObjectId(req.params.id) };
  try {
    let result = await book.deleteOne(bookItem);
    if (result.deletedCount) {
      return res.send('delete successful');
    } else {
      return res.send('no book exists');
    }
  } catch(err) {
    return console.error(err);
  }
}

exports.book_comment = async function (req, res) {
  // POST comments to book with _id
  // Response will be a book object
  // Format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  let book = await getDb();
  let comment = req.body.comment;
  if (!comment) {
    return res.send('missing required field comment');
  }
  let update = {
    $push: {
      comments: comment
    }
  };
  let bookItem = { _id: new ObjectId(req.params.id) };
  try {
    let result = await book.updateOne(bookItem, update);
    if (result.matchedCount) {
      result = await book.findOne(bookItem);
      return res.json(result);
    } else {
      return res.send('no book exists');
    }
  } catch(err) {
    return console.log(err);
  }
}
