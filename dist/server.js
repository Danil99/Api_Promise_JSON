'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('../dist'));
app.set('views', '../dist');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3080, function () {
  console.log("Server started");
});