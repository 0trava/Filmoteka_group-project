import initPagination from './pagination';
import axios from 'axios';

const API_URL_IMG=`https://image.tmdb.org/t/p/original`;
const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';


const refs = {
    gallery: document.querySelector('.gallery'),
}

getMovies(1);
initPagination(1000, getMovies); 

async function getMovies(page) {
    const resp = await fetch( `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`);

    const respData = await resp.json();
  //  console.log(respData);

    const data = respData["results"].map(item => {
        return `
            <li class="movie-card">
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300">
                <h2 class="movie-card__name">${item.original_title}</h2>
                <p class="movie-card__text">${item.genre_ids} | ${item.release_date}</p>
            </li>
        `;
    }).join('');
    refs.gallery.innerHTML = data;
}



