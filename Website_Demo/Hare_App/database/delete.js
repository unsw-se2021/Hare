const delete_product_by_productId = (product_collection, productId) => {
  return new Promise((resolve, reject) => {
    product_collection.deleteOne({ db_id: productId }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = {
  delete_product_by_productId: delete_product_by_productId
};

//not sure what do these code do
/*
// Database client setup 
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const key = require('./config/db_keys').mongoURI;
const client = new mongoose(key, { useNewUrlParser: true }); 

// Helper function imports 
import * from './insert';
import * from './delete'; 

// Hardcoded examples
const user_register_a = { 

}; 


const url = key; 
const dbName = 'myproject';
const client = new MongoClient(url);
// Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});



//client.connect(err => {
//	console.log("Connected\n"); 
//	const db = client.db('HareDB'); 
//
//	insertDocuments(db, () =>{ 
//	client.close()});
//}); 
//
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
*/
