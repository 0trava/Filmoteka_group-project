!function(){const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],o=JSON.parse(localStorage.getItem(t))||[];const c="34e68a416eb051ec4adf34df5a0038fd",a="https://api.themoviedb.org/3/",r="https://image.tmdb.org/t/p/original",s=document.querySelector(".library-btn__watched"),i=document.querySelector(".library-btn__queue"),d=document.querySelector(".library-gallery-wrap"),l=document.querySelector(".dot-spinner");async function m(){if(0===n.length)return;l.classList.remove("is-hidden");const e=g(await u(n));l.classList.add("is-hidden"),h(e)}async function u(e){const t=e.map((e=>async function(e){const t=await fetch(`${a}movie/${e}?api_key=${c}&language=en-US`),n=await t.json();return console.log(n),n}(e)));return await Promise.all(t)}function h(e){d.innerHTML="",d.insertAdjacentHTML("beforeend",e)}function g(e){return e.reduce(((e,t)=>e+function(e){return`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${r}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${e.genre_ids} | ${e.release_date}</p>\n            </li>\n        `}(t)),"")}s.addEventListener("click",m),i.addEventListener("click",(async function(){if(0===o.length)return;l.classList.remove("is-hidden");const e=g(await u(o));l.classList.add("is-hidden"),h(e)})),window.addEventListener("load",m);const f="light-theme",p="dark-theme",y="grey-background-theme",w=document.querySelector("body"),L=document.querySelector("footer"),v=e=>{const t=document.querySelectorAll(".movie-card__name",".modal_all");for(let n=0;n<t.length;n++)t[n].style.color=e},S=e=>{"darkTheme"===e?(w.classList.add(p),L.classList.add(y),v("#ffffff")):(w.classList.add(f),v("#121213f7"))},_=document.querySelector("#switcher");_.addEventListener("change",(()=>{const e=_.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),w.classList.remove(f,p),L.classList.remove(f,y),S(e)}));const q=localStorage.getItem("Theme");null!==q&&(_.checked="darkTheme"===q,S(q)),(()=>{const e={openModalBtn:document.querySelector("[team-modal-open]"),closeModalBtn:document.querySelector("[team-modal-close]"),modal:document.querySelector("[team-modal]")};function t(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.addEventListener("click",t),e.closeModalBtn.addEventListener("click",t),document.querySelector("a").onclick=function(e){e.preventDefault(),window.open(this.href)}})();const b=document.querySelector(".scroll-up-btn");b.addEventListener("click",(function e(){window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(e,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,t=document.documentElement.clientHeight;e>t?b.classList.add("go-up-show"):b.classList.remove("go-up-show")}))}();
//# sourceMappingURL=library.8f4f1a55.js.map
