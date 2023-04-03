// import * as apiService from './api-service';
import {
  watched,
  queue,
  getQueue,
  getWatched,
  setQueue,
  setWatched,
} from './local-storage';
import { renderList } from './watched-queue-run';

import { getGenrelibrary } from './modal-genres';



const backdropModal = document.querySelector('.backdrop');
const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
const API_URL=`https://api.themoviedb.org/3/`;
const API_URL_IMG=`https://image.tmdb.org/t/p/original`;

const refs = {
  gallerySelector: document.querySelector('.library-gallery-wrap'),
  closeButton: document.querySelector('.modal__button-close'),
};


window.addEventListener('keydown', closeModalHandler);
window.addEventListener('click', clickBackdropCloseModal);
refs.closeButton.addEventListener('click', onCloseButton);
refs.gallerySelector.addEventListener('click', showCard);

const modal = document.querySelector('.modal');

// зачинення по кліку поза модалкою

function clickBackdropCloseModal(e) {
  if (e.target === backdropModal) {
    backdropModal.classList.add('is-hidden');
  }
}


// добавляем обработчик клика на весь документ

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

  // watchedBtn.removeEventListener('click', onWatchedClick);
  // queueBtn.removeEventListener('click', onQueueClick);
}

async function showCard(e) {

  e.preventDefault();
  console.log(e.target.nodeName);

  if (e.target.nodeName === 'UL') {
    return;
  }

  backdropModal.classList.remove('is-hidden');

  const movieId = e.target.id; // Отримали ID картки на яку був клік

  // Отримуємо дані фільму
  const movie = await getMovieInfoById(movieId); 
  let genres = getGenrelibrary(movie.genres);

  async function getMovieInfoById(movieID) { 
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`); 
 
    const respData = await resp.json(); 

    return respData;
}

  // Отримуємо youtube трейлер 
  const youtubeTrailer = await getYoutubeTrailerByMovieId(movieId);
  console.log(youtubeTrailer);

  async function getYoutubeTrailerByMovieId(movieId) {
    const response = await fetch(
      `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
  
    const responseData = await response.json();
    console.log(responseData);
  
    if (responseData.results.length > 0){
      return responseData["results"][0]["key"];
    }
  };

  // Вивід картки фільму
  const modal = document.querySelector('.modul-card-to-add');

  createModalCard(modal);

  function createModalCard(cardForModal) {

    cardForModal.innerHTML = `
    <div class="modal__poster-thumb">
          <img class="modal__poster" src="${API_URL_IMG}${movie.poster_path}" alt="${movie.original_title} poster">
        </div>
   
        <div class="modal__info-thumb">
            <h2 class="modal__title">${movie.original_title}</h2>
        <table class="modal__info">
            <tr class="modal__info-entry">
            <td class="modal__info-key">Vote / Votes</td>
            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${movie.vote_average}</span> / <span class="modal__info-value-vote">${movie.vote_count}</span></td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Popularity</td>
                <td class="modal__info-value">${movie.popularity.toFixed([1])}</td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Original Title</td>
                <td class="modal__info-value modal__info-value-title">${movie.original_title}</td>
        </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Genre</td>
                <td class="modal__info-value">${genres}</td>
            </tr>
        </table>

        <h3 class="modal__about">About</h3>
        <p class="modal__about-text">${movie.overview}</p>
            <div class="modal__button-container">
                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>
                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>
            </div>

            <div class="modal__button-trailer-wrap">
            <button id="trailer" type="button" class="modal__button modal__button-trailer"><span class="svg_span"
            ><svg width="40px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M61.115,18.856C63.666,21.503,64,25.709,64,36s-0.334,14.497-2.885,17.144C58.563,55.791,55.906,56,36,56  s-22.563-0.209-25.115-2.856C8.334,50.497,8,46.291,8,36s0.334-14.497,2.885-17.144S16.094,16,36,16S58.563,16.209,61.115,18.856z M31.464,44.476l13.603-8.044l-13.603-7.918V44.476z"/></svg></span>
       Trailer</button>


                <iframe class="modal__iframe is-hidden" width="1237" height="696" src="https://www.youtube.com/embed/${youtubeTrailer}" title="Mia and me - Mia and me Day 2014" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
    </div>
  `;


    // ПЕРЕВІРКА - чи в списку бібліотеки

    onWatchedCheck()
    onQueueCheck()

    function onWatchedCheck() {
      const watchedBtn = document.querySelector(`#watched`);
      //якщо фільм вже в списку
      if (watched.includes(movieId)) {
        watchedBtn.textContent = 'remove from watched'; //змінити текст кнопки
        return;
      }
        watchedBtn.textContent = 'add to watched'; //змінити текст кнопки
    }
  
    function onQueueCheck() {
          const queueBtn = document.querySelector('#queue');
      if (queue.includes(movieId)) {

        queueBtn.textContent = 'remove from queue';
        return;
      }

      queueBtn.textContent = 'add to queue';
    };

  };


    const watchedBtn = document.querySelector(`#watched`);
    const queueBtn = document.querySelector(`#queue`);
    // const trailerBtn = document.querySelector(`#trailer`);


    watchedBtn.addEventListener('click', onWatchedClick);
    queueBtn.addEventListener('click', onQueueClick);
    window.addEventListener('click', onWindowClick);


  function onWatchedClick() {
    //якщо фільм вже в списку
    if (watched.includes(movieId)) {
      watched.splice(watched.indexOf(movieId), 1); //видаляємо з масиву айді
      setWatched(watched); //перезаписуємо сховище
      watchedBtn.textContent = 'add to watched'; //змінити текст кнопки
      renderList(watched);
      return;
    }

    watched.push(movieId); //додати в масив айді фільма
    setWatched(watched); //записати в сховище
    watchedBtn.textContent = 'remove from watched'; //змінити текст кнопки
  }

  function onQueueClick() {
    if (queue.includes(movieId)) {
      queue.splice(queue.indexOf(movieId), 1);
      setQueue(queue);
      queueBtn.textContent = 'add to queue';
      renderList(queue);
      return;
    }

    queue.push(movieId);
    setQueue(queue);
    queueBtn.textContent = 'remove from queue';
  };
    
  function onWindowClick(e) {
    if (!modal.contains(event.target)) {
      console.log('Трейлер на паузі');
      document.querySelector('#video').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
   
      backdropModal.classList.add('is-hidden');
      watchedBtn.removeEventListener('click', onWatchedClick);
      queueBtn.removeEventListener('click', onQueueClick);
      window.removeEventListener('click', onWindowClick);
    }
  };

  const modalIframe = document.querySelector('iframe');

  const trailerBtn = document.querySelector(`#trailer`);
  console.log(trailerBtn);
  
  trailerBtn.addEventListener('click', onTrailerClick);

  function onTrailerClick() {
    modalIframe.classList.remove('is-hidden');
    console.log('кнопка работает');
  }
};
