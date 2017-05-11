'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var __DEV__ = true;

var app = (0, _express2.default)();

var baseUrl = 'https://pokeapi.co/api/v2';
var pocemonFields = ['id', 'name', 'base_experiance', 'height', 'is_default', 'order', 'weight'];

async function getPokemons(url) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  console.log('getPokemons ', url, i);
  var response = await (0, _isomorphicFetch2.default)(url);
  var page = await response.json();

  var pokemons = page.results;
  if (__DEV__ && i > 1) {
    return pokemons;
  }
  if (page.next) {
    var pokemons2 = await getPokemons(page.next, i + 1);
    return [].concat(_toConsumableArray(pokemons), _toConsumableArray(pokemons2));
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log('getPokemons ', url);
  var response = await (0, _isomorphicFetch2.default)(url);
  var pokemon = await response.json();
  return pokemon;
}

app.get('/', async function (req, res) {
  try {
    var pokemonsUrl = baseUrl + '/pokemon';
    var pokemonsInfo = await getPokemons(pokemonsUrl);
    var pokemonsPromises = pokemonsInfo.map(function (info) {
      return getPokemon(info.url);
    });

    var pokemonsFull = await _bluebird2.default.all(pokemonsPromises);
    var pokemons = pokemonsFull.map(function (pokemon) {
      return _lodash2.default.pick(pokemon, pocemonFields);
    });

    var sortPocemons = _lodash2.default.sortBy(pokemons, function (pokemon) {
      return pokemon.weight;
    });

    return res.json(sortPocemons);
  } catch (err) {
    console.log(err);
    return res.json({ err: err });
  }
});

app.listen(3080, function () {
  console.log("Server started");
});