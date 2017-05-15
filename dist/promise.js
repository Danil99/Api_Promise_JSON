'use strict';

var movieList = document.getElementById('movies');

function getData(url) {
  return new Promise(function (resolve, reject) {
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json.Search);
    }).catch(function (error) {
      return reject(error);
    });
  });
}

function addMovieToList(movie) {
  var img = document.createElement('img');
  img.src = movie.Poster;
  img.alt = movie.Title;
  movieList.appendChild(img);
}

function action(movies) {
  movies.forEach(function (movie) {
    addMovieToList(movie);
  });
}

function err(error) {
  console.log(error);
}

var batman = getData('http://omdbapi.com/?s=batman');
var superman = getData('http://omdbapi.com/?s=superman');

Promise.race([batman, superman]).then(action).catch(err);