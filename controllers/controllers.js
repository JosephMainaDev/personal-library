const { ObjectId } = require('mongodb');
const { dbConnection } = require('../db/conn');

exports.books_get = async function(req, res) {
  // GET all books in library collection
  // Response will be array of book objects
  // Format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  let books = await dbConnection();
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
  let book = await dbConnection();
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
  let books = await dbConnection();
  try {
    let result = await books.deleteMany({});
    console.log(result);
    if (result.deletedCount) {
      return res.send('complete delete successful');
    } else {
      return res.send('no book exists');
    }
  } catch(err) {
    return console.error(err);
  }
}


