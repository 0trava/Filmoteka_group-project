// Виводить рейтинг фільму
export function renderRatingForMovie(starValue, movieId, type) {
    let str = ``;

    for (let i = 5; i >= 1; i -= 1) {
        let checked = "";
        if (i === starValue) {
            checked = "checked";
        }
        str += ` <input type="radio" id="star${i}-${movieId}-${type}" name="rate-${movieId}-${type}" value="${i}" ${checked}>
                  <label for="star${i}-${movieId}-${type}" title="text"></label>`;
    }

   return str;
}