(() => {
    const refs = {
      openModalBtn: document.querySelector("[team-modal-open]"),
      closeModalBtn: document.querySelector("[team-modal-close]"),
      modal: document.querySelector("[team-modal]"),
  };
  
  window.addEventListener("click", clickBackdropCloseModal);
  window.addEventListener('keydown', closeModalByClickEscape);
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  
  function clickBackdropCloseModal(e) {
    if (e.target === refs.modal) {
      refs.modal.classList.add('is-hidden');
    }
  }

  function closeModalByClickEscape(e) {
  if (e.code === 'Escape') {
    refs.modal.classList.add('is-hidden');
  }
}
      
  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();