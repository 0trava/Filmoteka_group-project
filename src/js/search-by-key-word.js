import axios from "axios";
import * as apiService from './api-service';
import * as pagination from './pagination';

const moviesAll = document.querySelector(".gallery");

//ПОШУК ПО КЛЮЧОВОМУ СЛОВУ
const input = document.querySelector('.search-form__input')
const form = document.querySelector('#search-box');

let page = 1; 

form.addEventListener('submit', onSearchByKeyWords)

function onSearchByKeyWords(e) {


    e.preventDefault(); //не перезапускає сторінку

    page = 1;
    moviesAll.innerHTML = ''; //видаляє розмітку, яка вже є 

    const search_word = input.value.trim(); //значення, яке ввели в інпут
    console.log(search_word);
    
    if (search_word !== '') {
        apiService.getSearchMovies(search_word, 1);
        pagination.initPagination(1000, apiService.getSearchMovies, search_word); 

    } else {
        console.log(error)
    }

}

// async function getMoviesByValue(value, page) {
//     const API_URL = `https://api.themoviedb.org/3/`;
//     const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';

//     try {
//         const response = await axios.get(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&include_adult=${value}`);
//         // createMarkup(response.data.results) 

//         return console.log(response)

//     } catch (error) {
//         console.log(error)
//     } 
// }






//Ф-ція для рендеру розмітки за ключовим словом
// function createMarkup(array) {
//     const API_URL_IMG=`https://image.tmdb.org/t/p/original`;
//     const markup = array.map(item => {
//         return `
//             <li class="movie-card"  ID=${item.id}>
//                 <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
//                 alt="${item.original_title}" 
//                 width="300">
//                 <h2 class="movie-card__name">${item.original_title}</h2>
//                 <p class="movie-card__text">${item.genre_ids} | ${item.release_date}</p>
//             </li>
//         `;
//     }).join('');
//     moviesAll.insertAdjacentHTML('beforeend', markup)
// }