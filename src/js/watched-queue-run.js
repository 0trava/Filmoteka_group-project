import { watched, queue } from './local-storage';
import {getGenrelibrary} from './generes';

// import { getMovieInfoById } from './api-service';

const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
const API_URL = `https://api.themoviedb.org/3/`;
const API_URL_IMG = `https://image.tmdb.org/t/p/original`;

const libWatchedBtn = document.querySelector('.library-btn__watched');
const libQueueBtn = document.querySelector('.library-btn__queue');
const libContainer = document.querySelector('.library-gallery-wrap');
const spinner = document.querySelector('.dot-spinner');

libWatchedBtn.addEventListener('click', onlibWatchedBtnClick);
libQueueBtn.addEventListener('click', onlibQueueBtnClick);
window.addEventListener('load', onlibWatchedBtnClick);

async function onlibWatchedBtnClick() {
  if (watched.length === 0) return;

  spinner.classList.remove('is-hidden');

  const moviesList = await getMoviesList(watched);
  const watchedList = createList(moviesList);

  spinner.classList.add('is-hidden');

  renderList(watchedList);
}

async function onlibQueueBtnClick() {
  if (queue.length === 0) return;

  spinner.classList.remove('is-hidden');

  const moviesList = await getMoviesList(queue);
  const watchedList = createList(moviesList);

  spinner.classList.add('is-hidden');

  renderList(watchedList);
}

async function getMovieInfoById(movieID) {
  const resp = await fetch(
    `${API_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`
  );

  const respData = await resp.json();

  return respData;
}

async function getMoviesList(array) {
  const moviePromises = array.map(item => getMovieInfoById(item));
  const moviesList = await Promise.all(moviePromises);
  return moviesList;
}

function renderList(data) {
  libContainer.innerHTML = '';
  libContainer.insertAdjacentHTML('beforeend', data);
}

function createList(array) {
  return array.reduce((acc, item) => {
    return acc + createMarkup(item);
  }, '');
}

function createMarkup(item) {
  // console.log(item);

        let test = getGenrelibrary(item.genres);

        // let item.year = release_date?.substring(0, 4);
  return `
            <li class="movie-card"  ID=${item.id}>
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300"
                ID=${item.id}>
                <h2 class="movie-card__name"   ID=${item.id}>${item.original_title}</h2>
                <p class="movie-card__text"   ID=${item.id}>${test} | ${item.release_date?.substring(0, 4)}</p>
            </li>
        `;
}
