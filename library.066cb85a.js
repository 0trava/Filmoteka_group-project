const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],o=JSON.parse(localStorage.getItem(t))||[];function a(t){localStorage.setItem(e,JSON.stringify(t))}function i(e){localStorage.setItem(t,JSON.stringify(e))}function c(e){return e.map((({name:e})=>e)).join(", ")}const d="34e68a416eb051ec4adf34df5a0038fd",s="https://api.themoviedb.org/3/",l="https://image.tmdb.org/t/p/original",r=document.querySelector(".library-btn__watched"),u=document.querySelector(".library-btn__queue"),m=(document.querySelector(".library-gallery-wrap"),document.querySelector(".library-bg-image")),f=document.querySelector(".library-gallery-box"),_=document.querySelector(".dot-spinner");async function g(){if(0===n.length)return console.log("start"),m.classList.remove("is-hidden"),void(f.innerHTML="../images/Library/movie.png");_.classList.remove("is-hidden"),_.classList.add("is-hidden"),h(n)}async function v(e){const t=e.map((e=>async function(e){const t=await fetch(`${s}movie/${e}?api_key=${d}&language=en-US`);return await t.json()}(e)));return await Promise.all(t)}async function h(e){const t=function(e){return e.reduce(((e,t)=>e+function(e){let t=c(e.genres);return`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${l}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${t} | ${e.release_date?.substring(0,4)}</p>\n            </li>\n        `}(t)),"")}(await v(e));m.classList.add("is-hidden"),f.innerHTML="",f.insertAdjacentHTML("beforeend",t)}r.addEventListener("click",g),u.addEventListener("click",(async function(){if(0===o.length)return console.log("start"),m.classList.remove("is-hidden"),void(f.innerHTML="../images/Library/movie.png");_.classList.remove("is-hidden"),_.classList.add("is-hidden"),h(o)})),window.addEventListener("load",g);const y="light-theme",p="dark-theme",b="grey-background-theme",w=document.querySelector("body"),L=document.querySelector("footer"),S=document.querySelector("#modal"),q=e=>{const t=document.querySelectorAll(".movie-card__name");document.querySelector(".tui-page-btn");for(let n=0;n<t.length;n++)t[n].style.color=e},k=e=>{"darkTheme"===e?(w.classList.add(p),L.classList.add(b),S.classList.add(b),q("#ffffff")):(w.classList.add(y),S.classList.add(y),q("#121213f7"))},$=document.querySelector("#switcher");$.addEventListener("change",(()=>{const e=$.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),w.classList.remove(y,p),L.classList.remove(y,b),S.classList.remove(y,b),k(e)}));const E=localStorage.getItem("Theme");null!==E&&($.checked="darkTheme"===E,k(E)),(()=>{const e={openModalBtn:document.querySelector("[team-modal-open]"),closeModalBtn:document.querySelector("[team-modal-close]"),modal:document.querySelector("[team-modal]")};function t(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.addEventListener("click",t),e.closeModalBtn.addEventListener("click",t),document.querySelector("a").onclick=function(e){e.preventDefault(),window.open(this.href)}})();const x=document.querySelector(".scroll-up-btn");x.addEventListener("click",(function e(){window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(e,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,t=document.documentElement.clientHeight;e>t?x.classList.add("go-up-show"):x.classList.remove("go-up-show")}));const T=document.querySelector(".backdrop"),M="34e68a416eb051ec4adf34df5a0038fd",I="https://api.themoviedb.org/3/",O={gallerySelector:document.querySelector(".library-gallery-wrap"),closeButton:document.querySelector(".modal__button-close")};window.addEventListener("keydown",(function(e){"Escape"===e.code&&T.classList.add("is-hidden")})),O.closeButton.addEventListener("click",(function(){T.classList.add("is-hidden")})),O.gallerySelector.addEventListener("click",(async function(e){if(e.preventDefault(),console.log(e.target.nodeName),"UL"===e.target.nodeName)return;T.classList.remove("is-hidden");const t=e.target.id,d=await async function(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${M}&language=en-US`);return await t.json()}(t);let s=c(d.genres);const l=await async function(e){const t=await fetch(`${I}movie/${e}/videos?api_key=${M}&language=en-US`),n=await t.json();if(console.log(n),n.results.length>0)return n.results[0].key}(t);console.log(l);const r=document.querySelector(".modul-card-to-add");u=r,u.innerHTML=`\n    <div class="modal__poster-thumb">\n          <img class="modal__poster" src="https://image.tmdb.org/t/p/original${d.poster_path}" alt="${d.original_title} poster">\n        </div>\n   \n        <div class="modal__info-thumb">\n            <h2 class="modal__title">${d.original_title}</h2>\n        <table class="modal__info">\n            <tr class="modal__info-entry">\n            <td class="modal__info-key">Vote / Votes</td>\n            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${d.vote_average}</span> / <span class="modal__info-value-vote">${d.vote_count}</span></td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Popularity</td>\n                <td class="modal__info-value">${d.popularity.toFixed([1])}</td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Original Title</td>\n                <td class="modal__info-value modal__info-value-title">${d.original_title}</td>\n        </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Genre</td>\n                <td class="modal__info-value">${s}</td>\n            </tr>\n        </table>\n\n        <h3 class="modal__about">About</h3>\n        <p class="modal__about-text">${d.overview}</p>\n            <div class="modal__button-container">\n                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>\n                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>\n            </div>\n\n            <div class="modal__button-trailer-wrap">\n                <button id="trailer" type="button" class="modal__button modal__button-trailer">Trailer</button>\n\n                <iframe class="modal__iframe is-hidden" width="1237" height="696" src="https://www.youtube.com/embed/${l}" title="Mia and me - Mia and me Day 2014" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n            </div>\n        </div>\n    </div>\n  `,function(){const e=document.querySelector("#watched");n.includes(t)?e.textContent="remove from watched":e.textContent="add to watched"}(),function(){const e=document.querySelector("#queue");o.includes(t)?e.textContent="remove from queue":e.textContent="add to queue"}();var u;const m=document.querySelector("#watched"),f=document.querySelector("#queue");function _(){if(n.includes(t))return n.splice(n.indexOf(t),1),a(n),m.textContent="add to watched",void h(n);n.push(t),a(n),m.textContent="remove from watched"}function g(){if(o.includes(t))return o.splice(o.indexOf(t),1),i(o),f.textContent="add to queue",void h(o);o.push(t),i(o),f.textContent="remove from queue"}m.addEventListener("click",_),f.addEventListener("click",g),window.addEventListener("click",(function e(t){r.contains(event.target)||(console.log("Трейлер на паузі"),document.querySelector("#video").contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*"),T.classList.add("is-hidden"),m.removeEventListener("click",_),f.removeEventListener("click",g),window.removeEventListener("click",e))}));const v=document.querySelector("iframe"),y=document.querySelector("#trailer");console.log(y),y.addEventListener("click",(function(){v.classList.remove("is-hidden"),console.log("кнопка работает")}))}));document.querySelector(".modal");
//# sourceMappingURL=library.066cb85a.js.map
