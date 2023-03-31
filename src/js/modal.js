
export const backdropModal = document.querySelector('.backdrop'); 



const refs = {
  gallerySelector: document.querySelector('.gallery-wrap'),
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
};

