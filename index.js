// tutorial stuff
// http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/

var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/capstone_basic_webapp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {

  assert.equal(null, err);
  console.log("Connected successfully to server");
  insertDocuments(db, function(){
    findDocuments(db, function() {
      db.close();
    })
  });

});

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

// insert some docs
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');

  // Insert some documents
  var docs = [  {d : 4}, {e : 5}, {f : 6} ]
  collection.insertMany(docs, function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
