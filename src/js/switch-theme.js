const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  GREY: 'grey-background-theme',
};

const body = document.querySelector('body');
const footer = document.querySelector('footer');
const modal = document.querySelector('.modal');
// const card = document.querySelector('.movie-card__name');

const setElementsColor = color => {
  const elements = document.querySelectorAll('.movie-card__name');
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.color = color;
  }
};

const delClassElem = () => {
  body.classList.remove(Theme.LIGHT, Theme.DARK);
  footer.classList.remove(Theme.LIGHT, Theme.GREY);
  modal.classList.remove(Theme.LIGHT, Theme.GREY);
};

const setTheme = theme => {
  if (theme === 'darkTheme') {
    body.classList.add(Theme.DARK);
    footer.classList.add(Theme.GREY);
    modal.classList.add(Theme.GREY);
    setElementsColor('#ffffff');
  } else {
    body.classList.add(Theme.LIGHT);
    modal.classList.add(Theme.LIGHT);
    setElementsColor('#121213f7');
  }
};

const themeSwitcher = document.querySelector('#switcher');

themeSwitcher.addEventListener('change', () => {
  const theme = themeSwitcher.checked ? 'darkTheme' : 'lightTheme';
  localStorage.setItem('Theme', theme);
  delClassElem();
  setTheme(theme);
});

const savedTheme = localStorage.getItem('Theme');
if (savedTheme !== null) {
  themeSwitcher.checked = savedTheme === 'darkTheme';
  setTheme(savedTheme);
}
