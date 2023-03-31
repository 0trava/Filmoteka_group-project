
// Потрібен слухач на дію - клік по стеку карток на сторінці Home та Library. 
// З якого ми повинні отримати ID картки 

//  ФІНІШ - запускаємо функцію куди передаємо ID картки ( для запукси модалки та рендеренгу). Для відпрацювання поки що передаємо у console.log


let MOVIE_ID ="";

// Підключаємось до данних сторінки index.html
const refs = {
    gallery: document.querySelector('.gallery'),
};

refs.gallery.addEventListener('click', getMovieId);


function  getMovieId(evt) {
    const getMovieID = evt.target.id; // Отримали ID картки на яку був клік
    console.log(getMovieID); // !!!!!!!!!!!!!!!   ПІДСТАВИТИ ФУНКЦІЮ ДЛЯ ПЕРЕДАЧІ ID
};




















