
import {getGenre} from './generes'


export const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
export const API_URL=`https://api.themoviedb.org/3/`;
export const API_URL_IMG=`https://image.tmdb.org/t/p/original`;

const moviesAll = document.querySelector(".gallery");
const inputError = document.querySelector('.error-notification__text')


// Функція виводу ТОП фільмів
export async function getTOPMovies(page) {
    // Включити loader
    const spinner = document.querySelector('.dot-spinner');
    spinner.classList.remove('is-hidden');

    // Отримати дані з сервера
    const resp = await fetch( `${API_URL}trending/all/day?api_key=${API_KEY}&page=${page}`);

    const respData = await resp.json();

    // Виключити loader
    spinner.classList.add('is-hidden');

    // Сформувати карточки фільмів
    const data = respData['results']
      .map(({ id, poster_path, title, genre_ids, release_date }) => {
        let genre = getGenre(genre_ids);
        let year = release_date?.substring(0, 4);
        //   if (genre && year) genre += ' | ';
          if (title) {
                    return  `
                    <li class="movie-card"  ID=${id}>
                        <img class="movie-card__image" src="${API_URL_IMG}${poster_path}" 
                        onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                        alt="${title}" 
                        width="300" ID=${id}>
                        <h2 class="movie-card__name" ID=${id}>${title}</h2>
                        <p class="movie-card__text" ID=${id}>${genre} | ${year}</p>
        
                    </li>
                `;
          };


      })
      .join('');
  
  // Додати фільми у галерею
  moviesAll.innerHTML = data;
  
  return respData.total_results;
}


// Функція отримання даних про фільм по ID
export async function getMovieInfoById(movieID) { 
    const resp = await fetch(`${API_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`); 
 
    const respData = await resp.json(); 

    return respData;
}

// Отримання посилання на youtube-трейлер по id фільма
export async function getYoutubeTrailerByMovieId(movieId) {
  const response = await fetch(
    `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  );

  const responseData = await response.json();

  if (responseData.results.length > 0){
    return responseData["results"][0]["key"];
  }


}

// Функція виводу фільмів за пошуковим словом
export async function getSearchMovies(query, page) {
    // Включити loader
    const spinner = document.querySelector('.dot-spinner');
    spinner.classList.remove('is-hidden');

    // Отримати дані з сервера
    const respSearch = await fetch( `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`);

    const respDataSearch = await respSearch.json();

  if (!respDataSearch.total_results) {
    inputError.textContent = "Search result not successful. Enter the correct movie name and try again.";

    // Виключити loader
    spinner.classList.add('is-hidden');
    return;
  }

    // Виключити loader
    spinner.classList.add('is-hidden');


    // Сформувати карточки фільмів з ПОШУКУ
    const dataSearch = respDataSearch['results']
      .map(function ({ id, poster_path, title, genre_ids, release_date, backdrop_path }) {
        let genre = getGenre(genre_ids);
        let year = release_date?.substring(0, 4);
        //   if (genre && year) genre += ' | ';
        if (backdrop_path) {
          return `
                    <li class="movie-card"  ID=${id}>
                        <img class="movie-card__image" src="${API_URL_IMG}${poster_path}" 
                        onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                        alt="${title}" 
                        width="300" ID=${id}>
                        <h2 class="movie-card__name" ID=${id}>${title}</h2>
                        <p class="movie-card__text" ID=${id}>${genre} | ${year}</p>
        
                    </li>
                `;
        };
      })
      .join('');

    // Додати фільми у галерею
  moviesAll.innerHTML = dataSearch;
  
  return respDataSearch.total_results;
}

// Функція виводу фільмів за жанром
export async function getMoviesByGenereId(genere_id, page) {
    // Включити loader
    const spinner = document.querySelector('.dot-spinner');
    spinner.classList.remove('is-hidden');

    // Отримати дані з сервера
    const resp = await fetch( `${API_URL}discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${genere_id}`);

    const respData = await resp.json();

    // Виключити loader
    spinner.classList.add('is-hidden');

    // Сформувати карточки фільмів
    const data = respData['results']
      .map(({ id, poster_path, title, genre_ids, release_date }) => {
        let genre = getGenre(genre_ids);
        let year = release_date?.substring(0, 4);
        //   if (genre && year) genre += ' | ';
          if (title) {
                    return  `
                    <li class="movie-card"  ID=${id}>
                        <img class="movie-card__image" src="${API_URL_IMG}${poster_path}" 
                        onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                        alt="${title}" 
                        width="300" ID=${id}>
                        <h2 class="movie-card__name" ID=${id}>${title}</h2>
                        <p class="movie-card__text" ID=${id}>${genre} | ${year}</p>
        
                    </li>
                `;
          };


      })
      .join('');
  
  // Додати фільми у галерею
  moviesAll.innerHTML = data;
  
  return respData.total_results;
}