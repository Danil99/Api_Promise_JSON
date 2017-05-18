'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var db = void 0;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static('../dist'));

app.get('/', function (req, res) {
  res.render('index');
});

var artists = [{
  id: 1,
  name: 'Danil'
}, {
  id: 2,
  name: 'Max'
}];

app.route('/artists').get(function (req, res) {
  db.collection('artists').find().toArray(function (err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
}).post(function (req, res) {
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

app.route('/artists/:id').put(function (req, res) {
  var artist = artists.find(function (artist) {
    return artist.id === Number(req.params.id);
  });
  artist.name = req.body.name;
  res.send(artist);
}).delete(function (req, res) {
  artists = artists.filter(function (artist) {
    return artist.id !== Number(req.params.id);
  });
  res.sendStatus(200);
});

_mongodb.MongoClient.connect('mongodb://localhost:27017/myapi', function (err, database) {
  if (err) {
    console.log(err);
  }
  db = database;
  app.listen(3080, function (req, res) {
    console.log('Server started');
  });
});