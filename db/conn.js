// Exposes MongoDB client for connecting to DB

const { MongoClient } = require('mongodb');
const db_uri = process.env.DB_URI;
const client = new MongoClient(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToDB: function(callback) {
    client.connect(function(err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('library').collection('books');

      console.log('Successfully connected to DB.');

      return callback();
    });
  },

  getDb: function() {
    return dbConnection;
  },
}
