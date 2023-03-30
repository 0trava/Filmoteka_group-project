
export const backdropModal = document.querySelector('.backdrop'); 

const gallerySelector = document.querySelector('.card');

const closeButton = document.querySelector('.modal__button-close');

gallerySelector.addEventListener('click', renderModal); 

window.addEventListener('keydown', closeModalHandler);

closeButton.addEventListener('click', onCloseButton);



function closeModalHandler(evt) {
    if (evt.code === 'Escape') {
        backdropModal.classList.add('is-hidden')
    }
};

 function onCloseButton() {
            backdropModal.classList.add('is-hidden');
 }
          


function renderModal({ poster_path,
  vote_average,
  vote_count,
  popularity,
  original_title,
  genre_ids,
  overview,
  name,
    original_name, })
{

    backdropForMoviesModal.innerHTML = 
    `<div class="modal">
  <button type="button" class="modal__button-close" data-modal-close>
    <svg class="modal__icon-close" width="14" height="14">
      <use href="../images/symbol-defs.svg#icon-close"></use>
    </svg>
  </button>
  <div class="modal__poster-thumb">
    <img src="https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}${poster_path}" alt="&{title}" class="modal__poster" />
  </div>
  <div class="modal__info-thumb">
    <h2 class="modal__movie-title"></h2>
  </div>
  <table class="modal__moovie-info">
    <tr class="modal__moovie-info-entry">
      <td class="modal__moovie-info-key">Vote / Votes</td>
      <td>
        <span class="modal__moovie-info-value-vote modal__moovie-info-value-vote--accent"
          >${vote_average.toFixed( 1 )}</span
        >
        / <span class="modal__moovie-info-value-vote">${vote_count}</span>
      </td>
    </tr>
    <tr class="modal__info-entry">
      <td class="modal__info-key">Popularity</td>
      <td class="modal__info-value">${popularity.toFixed( 1 )}</td>
    </tr>
    <tr class="modal__info-entry">
      <td class="modal__info-key">Original Title</td>
      <td class="modal__info-value modal__info-value-title">
        ${ name || original_title || original_name }
      </td>
    </tr>
    <tr class="modal__info-entry">
      <td class="modal__info-key">Genre</td>
      <td class="modal__info-value">${genre_ids} Lorem ipsum dolor sit amet.</td>
    </tr>
  </table>

    <h3 class="modal__about-title">About</h2>
    <p class="modal__about-text">${overview}</p>
    <div class="modal__button-thumb">
        <button id="addToWatched" type="button" class="modal__button-watched"></button>
        <button id="addToQueue" type="button" class="modal__button-queue"></button>
    </div>

</div>
`
};