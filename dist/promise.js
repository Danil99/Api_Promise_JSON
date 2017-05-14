'use strict';

function getData(url) {
  return new Promise(function (resolve, reject) {
    // const xhr = new XMLHttpRequest();
    //
    // xhr.open('GET', url);
    //
    // xhr.onload = function () {
    //   if (xhr.status === 200) {
    //     let json = JSON.parse(xhr.response);
    //     resolve(json.Search);
    //   } else {
    //     reject('Error');
    //   }
    // }
    //
    // xhr.onerror = function () {
    //   reject('Error');
    // }
    //
    // xhr.send();

    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      resolve(json.Search);
    }).catch(function (error) {
      reject(error);
    });
  });
}

var movieList = document.getElementById('movies');

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
  console.error(error);
}

var batman = getData('http://omdbapi.com/?s=batman');
var superman = getData('http://omdbapi.com/?s=superman');

Promise.race([batman, superman]).then(action).catch(err);

// getData(`http://omdbapi.com/?s=${nameMovie}`)
//   .then(action)
//   .catch(err);