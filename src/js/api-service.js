import initPagination from './pagination';

const API_KEY = '34e68a416eb051ec4adf34df5a0038fd';
const API_URL=`https://api.themoviedb.org/3/`;
const API_URL_IMG=`https://image.tmdb.org/t/p/original`;

const moviesAll = document.querySelector(".gallery");

// Вивести дані першої сторінки
getMovies(1);

// Активувати пагінацію
initPagination(1000, getMovies); 




// Функція виводу ТОП фільмів
async function getMovies(page) {
    // Включити loader
    const spinner = document.querySelector('.dot-spinner');
    spinner.classList.remove('is-hidden');

    // Отримати дані з сервера
    const resp = await fetch( `${API_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`);

    const respData = await resp.json();

    // Виключити loader
    spinner.classList.add('is-hidden');

    // Сформувати карточки фільмів
    const data = respData["results"].map(item => {
        return `
            <li class="movie-card"  ID=${item.id}>
                <img class="movie-card__image" src="${API_URL_IMG}${item.poster_path}" 
                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" 
                alt="${item.original_title}" 
                width="300"
                ID=${item.id}>
                <h2 class="movie-card__name"   ID=${item.id}>${item.original_title}</h2>
                <p class="movie-card__text"   ID=${item.id}>${item.genre_ids} | ${item.release_date}</p>
            </li>
        `;
    }).join('');
  
    // Додати фільми у галерею
    moviesAll.innerHTML = data;
}



