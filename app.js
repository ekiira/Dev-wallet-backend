const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const app = express()


const uri = "mongodb+srv://Jay:@0luwatosinj@cluster1-1ughk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

