(() => {
    const refs = {
      openModalBtn: document.querySelector("[team-modal-open]"),
      closeModalBtn: document.querySelector("[team-modal-close]"),
      modal: document.querySelector("[team-modal]"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  

    document.querySelector("a").onclick = function(e){ 
        e.preventDefault(); 
        window.open(this.href); 
      }
      
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();