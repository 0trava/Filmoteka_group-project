import * as apiService from './api-service';
import {
  watched,
  queue,
  getQueue,
  getWatched,
  setQueue,
  setWatched,
} from './local-storage';
import { getGenre } from './modal-genres';

export const backdropModal = document.querySelector('.backdrop');

const refs = {
  gallerySelector: document.querySelector('.gallery'),
  closeButton: document.querySelector('.modal__button-close'),
};

window.addEventListener('keydown', closeModalHandler);
refs.closeButton.addEventListener('click', onCloseButton);
refs.gallerySelector.addEventListener('click', showCard);

function closeModalHandler(evt) {
  if (evt.code === 'Escape') {
    backdropModal.classList.add('is-hidden');
  }
  //зняття слухачів
  // watchedBtn.removeEventListener('click', onWatchedClick);
  // queueBtn.removeEventListener('click', onQueueClick);
}

function onCloseButton() {
  backdropModal.classList.add('is-hidden');
  //зняття слухачів
  watchedBtn.removeEventListener('click', onWatchedClick);
  queueBtn.removeEventListener('click', onQueueClick);
}

async function showCard(e) {
  e.preventDefault();

  if (e.target.nodeName === 'DIV') {
    return;
  }

  backdropModal.classList.remove('is-hidden');

  const movieId = e.target.id; // Отримали ID картки на яку був клік

  // Отримуємо дані фільму
  const movie = await apiService.getMovieInfoById(movieId); 
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
  } = movie;
  let genre = getGenre(genres);

  // Отримуємо youtube трейлер 
  const youtubeTrailer = await apiService.getYoutubeTrailerByMovieId(movieId);

  // Вивід картки фільму
  const modal = document.querySelector('.modul-card-to-add');
  modal.innerHTML = `
    <div class="modal__poster-thumb">
          <img class="modal__poster" src="${
            apiService.API_URL_IMG
          }${poster_path}" alt="${original_title} poster">
        </div>
   
        <div class="modal__info-thumb">
            <h2 class="modal__title">${title}</h2>
        <table class="modal__info">
            <tr class="modal__info-entry">
            <td class="modal__info-key">Vote / Votes</td>
            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${vote_average}</span> / <span class="modal__info-value-vote">${vote_count}</span></td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Popularity</td>
                <td class="modal__info-value">${popularity.toFixed([1])}</td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Original Title</td>
                <td class="modal__info-value modal__info-value-title">${original_title}</td>
        </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Genre</td>
                <td class="modal__info-value">${genre}</td>
            </tr>
        </table>

        <h3 class="modal__about">About</h3>
        <p class="modal__about-text">${overview}</p>
            <div class="modal__button-container">
                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>
                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>
            </div>
            <div class="modal__button-trailer-wrap">
                <button type="button" class="modal__button modal__button-trailer">Trailer</button>

                <iframe width="1237" height="696" src="https://www.youtube.com/embed/${youtubeTrailer}" title="Mia and me - Mia and me Day 2014" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    </div>
  `;




  //Кнопки
  const watchedBtn = document.querySelector('#watched');
  const queueBtn = document.querySelector('#queue');
  //слухачі подій на кнопки
  watchedBtn.addEventListener('click', onWatchedClick);
  queueBtn.addEventListener('click', onQueueClick);

  function onWatchedClick() {
    //якщо фільм вже в списку
    if (watched.includes(movieId)) {
      watched.splice(watched.indexOf(movieId), 1); //видаляємо з масиву айді
      setWatched(watched); //перезаписуємо сховище
      watchedBtn.textContent = 'add to watched'; //змінити текст кнопки
      return;
    }

    watched.push(movieId); //додати в масив айді фільма
    setWatched(watched); //записати в сховище
    watchedBtn.textContent = 'remove from watched'; //змінити текст кнопки
  }

  function onQueueClick() {
    if (queue.includes(movieId)) {
      queue.splice(queue.indexOf(movieId), 1);
      setWatched(queue);
      queueBtn.textContent = 'add to queue';
      return;
    }

    queue.push(movieId);
    setQueue(queue);
    queueBtn.textContent = 'remove from queue';
  }
  console.log(movie);
};
