// import axios from 'axios';

// const API_KEY = '3fae8df0f78070a007ffb073b1444710';
// const BASE_URL =
//     `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=${API_KEY}&language=en-US`;
    
// export async function getTrailer() {
//     const options = new URLSearchParams({
//       headers: {
//         'Content-Type': 'application/json',
//         'key': API_KEY,
//       },
//     });
//   const resp = await axios(`${BASE_URL}`, options);

//     return resp.data;
// }

// getTrailer();


// async function getMovies(id) {
//     const KEY = '3fae8df0f78070a007ffb073b1444710';
//     const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`;
//     const res = await fetch(`${URL}`);
//     const data = await res.json();
//     console.log('data :>> ', data);
// }

// getMovies(2232);
