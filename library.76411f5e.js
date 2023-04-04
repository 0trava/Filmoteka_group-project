const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],a=JSON.parse(localStorage.getItem(t))||[];function o(t){localStorage.setItem(e,JSON.stringify(t))}function d(e){localStorage.setItem(t,JSON.stringify(e))}function s(e){if(e)return e.map((({name:e})=>e)).join(", ")}const i="34e68a416eb051ec4adf34df5a0038fd",r="https://api.themoviedb.org/3/",c="https://image.tmdb.org/t/p/original",l=document.querySelector(".library-btn__watched"),u=document.querySelector(".library-btn__queue"),m=(document.querySelector(".library-gallery-wrap"),document.querySelector(".library-bg-image")),v=document.querySelector(".library-gallery-box"),g=document.querySelector(".dot-spinner");async function p(){if(0===n.length)return console.log("start"),m.classList.remove("is-hidden"),void(v.innerHTML="");g.classList.remove("is-hidden"),g.classList.add("is-hidden"),y(n)}async function f(e){const t=e.map((e=>async function(e){const t=await fetch(`${r}movie/${e}?api_key=${i}&language=en-US`);return await t.json()}(e)));return await Promise.all(t)}async function y(e){const t=await f(e);if(document.querySelector("#video")||0===t.length)return console.log("empty"),m.classList.remove("is-hidden"),v.innerHTML='<div class="library-bg-image is-hidden">\n        <h2 class="library-text">Sorry, but your list is empty ...</h2>\n        <img\n          src="./images/Library/movie.png"\n          alt="cinema"\n          class="js-library-bg-image visually-hidden"\n          width="600"\n        />\n      \n  </div>',void console.log(v);const n=function(e){return e.reduce(((e,t)=>e+function(e){let t=s(e.genres);const n=function(e){const t=JSON.parse(localStorage.getItem("star"))||[],n=t.findIndex((t=>parseInt(t.id)===parseInt(e)));return-1!==n?parseInt(t[n].star):0}(e.id);let a='\n      <div class="rating">';for(let e=5;e>=1;e-=1){let t="";e===n&&(t="checked"),a+=` <input type="radio" id="star${e}" name="rate" value="${e}" ${t}>\n                  <label for="star${e}" title="text"></label>`}return a+="\n        </div>\n      </div>",a="<p>Ждем код</p>",`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${c}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <div class="library-stars">\n                ${a}\n                </div>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${t} | ${e.release_date?.substring(0,4)}\n                <span class="movie-card__box">\n                <span class="movie-card__average">${e.vote_average.toFixed([1])}</span>\n                </span>\n                </p>\n            </li>`}(t)),"")}(t);m.classList.add("is-hidden"),v.innerHTML="",v.insertAdjacentHTML("beforeend",n)}l.addEventListener("click",p),u.addEventListener("click",(async function(){if(0===a.length)return console.log("start"),m.classList.remove("is-hidden"),void(v.innerHTML=" ");g.classList.remove("is-hidden"),g.classList.add("is-hidden"),y(a)})),window.addEventListener("load",p),l.classList.add("active"),l.addEventListener("click",(()=>{l.classList.add("active"),u.classList.remove("active")})),u.addEventListener("click",(()=>{u.classList.add("active"),l.classList.remove("active")})),window.addEventListener("load",(()=>{l&&(l.checked=!0,l.parentNode.classList.add("checked"))}));const h="light-theme",_="dark-theme",b="grey-background-theme",w=document.querySelector("body"),L=document.querySelector("footer"),S=document.querySelector("#modal"),k=e=>{const t=document.querySelectorAll(".movie-card__name");document.querySelector(".tui-page-btn");for(let n=0;n<t.length;n++)t[n].style.color=e},q=e=>{"darkTheme"===e?(w.classList.add(_),L.classList.add(b),S.classList.add(b),k("#ffffff")):(w.classList.add(h),S.classList.add(h),k("#121213f7"))},$=document.querySelector("#switcher");$.addEventListener("change",(()=>{const e=$.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),w.classList.remove(h,_),L.classList.remove(h,b),S.classList.remove(h,b),q(e)}));const x=localStorage.getItem("Theme");null!==x&&($.checked="darkTheme"===x,q(x)),w.classList.add("animated"),(()=>{const e={openModalBtn:document.querySelector("[team-modal-open]"),closeModalBtn:document.querySelector("[team-modal-close]"),modal:document.querySelector("[team-modal]")};function t(){e.modal.classList.toggle("is-hidden"),document.body.classList.toggle("stop-scrolling")}window.addEventListener("click",(function(t){t.target===e.modal&&e.modal.classList.add("is-hidden")})),window.addEventListener("keydown",(function(t){"Escape"===t.code&&e.modal.classList.add("is-hidden")})),e.openModalBtn.addEventListener("click",t),e.closeModalBtn.addEventListener("click",t)})();const E=document.querySelector(".scroll-up-btn");E.addEventListener("click",(function e(){window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(e,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,t=document.documentElement.clientHeight;e>t?E.classList.add("go-up-show"):E.classList.remove("go-up-show")}));const I="34e68a416eb051ec4adf34df5a0038fd",M="https://api.themoviedb.org/3/",T={backdropModal:document.querySelector(".backdrop"),gallerySelector:document.querySelector(".library-gallery-wrap"),closeButton:document.querySelector(".modal__button-close"),darkerBackdrop:document.querySelector(".darker"),modal:document.querySelector(".modal")};let O=0;function B(){T.backdropModal.classList.add("is-hidden"),document.body.style.overflow="",T.darkerBackdrop.classList.add("is-hidden")}window.addEventListener("keydown",(function(e){"Escape"===e.code&&(B(),document.body.style.overflow="",T.darkerBackdrop.classList.add("is-hidden"))})),window.addEventListener("click",(function(e){e.target===T.backdropModal&&(B(),document.body.style.overflow="",T.darkerBackdrop.classList.add("is-hidden"))})),T.closeButton.addEventListener("click",B),T.gallerySelector.addEventListener("click",(async function(e){e.preventDefault(),document.body.style.overflow="hidden";document.querySelector(".darker");if("UL"===e.target.nodeName)return;T.backdropModal.classList.remove("is-hidden"),e.target.parentNode.classList.contains("rating")||(O=e.target.id);const t=await async function(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${I}&language=en-US`);return await t.json()}(O);let i=s(t.genres);const r=await async function(e){const t=await fetch(`${M}movie/${e}/videos?api_key=${I}&language=en-US`),n=await t.json();if(n.results.length>0)return n.results[0].key}(O);const c=document.querySelector(".modul-card-to-add"),l=function(e){const t=JSON.parse(localStorage.getItem("star"))||[],n=t.findIndex((t=>t.id===e));return-1!==n?parseInt(t[n].star):0}(O);!function(e,o){let d='\n      <div class="rating">';for(let e=5;e>=1;e-=1){let t="";e===o&&(t="checked"),d+=` <input type="radio" id="star${e}" name="rate" value="${e}" ${t}>\n                  <label for="star${e}" title="text"></label>`}d+="\n        </div>\n      </div>";const s=d;e.innerHTML=`\n    <div class="modal__poster-thumb">\n      <img class="modal__poster" src="https://image.tmdb.org/t/p/original${t.poster_path}" alt="${t.original_title} poster">\n    </div>\n   \n\n        <div class="modal__info-thumb">\n            <h2 class="modal__title">${t.original_title}</h2>\n            <div class="modal-library_my-rating">\n            <p class="modal-library__info-key">My rating</p>\n           ${s}\n        <table class="modal__info">\n            <tr class="modal__info-entry">\n            <td class="modal__info-key">Vote / Votes</td>\n            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${t.vote_average.toFixed([1])}</span> / \n            <span class="modal__info-value-vote">${t.vote_count}</span></td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Popularity</td>\n                <td class="modal__info-value">${t.popularity.toFixed([1])}</td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Original Title</td>\n                <td class="modal__info-value modal__info-value-title">${t.original_title}</td>\n          </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Genre</td>\n                <td class="modal__info-value">${i}</td>\n            </tr>\n        </table>\n\n        <h3 class="modal__about">About</h3>\n        <p class="modal__about-text">${t.overview}</p>\n            <div class="modal__button-container">\n                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>\n                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>\n            </div>\n\n            <div class="modal__button-trailer-wrap">\n            <button id="trailer" type="button" class="modal__button modal__button-trailer"><span class="svg_span"\n            ><svg width="40px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" width="64px" height="64px"><path d="M61.115,18.856C63.666,21.503,64,25.709,64,36s-0.334,14.497-2.885,17.144C58.563,55.791,55.906,56,36,56  s-22.563-0.209-25.115-2.856C8.334,50.497,8,46.291,8,36s0.334-14.497,2.885-17.144S16.094,16,36,16S58.563,16.209,61.115,18.856z M31.464,44.476l13.603-8.044l-13.603-7.918V44.476z"/></svg></span>\n       Trailer</button>\n\n\n                <iframe id="video" class="modal__iframe is-hidden" width="1237" height="696" src="https://www.youtube.com/embed/${r}" title="Mia and me - Mia and me Day 2014" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n            </div>\n        </div>\n    </div>\n  `,function(){const e=document.querySelector("#watched");n.includes(O)?e.textContent="remove from watched":e.textContent="add to watched"}(),function(){const e=document.querySelector("#queue");a.includes(O)?e.textContent="remove from queue":e.textContent="add to queue"}(),ratingStars=document.querySelector(".rating"),ratingStars.addEventListener("click",(function(e){const t=e.target.value;if(t&&O){const e=JSON.parse(localStorage.getItem("star"))||[],n=e.findIndex((e=>e.id===O));-1!==n?e[n].star=t:e.push({id:O,star:t}),localStorage.setItem("star",JSON.stringify(e))}}))}(c,l);const u=document.querySelector("#watched"),m=document.querySelector("#queue");function v(){if(n.includes(O))return n.splice(n.indexOf(O),1),o(n),void(u.textContent="add to watched");n.push(O),o(n),u.textContent="remove from watched"}function g(){if(a.includes(O))return a.splice(a.indexOf(O),1),d(a),m.textContent="add to queue",console.log(a),void y(a);a.push(O),d(a),m.textContent="remove from queue"}u.addEventListener("click",v),m.addEventListener("click",g),window.addEventListener("click",(function e(t){t.target.parentNode.classList.contains("rating")||c.contains(t.target)||(document.querySelector("#video").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*"),T.backdropModal.classList.add("is-hidden"),u.removeEventListener("click",v),m.removeEventListener("click",g),window.removeEventListener("click",e))}));const p=document.querySelector("iframe");document.querySelector("#trailer").addEventListener("click",(function(){p.classList.remove("is-hidden")}))}));
//# sourceMappingURL=library.76411f5e.js.map
