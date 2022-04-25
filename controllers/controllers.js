const { ObjectId } = require('mongodb');
const { dbConnection } = require('../db/conn');

exports.book_get = async function(req, res) {
  // GET all books in library collection
  // Response will be array of book objects
  // Format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
  let db = await dbConnection();
  let result = await db.collection('books')
    .aggregate([
      {
        $project: {
          title: 1,
          commentcount: { $size: '$comments' }
        }
      }
    ])
    .toArray();
  
  res.json(result);
}
