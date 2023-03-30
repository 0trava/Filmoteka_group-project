import axios from 'axios';

const API = 'https://api.themoviedb.org/3/';
const KEY = '3fae8df0f78070a007ffb073b1444710';
const MEDIA_TYPE = 'movie';

export async function getTrailer(movieId) {
  try {
    const options = new URLSearchParams({
      api_key: KEY,
    });

    const response = await axios(
      `${API}${MEDIA_TYPE}/${movieId}/videos?${options}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  } catch (error) {
    console.log('error :>> ', error);
  }
};

getMovieTrailer();