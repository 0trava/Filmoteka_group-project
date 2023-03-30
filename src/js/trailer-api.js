import axios from 'axios';

// import axios from "axios";

// const API_KEY = '3fae8df0f78070a007ffb073b1444710';
// const BASE_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US`;
    
// export async function getTrailer() {
//     const options = new URLSearchParams({
//       headers: {
//         'Content-Type': 'application/json',
//         // 'key': API_KEY,
//       },
//     });
//   const res = await axios(BASE_URL, options);

//     return res.data;
// }



// async function getMovies(id) {
//     const KEY = '3fae8df0f78070a007ffb073b1444710';
//     const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`;
//     const res = await fetch(`${URL}`);
//     const data = await res.json();
//     console.log('data :>> ', data);
// }

// getMovies(2232);


const API = 'https://api.themoviedb.org/3/';
const KEY = '3fae8df0f78070a007ffb073b1444710';
const MEDIA_TYPE = 'movie';

export const getMovieTrailer = async movieId => {
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