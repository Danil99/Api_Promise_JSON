let movieList = document.getElementById('movies');

function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(json => resolve(json.Search))
      .catch(error => reject(error))
  })
}

function addMovieToList(movie) {
  let img = document.createElement('img');
  img.src = movie.Poster;
  img.alt = movie.Title;
  movieList.appendChild(img);
}

function action(movies) {
  movies.forEach(movie => {
    addMovieToList(movie)
  })
}

function err(error) {
  console.log(error);
}

let batman = getData('http://omdbapi.com/?s=batman');
let superman = getData('http://omdbapi.com/?s=superman');

Promise.race([batman, superman])
  .then(action)
  .catch(err);
