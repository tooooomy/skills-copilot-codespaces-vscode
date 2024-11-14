// Create web server
// Run server
// Get comments from db
// Create a route to get comments
// Create a route to add comments
// Create a route to delete comments

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'commentDB';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

let db, collection;

client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected successfully to server');
  db = client.db(dbName);
  collection = db.collection('comments');
});

app.get('/comments', (req, res) => {
  collection.find({}).toArray((err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(result);
  });
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  if (!username || !comment) {
    return res.sendStatus(400);
  }
  collection.insertOne({ username, comment }, (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.send(result.ops[0]);
  });
});

app.delete('/comments/:id', (req, res) => {
  collection.deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    if (result.deletedCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); 
 To run the server, execute the following command: 
 node comments.js 
 The server will be running on  http://localhost:3000 . You can now test the routes using a tool like Postman. 
 Conclusion 
 In this tutorial, you have learned how to create a simple web server using Express.js and how to interact with a MongoDB database