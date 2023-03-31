import { watched, queue } from './local-storage';
import { getMovieInfoById } from './api-service';

const libWatchedBtn = document.querySelector('.library-btn__watched');
const libQueueBtn = document.querySelector('.library-btn__queue');

libWatchedBtn.addEventListener('click', onlibWatchedBtnClick);
libQueueBtn.addEventListener('click', onlibQueueBtnClick);

getWatchedMovies(watched);
getQueueMovies(queue);

function onlibWatchedBtnClick() {
  console.log('click watched');
}
function onlibQueueBtnClick() {
  console.log('click queue');
}

// ФУНКЦІЯ - завантаження карток фільму з локальної бібліотеки Watched
async function getWatchedMovies(array) {
  // Пиши код тут
}
function createMarkup(item) {
  return `
            <li class="movie-card"  ID=${item.id}>
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300"
                ID=${item.id}>
                <h2 class="movie-card__name"   ID=${item.id}>${item.original_title}</h2>
                <p class="movie-card__text"   ID=${item.id}>${item.genre_ids} | ${item.release_date}</p>
            </li>
        `;
}

function createList(array) {
  array.reduce((acc, item) => {
    return acc + createMarkup(item);
  }, '');
}

// ФУНКЦІЯ - завантаження карток фільму з локальної бібліотеки Queue
async function getQueueMovies(array) {
  // Пиши код тут
}
