/**
 *  Wrapper for the mongo client, essentially
 *
 *  derived from:
 *    + http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/
 *
 */


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = process.env.MONGO_URL;

// module
var driver = {};

// Get the documents collection
driver.findDocument = function(query, callback) {
  MongoClient.connect(url, function(err, db) {
      var collection = db.collection("documents");
      // Find some documents
      collection.find(query).toArray(function(err, doc) {
          assert.equal(err, null);
          console.log(doc)
          callback(doc);
      });
      db.close();
  });
}

// insert some docs
driver.insertDocument = function(doc, callback) {

    MongoClient.connect(url, function(err, db) {
        assert.equal(err, null);
        var collection = db.collection("documents");

        collection.insert(doc, function(err, result) {
             assert.equal(err, null);
             console.log("Inserted doc successfully");
             callback(result);
        });
        db.close();
    });
}

// export the driver
module.exports = driver;
