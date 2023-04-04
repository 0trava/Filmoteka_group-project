// import * as apiService from './api-service';
import {
  watched,
  queue,
  getQueue,
  getWatched,
  setQueue,
  setWatched,
} from './local-storage';
import { renderList, PAGE_OPEN } from './watched-queue-run';
import { getGenrelibrary } from './modal-genres';

export const backdropModal = document.querySelector('.backdrop');

const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
const API_URL=`https://api.themoviedb.org/3/`;
const API_URL_IMG=`https://image.tmdb.org/t/p/original`;


const refs = {
  backdropModal: document.querySelector('.backdrop'),
  gallerySelector: document.querySelector('.library-gallery-wrap'),
  closeButton: document.querySelector('.modal__button-close'),
  darkerBackdrop: document.querySelector('.darker'),
  modal: document.querySelector('.modal'),
};

let movieId = 0;

window.addEventListener('keydown', closeModalHandler);
window.addEventListener('click', clickBackdropCloseModal);
refs.closeButton.addEventListener('click', onCloseButton);
refs.gallerySelector.addEventListener('click', showCard);

// зачинення по кліку поза модалкою

function clickBackdropCloseModal(e) {
  if (e.target === refs.backdropModal) {
    onCloseButton(e);
    // повертаємо скрол
    document.body.style.overflow = '';
    refs.darkerBackdrop.classList.add('is-hidden');
  }
}

// добавляем обработчик клика на весь документ

function closeModalHandler(evt) {
  if (evt.code === 'Escape') {
    onCloseButton(evt);
    // повертаємо скрол
    document.body.style.overflow = '';
    refs.darkerBackdrop.classList.add('is-hidden');
  }

}

function onCloseButton(e) {
  if (e.target === backdropModal || e.code === 'Escape') {
    backdropModal.classList.add('is-hidden');
    // повертаємо скрол
    document.body.style.overflow = '';
    refs.darkerBackdrop.classList.add('is-hidden');
  }

  refs.backdropModal.classList.add('is-hidden');
  // повертаємо скрол
  document.body.style.overflow = '';
  refs.darkerBackdrop.classList.add('is-hidden');
}


