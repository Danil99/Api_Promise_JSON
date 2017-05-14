function getData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.response);
        resolve(json.Search);
      } else {
        reject('Error');
      }
    }

    xhr.onerror = function () {
      reject('Error');
    }

  })
}

let movieList = document.getElementById('movies');

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
  console.error(error);
}

const batman = getData('http://omdbapi.com/?s=batman');
const superman = getData('http://omdbapi.com/?s=superman');

Promise.race([batman, superman])
  .then(action)
  .catch(err);

// getData(`http://omdbapi.com/?s=${nameMovie}`)
//   .then(action)
//   .catch(err);
