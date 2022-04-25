// Exposes MongoDB client for connecting to DB
// Make connection for each request because I need to read more on 'connection pooling'

const { MongoClient } = require('mongodb');

const db_uri = process.env.DB_URI;
const client = new MongoClient(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.dbConnection = async function() {
  try {
  	await client.connect();
    let db = await client.db('library')
  	return await db.collection('books'); // client.db('library');
  } catch (err) {
  	return console.error(err);
  }
}
