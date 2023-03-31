
const API = 'https://api.themoviedb.org/3/';
const API_KEY = '3fae8df0f78070a007ffb073b1444710';

getVideos(603692);

async function getVideos(movieID) {
  const response = await fetch(
    `${API}movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`
  );

  const responseData = await response.json();

  console.log(responseData);
}
