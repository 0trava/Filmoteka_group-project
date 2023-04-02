import * as apiService from './api-service';
import * as pagination from './pagination';

const refs = {
  genere: document.querySelector('.movie-genres'),
}

export const movieGenresIds = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export function getGenre(genre_ids) {
  return genre_ids.map(id => movieGenresIds[id]).join(', ');
}

export function getGenrelibrary(genre_ids) {
  return genre_ids.map(({ name }) => name).join(', ');
}

// Функція створення посилань на жанри
export function getGenreLinks() {
  const keys = Object.keys(movieGenresIds);

  let str = "";
  for (const key of keys) {
    str += `<li class="navigation__item"><a class="navigation__link" href="" id="${key}">${movieGenresIds[key]}</a></li>`;
  }

  return str;
}

// Посилання на жанри
const genereLinks = getGenreLinks();
refs.genere.innerHTML = genereLinks;

// Додавання прослуховувача для жанрів
refs.genere.addEventListener('click', onGenereClick);

// Функція обробки кліку по жанру
async function onGenereClick(e) {
  e.preventDefault();

  // id жанра
  const genreId = e.target.id;
  
  // Фільми за жанром - вивести 1 сторінка
  const total_results = await apiService.getMoviesByGenereId(genreId, 1);

  if (total_results) {
    // Фільми за жанром - активувати пагінацію
    pagination.initPagination(total_results, apiService.getMoviesByGenereId, genreId);
  }
}