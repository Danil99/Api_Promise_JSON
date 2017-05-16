'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var db = void 0;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_express2.default.static('../dist'));
app.set('views', '../dist');

app.get('/', function (req, res) {
  res.render('index');
});

var artists = [{
  id: 1,
  name: 'Danya'
}, {
  id: 2,
  name: 'Max'
}];

app.get('/artists', function (req, res) {
  db.collection('artists').find().toArray(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

app.post('/artist', function (req, res) {
  var artist = {
    name: req.body.name
  };
  db.collection('artists').insert(artist, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  });
});

app.put('/artist/:id', function (req, res) {
  db.collection('artists').updateOne({ _id: (0, _mongodb.ObjectID)(req.params.id) }, { name: req.body.name }, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

app.delete('/artist/:id', function (req, res) {
  db.collection('artists').deleteOne({ _id: (0, _mongodb.ObjectID)(req.params.id) }, function (err, result) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

_mongodb.MongoClient.connect('mongodb://localhost:27017/myapi', function (err, database) {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(3080, function () {
    console.log("Server started");
  });
});