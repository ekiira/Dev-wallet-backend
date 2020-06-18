const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const Intern = require('./models/intern');
const mongoose = require('mongoose');

const uri = 'mongodb://tosin:0luwatosin@ds135444.mlab.com:35444/airtime-db'

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  console.log('connected to database successfully');
})


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Dev-Wallet Backend')
})

app.get('/getIntern', (req, res) => {
  Intern.find({}, (err, interns) => {
    if(err) {
      console.log(err)
    } else {
      res.json(interns)
      console.log(interns, 'all')
    }
  })
})

app.post('/addIntern', (req, res) => {
  const allData = {
    name: req.body.name,
    number: req.body.number,
    provider: req.body.provider,
    amount: req.body.amount
  }
  Intern.create(allData, (err, addInterns) => {
    if(err) {
      console.log(err)
    } else {
      console.log('sved',addInterns)
    }
  })
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('server has started')
})