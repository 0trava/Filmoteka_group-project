const switcher = document.getElementById('switcher');
const link = document.getElementById('theme-link');
const switchTheme = document.querySelector('.checkbox');

const load = currTheme => {
  try {
    const serializedState = localStorage.getItem(currTheme);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

switcher.addEventListener('click', () => {
  ChangeTheme();
});
load();
function ChangeTheme() {
  const lightTheme = '/src/sass/components/_switch-light-btn.scss';
  const darkTheme = '/src/sass/components/_switch-dark-btn.scss';
  let theme = 'light';
  let currTheme = link.getAttribute('href');

  if (currTheme == lightTheme) {
    currTheme = darkTheme;
    theme = 'dark';
    window.localStorage.setItem('currTheme', theme);
    document.body.style.backgroundColor = '#28292c';
  } else {
    currTheme = lightTheme;
    theme = 'light';
    window.localStorage.setItem('currTheme', theme);
    document.body.style.backgroundColor = '#d8dbe0';
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
