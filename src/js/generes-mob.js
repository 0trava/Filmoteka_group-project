import * as apiService from './api-service';
import * as pagination from './pagination';
import * as generes from './generes';

const refs = {
  genere: document.querySelector('.modal-genres-mob'),
};

// Посилання на жанри
const genereLinks = generes.getGenreLinks();
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
    pagination.initPagination(
      total_results,
      apiService.getMoviesByGenereId,
      genreId
    );
  }
}