// КЛІК - по картці
async function showCard(e) {
  e.preventDefault();
  
  //console.log(e.target.nodeName);
  // знімаємо скрол
  document.body.style.overflow = 'hidden';
  const darkerBackdrop = document.querySelector('.darker');

  if (e.target.nodeName === 'UL') {
    return;
  }


  refs.backdropModal.classList.remove('is-hidden');

  if (!e.target.parentNode.classList.contains('rating')) {
    movieId = e.target.id; // Отримали ID картки на яку був клік
  }
  


  // Отримуємо дані фільму
  const movie = await getMovieInfoById(movieId);
  let genres = getGenrelibrary(movie.genres);
  console.log(PAGE_OPEN);

  async function getMovieInfoById(movieID) {
    const resp = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
    );

    const respData = await resp.json();

    return respData;
  }

  // Отримуємо youtube трейлер
  const youtubeTrailer = await getYoutubeTrailerByMovieId(movieId);
  //console.log(youtubeTrailer);

  async function getYoutubeTrailerByMovieId(movieId) {
    const response = await fetch(
      `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    const responseData = await response.json();
    //console.log(responseData);

    if (responseData.results.length > 0) {
      return responseData['results'][0]['key'];
    }
  }

  // Вивід картки фільму
  const modal = document.querySelector('.modul-card-to-add');

  // Рейтинг фільму
  const starValue = getRatingByMovieId(movieId);

  createModalCard(modal, starValue);
  
  function createModalCard(cardForModal, starValue) {
    let str = `
      <div class="rating">`;
    for (let i = 5; i >= 1; i -= 1) {
      let checked = "";
      if (i === starValue) {
        checked = "checked";
      }
      str += ` <input type="radio" id="star${i}" name="rate" value="${i}" ${checked}>
                  <label for="star${i}" title="text"></label>`;
    }
    str += `
        </div>
      </div>`;
    const renderRating = str;

    
    cardForModal.innerHTML = `
    <div class="modal__poster-thumb">
      <img class="modal__poster" src="${API_URL_IMG}${movie.poster_path}" alt="${movie.original_title} poster">
    </div>
   

        <div class="modal__info-thumb">
            <h2 class="modal__title">${movie.original_title}</h2>
            <div class="modal-library_my-rating">
            <p class="modal-library__info-key">My rating</p>
           ${renderRating}
        <table class="modal__info">
            <tr class="modal__info-entry">
            <td class="modal__info-key">Vote / Votes</td>
            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${movie.vote_average.toFixed([1])}</span> / 
            <span class="modal__info-value-vote">${movie.vote_count}</span></td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Popularity</td>
                <td class="modal__info-value">${movie.popularity.toFixed([1,])}</td>
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
            ><svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" style="vertical-align: bottom;"><path d="M61.115,18.856C63.666,21.503,64,25.709,64,36s-0.334,14.497-2.885,17.144C58.563,55.791,55.906,56,36,56  s-22.563-0.209-25.115-2.856C8.334,50.497,8,46.291,8,36s0.334-14.497,2.885-17.144S16.094,16,36,16S58.563,16.209,61.115,18.856z M31.464,44.476l13.603-8.044l-13.603-7.918V44.476z"/></svg></span>
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
    }

    // Додаємо прослуховувач на рейтинг
    ratingStars = document.querySelector('.rating');
    ratingStars.addEventListener('click', onRatingClick);
    
     // Зберегти рейтинг
    function onRatingClick(e) {
      const starValue = e.target.value;
      if (starValue && movieId) {

        const stars = JSON.parse(localStorage.getItem('star')) || [];
        const id = stars.findIndex(item => item.id === movieId);
        if (id !== -1) {
          stars[id].star = starValue;
        } else {
          stars.push({'id': movieId, 'star': starValue});
        }
      
        localStorage.setItem('star', JSON.stringify(stars));
      }
    }
  }

  // Отримати рейтинг фильма
  function getRatingByMovieId(movieId) {
      const stars = JSON.parse(localStorage.getItem('star')) || [];
      const id = stars.findIndex(item => item.id === movieId);
      if (id !== -1) {
        return parseInt(stars[id].star);
      } else {
        return 0;
      }
  }

	
	

  const watchedBtn = document.querySelector(`#watched`);
  const queueBtn = document.querySelector(`#queue`);
  // const trailerBtn = document.querySelector(`#trailer`);

  watchedBtn.addEventListener('click', onWatchedClick);
  queueBtn.addEventListener('click', onQueueClick);
  // window.addEventListener('click', onWindowClick);

  function onWatchedClick() {
    //якщо фільм вже в списку
    if (watched.includes(movieId)) {
      watched.splice(watched.indexOf(movieId), 1); //видаляємо з масиву айді
      setWatched(watched); //перезаписуємо сховище
      watchedBtn.textContent = 'add to watched'; //змінити текст кнопки

      renderList(watched); //оновлюємо сторінку
      return;
    }

    watched.push(movieId); //додати в масив айді фільма
    setWatched(watched); //записати в сховище
    watchedBtn.textContent = 'remove from watched'; //змінити текст кнопки
    renderList(watched); //оновлюємо сторінку
  }

  function onQueueClick() {
    if (queue.includes(movieId)) {
      queue.splice(queue.indexOf(movieId), 1);
      setQueue(queue);//перезаписуємо сховище
      queueBtn.textContent = 'add to queue';//змінити текст кнопки
      console.log(queue);
      // onlibQueueBtnClick(queue);
      renderList(queue); //оновлюємо сторінку
      return;
    }

    queue.push(movieId);
    setQueue(queue);
    queueBtn.textContent = 'remove from queue';
    renderList(queue); //оновлюємо сторінку
  }

  function onWindowClick(e) {
    if (e.target.parentNode.classList.contains('rating')) {
      return;
    }

    if (!modal.contains(e.target)) {
      //console.log('Трейлер на паузі');
      document
        .querySelector('#video')
        .contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );

      refs.backdropModal.classList.add('is-hidden');
      watchedBtn.removeEventListener('click', onWatchedClick);
      queueBtn.removeEventListener('click', onQueueClick);
      window.removeEventListener('click', onWindowClick);
    }
  }


  const modalIframe = document.querySelector('iframe');
  const trailerBtn = document.querySelector(`#trailer`);

  trailerBtn.addEventListener('click', onTrailerClick);

  function onTrailerClick() {
    modalIframe.classList.remove('is-hidden');
    darkerBackdrop.classList.remove('is-hidden');

    watchedBtn.removeEventListener('click', onWatchedClick);
    queueBtn.removeEventListener('click', onQueueClick);
  }


  darkerBackdrop.addEventListener('click', onDarkerClick);

  function onDarkerClick(e) {
    if (e.target === modalIframe) {
      return;
    }


    if (!modal.contains(e.target)) {
      console.log('Трейлер на паузі');
      document.querySelector('#video').test.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');

      // if (!modalIframe.paused) {
      //   modalIframe.pause()
      // }

      darkerBackdrop.classList.add('is-hidden');
      modalIframe.classList.add('is-hidden');

       watchedBtn.addEventListener('click', onWatchedClick);
      queueBtn.addEventListener('click', onQueueClick);
    }
  }

};



