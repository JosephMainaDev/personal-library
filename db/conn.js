// Exposes MongoDB client for connecting to DB
// Make connection for each request because I need to read more on 'connection pooling'

const { MongoClient } = require('mongodb');

const db_uri = process.env.DB_URI;
const client = new MongoClient(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();

let _db = null;

exports.dbConnection = async function() {
  try {
    _db = await client.db('library');
    return;
  } catch (err) {
  	return console.error(err);
  }
}

exports.getDb = async function() {
  return await _db.collection('books');
}
