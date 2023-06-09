import { watched, queue } from './local-storage';
import { getGenrelibrary } from './modal-genres';
import * as rating from './rating';

// import { getMovieInfoById } from './api-service';

const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
const API_URL = `https://api.themoviedb.org/3/`;
const API_URL_IMG = `https://image.tmdb.org/t/p/original`;
export let PAGE_OPEN = 1;

const libWatchedBtn = document.querySelector('.library-btn__watched');
const libQueueBtn = document.querySelector('.library-btn__queue');
const libContainer = document.querySelector('.library-gallery-wrap');
const libBoxinfo = document.querySelector('.library-bg-image');
const BoxCard = document.querySelector('.library-gallery-box');
const spinner = document.querySelector('.dot-spinner');

libWatchedBtn.addEventListener('click', onlibWatchedBtnClick);
libQueueBtn.addEventListener('click', onlibQueueBtnClick);
window.addEventListener('load', onlibWatchedBtnClick);

libWatchedBtn.classList.add('active');

libWatchedBtn.addEventListener('click', () => {
  libWatchedBtn.classList.add('active');
  libQueueBtn.classList.remove('active');
});

libQueueBtn.addEventListener('click', () => {
  libQueueBtn.classList.add('active');
  libWatchedBtn.classList.remove('active');
});

// НАТИСК на кнопку - Watched
async function onlibWatchedBtnClick() {
  PAGE_OPEN = 1;
  //console.log(PAGE_OPEN);
  if (watched.length === 0) {
   // console.log('start 0');
    libBoxinfo.classList.remove('is-hidden');
    BoxCard.innerHTML = ``;
    return;
  }

  spinner.classList.remove('is-hidden');
  spinner.classList.add('is-hidden');
  //console.log('start watched');
  //console.log(watched);
  renderList(watched);
}

// НАТИСК на кнопку - Queue
async function onlibQueueBtnClick() {
  PAGE_OPEN = 2;
  //console.log(PAGE_OPEN);
  if (queue.length === 0) {
   // console.log('start');
    libBoxinfo.classList.remove('is-hidden');
    BoxCard.innerHTML = ` `;
    return;
  }

  spinner.classList.remove('is-hidden');
  spinner.classList.add('is-hidden');

  renderList(queue);
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

export async function renderList(array) {
  const moviesList = await getMoviesList(array);

  if (moviesList.length === 0) {
     //   console.log("empty");
        // location.reload();
        libBoxinfo.classList.remove('is-hidden');
        BoxCard.innerHTML = `<div class="library-bg-image is-hidden">
            <h2 class="library-text">Sorry, but your list is empty ...</h2>
            <img
              src="./images/Library/movie.png"
              alt="cinema"
              class="js-library-bg-image visually-hidden"
              width="600"
            />
            </div>`;
    //  console.log(BoxCard);
      return;
  }
  
  const watchedList = createList(moviesList);
  libBoxinfo.classList.add('is-hidden');
  BoxCard.innerHTML = '';
  BoxCard.insertAdjacentHTML('beforeend', watchedList);
}

function createList(array) {
  return array.reduce((acc, item) => {
    return acc + createMarkup(item);
  }, '');
}

// Отримати рейтинг фильма
function getRatingByMovieId(movieId) {
      const stars = JSON.parse(localStorage.getItem('star')) || [];
      const id = stars.findIndex(item => parseInt(item.id) === parseInt(movieId));

      if (id !== -1) {
        return parseInt(stars[id].star);
      } else {
        return 0;
      }
}
  
function createMarkup(item) {
  // console.log(item);

  let genres = getGenrelibrary(item.genres);

  const starValue = getRatingByMovieId(item.id);

  const renderStars = rating.renderRatingForMovie(starValue, item.id, 'list');
      
  
  
  // let item.year = release_date?.substring(0, 4);
  return `
            <li class="movie-card"  ID=${item.id}>
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300"
                ID=${item.id}>
                <div class="library-stars">
                <div class="rating">
                ${renderStars}
                </div>
                </div>
                <h2 class="movie-card__name"   ID=${item.id}>${item.original_title}</h2>
                <p class="movie-card__text"   ID=${item.id}>${genres} | ${item.release_date?.substring(0, 4)}
                <span class="movie-card__box">
                <span class="movie-card__average">${item.vote_average.toFixed([1,])}</span>
                </span>
                </p>
            </li>`;
}



window.addEventListener('load', () => {
  if (libWatchedBtn) {
    libWatchedBtn.checked = true;

    libWatchedBtn.parentNode.classList.add('checked');
  }
});
