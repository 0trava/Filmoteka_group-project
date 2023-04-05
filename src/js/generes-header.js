import * as apiService from './api-service';
import * as pagination from './pagination';
import * as generes from './generes';

const refs = {
  genere: document.querySelector('.movie-genres'),
  modalGenres: document.querySelector('.modal-genres-mob'),
};

// Посилання на жанри
const genereLinks = generes.getGenreLinks();
refs.genere.innerHTML = genereLinks;

// Додавання прослуховувача для жанрів
refs.genere.addEventListener('click', onGenereClick);
refs. modalGenres.addEventListener('click', closeGenres);



function closeGenres(e){
  console.log("start");
  if (!e.target.parentNode.classList.contains('.navigation__item')) {
    document.querySelector('.genres-wrap').classList.add('is-hidden');
  }
}





// Функція обробки кліку по жанру
async function onGenereClick(e) {
  e.preventDefault();
  
  // console.log(refs.modalGenres);
  // refs.modalGenres.classList.add('is-hidden');
  // id жанра
  const genreId = e.target.id;


  // Фільми за жанром - вивести 1 сторінка
  const total_results = await apiService.getMoviesByGenereId(genreId, 1);

  if (total_results) {
    // Фільми за жанром - активувати пагінацію
    e.preventDefault();

    pagination.initPagination(
      total_results,
      apiService.getMoviesByGenereId,
      genreId
    );
  }
}
