const switcher = document.getElementById('switcher');
const link = document.getElementById('theme-link');
const switchTheme = document.querySelector('.checkbox');
const savedTheme = localStorage.getItem('currTheme');

const load = currTheme => {
  try {
    let theme = window.localStorage.getItem(currTheme);
    if (theme === null) {
      theme = 'light';
      window.localStorage.setItem(currTheme, theme);
    }
    return theme;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
//  стан чекбокса та тема при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const currTheme = load('currTheme');
  if (currTheme === 'dark') {
    switcher.checked = true;
    link.setAttribute('href', '/src/sass/components/_switch-dark-btn.scss');
    document.body.style.backgroundColor = '#28292c';
  } else if (currTheme === 'light') {
    switcher.checked = false;
    link.setAttribute('href', '/src/sass/components/_switch-light-btn.scss');
    document.body.style.backgroundColor = '#d8dbe0';
  }
});

switcher.addEventListener('click', () => {
  ChangeTheme();
});

function ChangeTheme() {
  const lightTheme = '/src/sass/components/_switch-light-btn.scss';
  const darkTheme = '/src/sass/components/_switch-dark-btn.scss';
  let theme = 'light';
  let currTheme = link.getAttribute('href');

  if (currTheme == lightTheme) {
    currTheme = darkTheme;
    theme = 'dark';
    window.localStorage.setItem('currTheme', theme);
    document.body.style.backgroundColor = 'var(--darkThemebackgroundColor)';
  } else {
    currTheme = lightTheme;
    theme = 'light';
    window.localStorage.setItem('currTheme', theme);
    document.body.style.backgroundColor = 'var(--lightThemebackgroundColor)';
  }

  link.setAttribute('href', currTheme);
}

const save = (currTheme, theme) => {
  try {
    const serializedState = JSON.stringify(theme);
    localStorage.setItem(currTheme, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export default {
  save,
  load,
};
