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

const darkerBackdrop = document.querySelector('.darker');

window.addEventListener('keydown', closeModalHandler);
// window.addEventListener('click', onCloseButton);
refs.closeButton.addEventListener('click', onCloseButton);
refs.gallerySelector.addEventListener('click', showCard);

// зачинення по кліку поза модалкою

const modal = document.querySelector('.modal');
const modalIframe = document.querySelector('iframe');

// добавляем обработчик клика на весь документ

// ->>>>>>

function closeModalHandler(evt) {
  if (evt.code === 'Escape') {
    backdropModal.classList.add('is-hidden');

    // повертаємо скрол
    document.body.style.overflow = '';
    darkerBackdrop.classList.add('is-hidden');

  }
}

function onCloseButton() {
  backdropModal.classList.add('is-hidden');
   // повертаємо скрол
  document.body.style.overflow = '';
  darkerBackdrop.classList.add('is-hidden');


}

async function showCard(e) {
  e.preventDefault();
  // знімаємо скрол
  document.body.style.overflow = 'hidden';
  const darkerBackdrop = document.querySelector('.darker');

  if (e.target.nodeName === 'UL') {
    return;
  }

  backdropModal.classList.remove('is-hidden');
  darkerBackdrop.classList.add('is-hidden');

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
  console.log('youtubeTrailer :>> ', youtubeTrailer);

  // Вивід картки фільму
  const modal = document.querySelector('.modul-card-to-add');

  createModalCard(modal);

  function createModalCard(cardForModal) {
    cardForModal.innerHTML = `
    <div class="modal__poster-thumb">
          <img class="modal__poster" src="${apiService.API_URL_IMG
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
            <button id="trailer" type="button" class="modal__button modal__button-trailer"><span class="svg_span"
                ><svg width="40px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M61.115,18.856C63.666,21.503,64,25.709,64,36s-0.334,14.497-2.885,17.144C58.563,55.791,55.906,56,36,56  s-22.563-0.209-25.115-2.856C8.334,50.497,8,46.291,8,36s0.334-14.497,2.885-17.144S16.094,16,36,16S58.563,16.209,61.115,18.856z M31.464,44.476l13.603-8.044l-13.603-7.918V44.476z"/></svg></span>
            Trailer</button>


                <iframe id="video" class="modal__iframe is-hidden" width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeTrailer}?enablejsapi=1" 
                title="Mia and me - Mia and me Day 2014" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
            </div>
        </div>
    </div>
  `;

    // ПЕРЕВІРКА - чи в списку бібліотеки

    onWatchedCheck();
    onQueueCheck();

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


  watchedBtn.addEventListener('click', onWatchedClick);
  queueBtn.addEventListener('click', onQueueClick);
  // window.addEventListener('click', onWindowClick);


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
      setQueue(queue);
      queueBtn.textContent = 'add to queue';
      return;
    }

    queue.push(movieId);
    setQueue(queue);
    queueBtn.textContent = 'remove from queue';
  }


  // маніпуляціі з трейлером


  // function onWindowClick(e) {
  //   if (!modal.contains(e.target)) {
  //     console.log('Трейлер на паузі');
  //     document
  //       .querySelector('#video')
  //       .contentWindow.postMessage(
  //         '{"event":"command","func":"pauseVideo","args":""}',
  //         '*'
  //       );

  //     backdropModal.classList.add('is-hidden');

  //     watchedBtn.removeEventListener('click', onWatchedClick);
  //     queueBtn.removeEventListener('click', onQueueClick);
  //     window.removeEventListener('click', onWindowClick);
  //   }
  // }

  const modalIframe = document.querySelector('iframe');
  const trailerBtn = document.querySelector(`#trailer`);
  
  console.log(trailerBtn);

  trailerBtn.addEventListener('click', onTrailerClick);

  function onTrailerClick() {
    modalIframe.classList.remove('is-hidden');
    darkerBackdrop.classList.remove('is-hidden');

    watchedBtn.removeEventListener('click', onWatchedClick);
    queueBtn.removeEventListener('click', onQueueClick);
    // window.removeEventListener('click', onWindowClick);

  }

  darkerBackdrop.addEventListener('click', onDarkerClick);

  function onDarkerClick(e) {
    if (e.target === modalIframe) {
      return;
    }


    if (!modal.contains(e.target)) {
      console.log('Трейлер на паузі');
      document
        .querySelector('#video')
        .contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      // if (!modalIframe.paused) {
      //   modalIframe.pause()
      // }

      darkerBackdrop.classList.add('is-hidden');
      modalIframe.classList.add('is-hidden');

       watchedBtn.addEventListener('click', onWatchedClick);
      queueBtn.addEventListener('click', onQueueClick);
    }

  }
  
}