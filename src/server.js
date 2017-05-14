import express from 'express';
// import fetch from 'isomorphic-fetch';
// import Promise from 'bluebird';
// import _ from 'lodash';

// const __DEV__ = true;

let app = express();

// const baseUrl = 'https://pokeapi.co/api/v2';
// const pocemonFields = ['id', 'name', 'base_experiance', 'height', 'is_default', 'order', 'weight'];
//
// async function getPokemons(url, i = 0) {
//   console.log('getPokemons ', url, i);
//   const response = await fetch(url);
//   const page = await response.json();
//
//   const pokemons = page.results;
//   if(__DEV__ && i > 1) {
//     return pokemons;
//   }
//   if(page.next) {
//     const pokemons2 = await getPokemons(page.next, i +  1);
//     return [
//       ...pokemons,
//       ...pokemons2
//     ]
//   }
//   return pokemons;
// }
//
// async function getPokemon(url) {
//   console.log('getPokemons ', url);
//   const response = await fetch(url);
//   const pokemon = await response.json();
//   return pokemon;
// }
//
// app.get('/', async (req, res) => {
//   try {
//     const pokemonsUrl = `${baseUrl}/pokemon`;
//     const pokemonsInfo = await getPokemons(pokemonsUrl);
//     const pokemonsPromises = pokemonsInfo.map(info => {
//       return getPokemon(info.url)
//     })
//
//     const pokemonsFull = await Promise.all(pokemonsPromises);
//     const pokemons = pokemonsFull.map(pokemon => {
//       return _.pick(pokemon, pocemonFields);
//     })
//
//     const sortPocemons = _.sortBy(pokemons, pokemon => pokemon.weight);
//
//     return res.json(sortPocemons);
//   } catch(err) {
//     console.log(err);
//     return res.json({ err });
//   }
// })

app.use(express.static('../dist'));
app.set('views', '../dist');

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3080, () => {
  console.log("Server started");
})
