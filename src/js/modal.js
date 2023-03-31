import * as apiService from './api-service';
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
        backdropModal.classList.add('is-hidden')
    }
};

 function onCloseButton() {
            backdropModal.classList.add('is-hidden');
 }

async function showCard(e) {
  e.preventDefault();

  if (e.target.nodeName === 'DIV') {
    return;
  }

  backdropModal.classList.remove('is-hidden');

  const movieId = e.target.id; // Отримали ID картки на яку був клік

  const movie = await apiService.getMovieInfoById(movieId); // Отримали дані фільму

  // Вивід картки фільму
  const modal = document.querySelector('.modal .body');
  modal.innerHTML = `
        <div class="modal__poster-thumb">
          <img class="modal__poster" src="${apiService.API_URL_IMG}${movie.poster_path}" alt="${movie.original_title} poster">
        </div>
   
        <div class="modal__info-thumb">
            <h2 class="modal__title">Lorem, ipsum.
            </h2>
        <table class="modal__info">
            <tr class="modal__info-entry">
            <td class="modal__info-key">Vote / Votes</td>
            <td><span class="modal__info-value-vote modal__info-value-vote--accent">0</span> / <span class="modal__info-value-vote">0</span></td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Popularity</td>
                <td class="modal__info-value">Lorem, ipsum.</td>
            </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Original Title</td>
                <td class="modal__info-value modal__info-value-title">Lorem, ipsum.</td>
        </tr>
            <tr class="modal__info-entry">
                <td class="modal__info-key">Genre</td>
                <td class="modal__info-value">Lorem, ipsum.</td>
            </tr>
        </table>

        <h3 class="modal__about">About</h3>
        <p class="modal__about-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni sint ad saepe alias a accusamus nisi atque, repellendus cupiditate exercitationem, eaque repellat animi est dolor vel quos sit aspernatur autem sapiente aliquid soluta mollitia? Accusantium, veniam dolorum! Ea sunt nobis unde, debitis rem assumenda exercitationem ducimus tempore ipsa architecto recusandae.</p>
            <div class="modal__button-container">
                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>
                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>
            </div>
        </div>
    </div>
  `;
  
  console.log(movie); 
};

