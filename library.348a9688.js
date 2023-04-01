!function(){const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],o=JSON.parse(localStorage.getItem(t))||[];function a(t){localStorage.setItem(e,JSON.stringify(t))}function i(e){return e.map((({name:e})=>e)).join(", ")}const c="34e68a416eb051ec4adf34df5a0038fd",d="https://api.themoviedb.org/3/",l="https://image.tmdb.org/t/p/original",s=document.querySelector(".library-btn__watched"),r=document.querySelector(".library-btn__queue"),u=document.querySelector(".library-gallery-wrap"),m=document.querySelector(".dot-spinner");async function _(){if(0===n.length)return;m.classList.remove("is-hidden");const e=v(await f(n));m.classList.add("is-hidden"),h(e)}async function f(e){const t=e.map((e=>async function(e){const t=await fetch(`${d}movie/${e}?api_key=${c}&language=en-US`);return await t.json()}(e)));return await Promise.all(t)}function h(e){u.innerHTML="",u.insertAdjacentHTML("beforeend",e)}function v(e){return e.reduce(((e,t)=>e+function(e){let t=i(e.genres);return`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${l}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${t} | ${e.release_date?.substring(0,4)}</p>\n            </li>\n        `}(t)),"")}s.addEventListener("click",_),r.addEventListener("click",(async function(){if(0===o.length)return;m.classList.remove("is-hidden");const e=v(await f(o));m.classList.add("is-hidden"),h(e)})),window.addEventListener("load",_);const g="light-theme",y="dark-theme",p="grey-background-theme",w=document.querySelector("body"),b=document.querySelector("footer"),L=document.querySelector("#modal"),S=(document.querySelector("#pagination"),e=>{const t=document.querySelectorAll(".movie-card__name");for(let n=0;n<t.length;n++)t[n].style.color=e}),q=e=>{"darkTheme"===e?(w.classList.add(y),b.classList.add(p),L.classList.add(p),S("#ffffff")):(w.classList.add(g),L.classList.add(g),S("#121213f7"))},k=document.querySelector("#switcher");k.addEventListener("change",(()=>{const e=k.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),w.classList.remove(g,y),b.classList.remove(g,p),L.classList.remove(g,p),q(e)}));const $=localStorage.getItem("Theme");null!==$&&(k.checked="darkTheme"===$,q($)),(()=>{const e={openModalBtn:document.querySelector("[team-modal-open]"),closeModalBtn:document.querySelector("[team-modal-close]"),modal:document.querySelector("[team-modal]")};function t(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.addEventListener("click",t),e.closeModalBtn.addEventListener("click",t),document.querySelector("a").onclick=function(e){e.preventDefault(),window.open(this.href)}})();const E=document.querySelector(".scroll-up-btn");E.addEventListener("click",(function e(){window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(e,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,t=document.documentElement.clientHeight;e>t?E.classList.add("go-up-show"):E.classList.remove("go-up-show")}));const x=document.querySelector(".backdrop"),T="34e68a416eb051ec4adf34df5a0038fd",I="https://api.themoviedb.org/3/",M={gallerySelector:document.querySelector(".library-gallery-wrap"),closeButton:document.querySelector(".modal__button-close")};window.addEventListener("keydown",(function(e){"Escape"===e.code&&x.classList.add("is-hidden")})),M.closeButton.addEventListener("click",(function(){x.classList.add("is-hidden")})),M.gallerySelector.addEventListener("click",(async function(e){if(e.preventDefault(),"DIV"===e.target.nodeName)return;x.classList.remove("is-hidden");const i=e.target.id,c=await async function(e){const t=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${T}&language=en-US`);return await t.json()}(i);const d=await async function(e){const t=await fetch(`${I}movie/${e}/videos?api_key=${T}&language=en-US`),n=await t.json();if(console.log(n),n.results.length>0)return n.results[0].key}(i);console.log(d);const l=document.querySelector(".modul-card-to-add");s=l,s.innerHTML=`\n    <div class="modal__poster-thumb">\n          <img class="modal__poster" src="https://image.tmdb.org/t/p/original${c.poster_path}" alt="${c.original_title} poster">\n        </div>\n   \n        <div class="modal__info-thumb">\n            <h2 class="modal__title">${c.original_title}</h2>\n        <table class="modal__info">\n            <tr class="modal__info-entry">\n            <td class="modal__info-key">Vote / Votes</td>\n            <td><span class="modal__info-value-vote modal__info-value-vote--accent">${c.vote_average}</span> / <span class="modal__info-value-vote">${c.vote_count}</span></td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Popularity</td>\n                <td class="modal__info-value">${c.popularity}</td>\n            </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Original Title</td>\n                <td class="modal__info-value modal__info-value-title">${c.original_title}</td>\n        </tr>\n            <tr class="modal__info-entry">\n                <td class="modal__info-key">Genre</td>\n                <td class="modal__info-value">${c.genres.id}</td>\n            </tr>\n        </table>\n\n        <h3 class="modal__about">About</h3>\n        <p class="modal__about-text">${c.overview}</p>\n            <div class="modal__button-container">\n                <button id="watched" type="button" class="modal__button modal__button-watched">add to watched</button>\n                <button id="queue" type="button" class="modal__button modal__button-queue">add to queue</button>\n            </div>\n\n            <div class="modal__button-trailer-wrap">\n                <button id="trailer" type="button" class="modal__button modal__button-trailer">Trailer</button>\n\n                <iframe class="modal__iframe is-hidden" width="1237" height="696" src="https://www.youtube.com/embed/${d}" title="Mia and me - Mia and me Day 2014" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n            </div>\n        </div>\n    </div>\n  `,function(){const e=document.querySelector("#watched");n.includes(i)?e.textContent="remove from watched":e.textContent="add to queue"}(),function(){const e=document.querySelector("#queue");o.includes(i)?e.textContent="remove from queue":e.textContent="add to queue"}();var s;const r=document.querySelector("#watched"),u=document.querySelector("#queue");function m(){if(n.includes(i))return n.splice(n.indexOf(i),1),a(n),void(r.textContent="add to watched");n.push(i),a(n),r.textContent="remove from watched"}function _(){if(o.includes(i))return o.splice(o.indexOf(i),1),a(o),void(u.textContent="add to queue");var e;o.push(i),e=o,localStorage.setItem(t,JSON.stringify(e)),u.textContent="remove from queue"}r.addEventListener("click",m),u.addEventListener("click",_),window.addEventListener("click",(function e(t){l.contains(event.target)||(x.classList.add("is-hidden"),r.removeEventListener("click",m),u.removeEventListener("click",_),window.removeEventListener("click",e))}));const f=document.querySelector("iframe"),h=document.querySelector("#trailer");console.log(h),h.addEventListener("click",(function(){f.classList.remove("is-hidden"),console.log("кнопка работает")}))}));document.querySelector(".modal")}();
//# sourceMappingURL=library.348a9688.js.map
