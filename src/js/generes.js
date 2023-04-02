export const movieGenresIds = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};


export function getGenre(genre_ids) {
  return genre_ids.map(id => movieGenresIds[id]).join(', ');
}

export function getGenrelibrary(genre_ids) {
  return genre_ids.map(({ name }) => name).join(', ');
}

// Функція створення посилань на жанри
export function getGenreLinks() {
  const keys = Object.keys(movieGenresIds);
  let generes = []
  for (const key of keys) {
    generes.push({
      'id': key,
      'name': movieGenresIds[key],
    });
  }
  
  const generesLi = generes.sort((a, b) => a.name.localeCompare(b.name)).map(({ id, name }) => {
    return `
      <li class="navigation__item"><a class="navigation__link" href="" id="${id}">${name}</a></li>
    `;
  }).join('');

  return `<ul>${generesLi}</ul>`;
}
