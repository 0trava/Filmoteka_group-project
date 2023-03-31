import * as pagination from './pagination';

export const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
export const API_URL=`https://api.themoviedb.org/3/`;
export const API_URL_IMG=`https://image.tmdb.org/t/p/original`;

const moviesAll = document.querySelector(".gallery");

// ТОП фільмів - вивести 1 сторінка
getMovies(1);

// ТОП фільмів - активувати пагінацію
pagination.initPagination(1000, getMovies); 


// Функція виводу ТОП фільмів
async function getMovies(page) {
    // Включити loader
    const spinner = document.querySelector('.dot-spinner');
    spinner.classList.remove('is-hidden');

    // Отримати дані з сервера
    const resp = await fetch( `${API_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`);

    const respData = await resp.json();

    // Виключити loader
    spinner.classList.add('is-hidden');

    console.log(respData);

    // Сформувати карточки фільмів
    const data = respData["results"].map(item => {
        return `
            <li class="movie-card"  ID=${item.id}>
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300"
                ID=${item.id}>
                <h2 class="movie-card__name"   ID=${item.id}>${item.original_title || item.name}</h2>
                <p class="movie-card__text"   ID=${item.id}>${item.genre_ids} | ${item.release_date}</p>
            </li>
        `;
    }).join('');
  
    // Додати фільми у галерею
    moviesAll.innerHTML = data;
}


// Функція отримання даних про фільм по ID
export async function getMovieInfoById(movieID) { 
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`); 
 
    const respData = await resp.json(); 

    return respData;
}