import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

let app = express();
let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('../dist'));

app.get('/', (req, res) => {
  res.render('index');
})

let artists = [
  {
    id: 1,
    name: 'Danil'
  },
  {
    id: 2,
    name: 'Max'
  }
]

app.route('/artists')
  .get((req, res) => {
    db.collection('artists').find().toArray((err, docs) => {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(docs);
    })
  })
  .post((req, res) => {
    let artist = {
      name: req.body.name
    }
    db.collection('artists').insert(artist, (err, result) => {
      if(err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(artist);
    })
  })

app.route('/artists/:id')
  .put((req, res) => {
    let artist = artists.find(artist => artist.id === Number(req.params.id));
    artist.name = req.body.name;
    res.send(artist);
  })
  .delete((req, res) => {
    artists = artists.filter(artist => artist.id !== Number(req.params.id));
    res.sendStatus(200);
  })

MongoClient.connect('mongodb://localhost:27017/myapi', (err, database) => {
  if(err) {
    console.log(err);
  }
  db = database;
  app.listen(3080, (req, res) => {
    console.log('Server started');
  })
})
