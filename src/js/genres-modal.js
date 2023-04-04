(() => {
  const refs = {
    openModalGenresBtn: document.querySelector('[genres-modal-open]'),
    closeModalGenreslBtn: document.querySelector('[genres-modal-close]'),
    modalGenres: document.querySelector('[genres-modal]'),
  };

  window.addEventListener('click', clickBackdropCloseModalGenres);
  window.addEventListener('keydown', closeModalGenresByClickEscape);
  refs.openModalGenresBtn.addEventListener('click', toggleModalGenres);
  refs.closeModalGenreslBtn.addEventListener('click', toggleModalGenres);

  function clickBackdropCloseModalGenres(e) {
    if (e.target === refs.modalGenres) {
      refs.modalGenres.classList.add('is-hidden');
    }
  }

  function closeModalGenresByClickEscape(e) {
    if (e.code === 'Escape') {
      refs.modalGenres.classList.add('is-hidden');
    }
  }

  function toggleModalGenres() {
    refs.modalGenres.classList.toggle('is-hidden');
    // document.body.classList.toggle('stop-scrolling');
  }
})();
