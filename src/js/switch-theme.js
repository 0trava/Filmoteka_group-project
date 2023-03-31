const switcher = document.getElementById('switcher');
const link = document.getElementById('theme-link');

const savedTheme = localStorage.getItem('currTheme');

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = loadTheme('currTheme');
  setTheme(currentTheme);
});

switcher.addEventListener('click', () => {
  changeTheme();
});

const loadTheme = currTheme => {
  try {
    let theme = localStorage.getItem(currTheme);

    if (theme === null) {
      theme = 'light';
      saveTheme(currTheme, theme);
    }
    return theme;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const saveTheme = (currTheme, theme) => {
  try {
    localStorage.setItem(currTheme, theme);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const setTheme = currentTheme => {
  const { lightTheme, darkTheme, lightBackground, darkBackground } =
    getThemeStyles();

  if (currentTheme === 'dark') {
    switcher.checked = true;
    link.setAttribute('href', darkTheme);
    document.body.style.backgroundColor = darkBackground;
    setElementsColor('#000');
  } else {
    switcher.checked = false;
    link.setAttribute('href', lightTheme);
    document.body.style.backgroundColor = lightBackground;
    setElementsColor('#fff');
  }
};

const changeTheme = () => {
  const { lightTheme, darkTheme, lightBackground, darkBackground } =
    getThemeStyles();
  let theme = 'light';
  setElementsColor('#ffffff');
  let currTheme = link.getAttribute('href');

  if (currTheme === lightTheme) {
    currTheme = darkTheme;
    theme = 'dark';
    saveTheme('currTheme', theme);
    document.body.style.backgroundColor = darkBackground;
    setElementsColor('#ffffff');
  } else {
    currTheme = lightTheme;
    theme = 'light';
    saveTheme('currTheme', theme);
    document.body.style.backgroundColor = lightBackground;
    setElementsColor('#000000');

  }

  link.setAttribute('href', currTheme);
};

const getThemeStyles = () => {
  const lightTheme = '/src/sass/components/_switch-light-btn.scss';
  const darkTheme = '/src/sass/components/_switch-dark-btn.scss';
  const lightBackground = '#d8dbe0';
  const darkBackground = '#28292c';
  const lightFont = '#000000';
  const darkFont = '#ffffff';
  return {
    lightTheme,
    darkTheme,
    lightBackground,
    darkBackground,
    lightFont,
    darkFont,
  };
};

const setElementsColor = color => {
  const elements = document.querySelectorAll(
    '.movie-card__name',
    '.tui-page-btn',
    '.home-footer-page'
  );
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.color = color;
  }
};

export default {
  saveTheme,
  loadTheme,
};
