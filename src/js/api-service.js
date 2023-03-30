import axios from 'axios';

// КОНСТАНТИ 
const API_KEY = '3672c0915275ace21cbbe4fc0e9b5fda';
const API_URL_POPULAR = `https://api.themoviedb.org/3`;




// КОД - імпорту ТОР-фільмів

getTopMovies(API_URL_POPULAR);

async function getTopMovies (url) {

    const response = await axios.get(
        `${url}/trending/movie/week?api_key=${API_KEY}&page=1`
      );
     console.log(response); // перевірка вигрузки

    const respData = await response.data;
    console.log(respData); // перевірка вигрузки
    showTOPMovies (respData);// запуск  ->  ФУНКЦІЯ - створення карток  ТОР-фільмів
}

// ФУНКЦІЯ - створення карток  ТОР-фільмів

function showTOPMovies (data) {
    const moviesAll = document.querySelector(".movies");
    console.log(moviesAll); // перевірка вигрузки
    console.log(data.results[0].id); // перевірка вигрузки

    const cardStock = data.results.map( movie => 
            `<div class="card">
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" 
            loading="lazy" 
            alt="${movie.original_title}" 
            class="card_image" 
            width="300">

            <h2 class="card_name">${movie.original_title}</h2>
            <div class="card_text">
            <p class="card_title">${movie.genre_ids}</p> 
            <p class="card_year"> | ${movie.release_date}</p>      
            </div>
            </div>`)
      .join(''); // сполучення рядків всіх об'єктів (всіх картинок)
      
      moviesAll.insertAdjacentHTML('beforeend', cardStock); // вставлення розмітки на сторінку

}


// ----------------------------------------------------------------------------------------------------

