// import axios from 'axios';

const API_KEY = 'a183424c-2c54-4420-b62b-801b3a7db5c4';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

getMovies(API_URL_POPULAR);

async function getMovies (url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    })

    const respData = await resp.json();
    console.log(respData)
}