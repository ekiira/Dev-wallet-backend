const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const Intern = require('./models/intern');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config()
const name = process.env.MONGODB_NAME 
const pw = process.env.MONGODB_PASSWORD
const uri = `mongodb://${name}:${pw}@ds135444.mlab.com:35444/airtime-db`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected to database successfully');
})


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Dev-Wallet Backend')
})

app.post('/wallet-api', (req, res) => {
  const data = {
    Code: req.body.Code,
    Amount: req.body.Amount,
    PhoneNumber: req.body.PhoneNumber,
    SecretKey: req.body.SecretKey,
  };
  const bearer = req.body.bearer
  axios.post('https://sandbox.wallets.africa/bills/airtime/purchase', data, {
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json',
    },
  }) 
  .then((response) => {
    const { data } = response;
    // res.send
    return res.status(201).send({message: data.Message}) 
  })
  .catch((err) => {
    console.log(err.message, 'error')
  });
})


app.get('/interns', (req, res) => {
  Intern.find({}, (err, interns) => {
    if(err) {
      throw err
    } else {
      res.json(interns)
    }
  })
})

app.post('/addIntern', (req, res) => {
  const allData = {
    name: req.body.name,
    number: req.body.number,
    provider: req.body.provider,
    amount: req.body.amount,
    track: req.body.track
  }
  Intern.create(allData, (err, addInterns) => {
    if(err) {
      throw err
    } else {
      res.json(addInterns)
    }
  })
})

app.delete('/removeInterns/:id', (req, res) => {
  Intern.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      throw err;
    } else {
      res.send('Deleted');
    }
  });
});

app.delete('/removeAllInterns', (req, res) => {
  Intern.remove(req.params.id, (err) => {
    if (err) {
      throw err
    } else {
      res.send('Deleted');
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  process.stdout.write(`server has started at port ${port}`)
})
