const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],a=JSON.parse(localStorage.getItem(t))||[];function o(t){localStorage.setItem(e,JSON.stringify(t))}function s(e){localStorage.setItem(t,JSON.stringify(e))}function d(e){if(e)return e.map((({name:e})=>e)).join(", ")}function i(e,t,n){let a="";for(let o=5;o>=1;o-=1){let s="";o===e&&(s="checked"),a+=` <input type="radio" id="star${o}-${t}-${n}" name="rate-${t}-${n}" value="${o}" ${s}>\n                  <label for="star${o}-${t}-${n}" title="text"></label>`}return a}const r="34e68a416eb051ec4adf34df5a0038fd",c="https://api.themoviedb.org/3/",l="https://image.tmdb.org/t/p/original";let u=1;const m=document.querySelector(".library-btn__watched"),v=document.querySelector(".library-btn__queue"),g=(document.querySelector(".library-gallery-wrap"),document.querySelector(".library-bg-image")),p=document.querySelector(".library-gallery-box"),y=document.querySelector(".dot-spinner");async function f(){if(u=1,0===n.length)return g.classList.remove("is-hidden"),void(p.innerHTML="");y.classList.remove("is-hidden"),y.classList.add("is-hidden"),_(n)}async function h(e){const t=e.map((e=>async function(e){const t=await fetch(`${c}movie/${e}?api_key=${r}&language=en-US`);return await t.json()}(e)));return await Promise.all(t)}async function _(e){const t=await h(e);if(0===t.length)return g.classList.remove("is-hidden"),void(p.innerHTML='<div class="library-bg-image is-hidden">\n            <h2 class="library-text">Sorry, but your list is empty ...</h2>\n            <img\n              src="./images/Library/movie.png"\n              alt="cinema"\n              class="js-library-bg-image visually-hidden"\n              width="600"\n            />\n            </div>');const n=function(e){return e.reduce(((e,t)=>e+function(e){let t=d(e.genres);const n=function(e){const t=JSON.parse(localStorage.getItem("star"))||[],n=t.findIndex((t=>parseInt(t.id)===parseInt(e)));return-1!==n?parseInt(t[n].star):0}(e.id),a=i(n,e.id,"list");return`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${l}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <div class="library-stars">\n                <div class="rating">\n                ${a}\n                </div>\n                </div>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${t} | ${e.release_date?.substring(0,4)}\n                <span class="movie-card__box">\n                <span class="movie-card__average">${e.vote_average.toFixed([1])}</span>\n                </span>\n                </p>\n            </li>`}(t)),"")}(t);g.classList.add("is-hidden"),p.innerHTML="",p.insertAdjacentHTML("beforeend",n)}m.addEventListener("click",f),v.addEventListener("click",(async function(){if(u=2,0===a.length)return g.classList.remove("is-hidden"),void(p.innerHTML=" ");y.classList.remove("is-hidden"),y.classList.add("is-hidden"),_(a)})),window.addEventListener("load",f),m.classList.add("active"),m.addEventListener("click",(()=>{m.classList.add("active"),v.classList.remove("active")})),v.addEventListener("click",(()=>{v.classList.add("active"),m.classList.remove("active")})),window.addEventListener("load",(()=>{m&&(m.checked=!0,m.parentNode.classList.add("checked"))}));const b="light-theme",L="dark-theme",w="grey-background-theme",S=document.querySelector("body"),k=document.querySelector("footer"),q=document.querySelector("#modal"),$=e=>{const t=document.querySelectorAll(".movie-card__name");document.querySelector(".tui-page-btn");for(let n=0;n<t.length;n++)t[n].style.color=e},E=e=>{"darkTheme"===e?(S.classList.add(L),k.classList.add(w),q.classList.add(w),$("#ffffff")):(S.classList.add(b),q.classList.add(b),$("#121213f7"))},x=document.querySelector("#switcher");x.addEventListener("change",(()=>{const e=x.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),S.classList.remove(b,L),k.classList.remove(b,w),q.classList.remove(b,w),E(e)}));const I=localStorage.getItem("Theme");null!==I&&(x.checked="darkTheme"===I,E(I)),S.classList.add("animated"),(()=>{const e={openModalBtn:document.querySelector("[team-modal-open]"),closeModalBtn:document.querySelector("[team-modal-close]"),modal:document.querySelector("[team-modal]")};function t(){e.modal.classList.toggle("is-hidden"),document.body.classList.toggle("stop-scrolling")}window.addEventListener("click",(function(t){t.target===e.modal&&(e.modal.classList.add("is-hidden"),document.body.classList.toggle("stop-scrolling"))})),window.addEventListener("keydown",(function(t){"Escape"===t.code&&(e.modal.classList.add("is-hidden"),document.body.classList.toggle("stop-scrolling"))})),e.openModalBtn.addEventListener("click",t),e.closeModalBtn.addEventListener("click",t)})();const M=document.querySelector(".scroll-up-btn");M.addEventListener("click",(function e(){window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(e,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,t=document.documentElement.clientHeight;e>t?M.classList.add("go-up-show"):M.classList.remove("go-up-show")}));const T=document.querySelector(".backdrop"),B="34e68a416eb051ec4adf34df5a0038fd",O="https://api.themoviedb.org/3/",C={backdropModal:document.querySelector(".backdrop"),gallerySelector:document.querySelector(".library-gallery-wrap"),closeButton:document.querySelector(".modal__button-close"),darkerBackdrop:document.querySelector(".darker"),modal:document.querySelector(".modal")};let N=0;function j(e){e.target!==T&&"Escape"!==e.code||(T.classList.add("is-hidden"),document.body.style.overflow="",C.darkerBackdrop.classList.add("is-hidden")),C.backdropModal.classList.add("is-hidden"),document.body.style.overflow="",C.darkerBackdrop.classList.add("is-hidden")}window.addEventListener("keydown",(function(e){"Escape"===e.code&&(j(e),document.body.style.overflow="",C.darkerBackdrop.classList.add("is-hidden"))})),window.addEventListener("click",(function(e){e.target===C.backdropModal&&(j(e),document.body.style.overflow="",C.darkerBackdrop.classList.add("is-hidden"))})),C.closeButton.addEventListener("click",j),C.gallerySelector.addEventListener("click",(async function(e){e.preventDefault(),document.body.style.overflow="hidden";const t=document.querySelector(".darker");if("UL"===e.target.nodeName)return;C.backdropModal.classList.remove("is-hidden"),e.target.parentNode.classList.contains("rating")||(N=e.target.id);const r=await async function(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${B}&language=en-US`);return await t.json()}(N);let c=d(r.genres);const l=await async function(e){const t=await fetch(`${O}movie/${e}/videos?api_key=${B}&language=en-US`),n=await t.json();if(n.results.length>0)return n.results[0].key}(N);const m=document.querySelector(".modul-card-to-add"),v=function(e){const t=JSON.parse(localStorage.getItem("star"))||[],n=t.findIndex((t=>t.id===e));return-1!==n?parseInt(t[n].star):0}(N);!function(e,t){const o=i(t,N,"modal");e.innerHTML=`\n    <div class="modal__poster-thumb">\n      <img class="modal__poster" src="https://image.tmdb.org/t/p/original${r.poster_path}" alt="${r.original_title} poster">\n    </div>\n   \n\n        <div class="modal__info-thumb">\n            <h2 class="modal__title">${r.original_title}</h2>\n            <div class="modal-library_my-rating">\n            <p class="modal-library__info-key">My rating</p>\n            <div id="stars" class="rating">\n           ${o}\n           </div>\n           </div>\n        <table class="modal__info">\n            <tr class="modal__info-entry">\n            <td class="modal__info-key">Vote / Votes</td>\n            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${r.vote_average.toFixed([1])}</span> / \n            <span class="modal__info-value-vote">${r.vote_count}</span></td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Popularity</td>\n                <td class="modal__info-value">${r.popularity.toFixed([1])}</td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Original Title</td>\n                <td class="modal__info-value modal__info-value-title">${r.original_title}</td>\n          </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Genre</td>\n                <td class="modal__info-value">${c}</td>\n            </tr>\n        </table>\n\n        <h3 class="modal__about">About</h3>\n        <p class="modal__about-text">${r.overview}</p>\n            <div class="modal__button-container">\n                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>\n                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>\n            </div>\n\n            <div class="modal__button-trailer-wrap">\n            <button id="trailer" type="button" class="modal__button modal__button-trailer"><span class="svg_span"\n            ><svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 72 72" style="vertical-align: bottom;"><path d="M61.115,18.856C63.666,21.503,64,25.709,64,36s-0.334,14.497-2.885,17.144C58.563,55.791,55.906,56,36,56  s-22.563-0.209-25.115-2.856C8.334,50.497,8,46.291,8,36s0.334-14.497,2.885-17.144S16.094,16,36,16S58.563,16.209,61.115,18.856z M31.464,44.476l13.603-8.044l-13.603-7.918V44.476z"/></svg></span>\n       Trailer</button>\n\n\n                <iframe id="video" class="modal__iframe is-hidden" width="100%" height="100%" src="https://www.youtube.com/embed/${l}?enablejsapi=1" \n                title="Mia and me - Mia and me Day 2014" frameborder="0" \n                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" \n                allowfullscreen></iframe>\n                </div>\n        </div>\n    </div>\n  `,function(){const e=document.querySelector("#watched");n.includes(N)?e.textContent="remove from watched":e.textContent="add to watched"}(),function(){const e=document.querySelector("#queue");a.includes(N)?e.textContent="remove from queue":e.textContent="add to queue"}(),ratingStars=document.querySelector("#stars"),ratingStars.addEventListener("click",(function(e){const t=e.target.value;if(t&&N){const e=JSON.parse(localStorage.getItem("star"))||[],o=e.findIndex((e=>e.id===N));-1!==o?e[o].star=t:e.push({id:N,star:t}),localStorage.setItem("star",JSON.stringify(e)),1===u&&_(n),2===u&&_(a)}}))}(m,v);const g=document.querySelector("#watched"),p=document.querySelector("#queue");function y(){if(n.includes(N))return n.splice(n.indexOf(N),1),o(n),g.textContent="add to watched",void(1===u&&_(n));n.push(N),o(n),g.textContent="remove from watched",1===u&&_(n)}function f(){if(a.includes(N))return a.splice(a.indexOf(N),1),s(a),p.textContent="add to queue",void(2===u&&_(a));a.push(N),s(a),p.textContent="remove from queue",2===u&&_(a)}g.addEventListener("click",y),p.addEventListener("click",f);const h=document.querySelector("iframe");document.querySelector("#trailer").addEventListener("click",(function(){h.classList.remove("is-hidden"),t.classList.remove("is-hidden"),g.removeEventListener("click",y),p.removeEventListener("click",f)})),t.addEventListener("click",(function(e){e.target!==h&&(m.contains(e.target)||(document.querySelector("#video").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*"),t.classList.add("is-hidden"),h.classList.add("is-hidden"),g.addEventListener("click",y),p.addEventListener("click",f)))}))}));
//# sourceMappingURL=library.1d5e53f8.js.map
