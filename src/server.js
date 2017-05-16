import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';

let app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('../dist'));
app.set('views', '../dist');

app.get('/', (req, res) => {
  res.render('index');
})

let artists = [
  {
    id: 1,
    name: 'Danya'
  },
  {
    id: 2,
    name: 'Max'
  }
]

app.get('/artists', (req, res) => {
  db.collection('artists').find().toArray((err, docs) => {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs)
  })
})

app.post('/artist', (req, res) => {
  let artist = {
    name: req.body.name
  };
  db.collection('artists').insert(artist, (err, result) => {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  })
})

app.put('/artist/:id', (req, res) => {
  db.collection('artists').updateOne(
    { _id: ObjectID(req.params.id) },
    { name: req.body.name },
    (err, result) => {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
})

app.delete('/artist/:id', (req, res) => {
  db.collection('artists').deleteOne(
    { _id: ObjectID(req.params.id) },
    (err, result) => {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
})

MongoClient.connect('mongodb://localhost:27017/myapi', (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  app.listen(3080, () => {
    console.log("Server started");
  })
})
