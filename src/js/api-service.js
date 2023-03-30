import initPagination from './pagination';
import axios from 'axios';


const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
const API_URL=`https://api.themoviedb.org/3/`;
const API_URL_IMG=`https://image.tmdb.org/t/p/original`;



const moviesAll = document.querySelector(".gallery");

getMovies(1);
initPagination(1000, getMovies); 

async function getMovies(page) {
    const resp = await fetch( `${API_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`);

    const respData = await resp.json();
  //  console.log(respData);

    const data = respData["results"].map(item => {
        return `
            <li class="movie-card"  ID=${item.id}> >
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300">
                <h2 class="movie-card__name">${item.original_title}</h2>
                <p class="movie-card__text">${item.genre_ids} | ${item.release_date}</p>
            </li>
        `;
    }).join('');
    moviesAll.insertAdjacentHTML('beforeend', data); // вставлення розмітки на сторінку
    // refs.gallery.innerHTML = data;
}



