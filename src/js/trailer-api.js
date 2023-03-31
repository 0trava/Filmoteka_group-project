
const API = 'https://api.themoviedb.org/3/';
const API_KEY = '3fae8df0f78070a007ffb073b1444710';

getVideos(603692);

async function getVideos(movieID) {
  const resp = await fetch(
    `${API}movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`
  );

import axios from 'axios';


  const respData = await resp.json();

  console.log(respData);
}