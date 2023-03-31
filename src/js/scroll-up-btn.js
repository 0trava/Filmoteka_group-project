const scrollUpBtn = document.querySelector('.scroll-up-btn');
scrollUpBtn.addEventListener('click', goUp);
window.addEventListener('scroll', trackScroll)

function trackScroll() {
  const offset = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (offset > coords) {
    scrollUpBtn.classList.add('go-up-show');
  } else {
    scrollUpBtn.classList.remove('go-up-show');
  }
}

function goUp() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -75);
    setTimeout(goUp, 0);
  }
}