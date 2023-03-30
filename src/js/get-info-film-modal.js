import axios from 'axios';

let filmId = 76341;

export async function fetchFilmInfo(filmId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmId}?api_key=02448dea5352c7e1c3df3db27b274523&language=ua`,
    );
// console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
// fetchFilmInfo(76341)