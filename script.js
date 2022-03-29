const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const search = document.querySelector("#search");
const form = document.querySelector("#form");
const main = document.querySelector("#main");

getMovies(APIURL);

async function getMovies(url) {
  //wait
  const resp = await fetch(url); //verifica params e retorna obj com método .json
  const respData = await resp.json(); //transforma json em obj -- extrair do obj tudo oq for json
  createMovie(respData.results); //propriedade do obj da api -- um array
  console.log(respData.results);
}

function createMovie(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, overview, vote_average, poster_path } = movie;
    const card = document.createElement("div");
    card.classList.add("movie");
    card.innerHTML = `<img
    src="${IMGPATH + poster_path}"
    alt="${title}"
/>
<div class="movie-info">
    <h3>${title}</h3>
    <span class="${colorsAverage(vote_average)}">${vote_average}</span>
</div>
<div class="overview">
    <h3>Overview:</h3>
    ${overview}
</div>`;
    main.appendChild(card);
  });
}

function colorsAverage(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  console.log(event);
  event.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
