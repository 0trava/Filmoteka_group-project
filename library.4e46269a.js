const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],o=JSON.parse(localStorage.getItem(t))||[];function c(e){return e.map((({name:e})=>e)).join(", ")}const a="34e68a416eb051ec4adf34df5a0038fd",r="https://api.themoviedb.org/3/",s="https://image.tmdb.org/t/p/original",i=document.querySelector(".library-btn__watched"),l=document.querySelector(".library-btn__queue"),d=document.querySelector(".library-gallery-wrap"),m=document.querySelector(".dot-spinner");async function u(){if(0===n.length)return;m.classList.remove("is-hidden");const e=f(await h(n));m.classList.add("is-hidden"),g(e)}async function h(e){const t=e.map((e=>async function(e){const t=await fetch(`${r}movie/${e}?api_key=${a}&language=en-US`);return await t.json()}(e)));return await Promise.all(t)}function g(e){d.innerHTML="",d.insertAdjacentHTML("beforeend",e)}function f(e){return e.reduce(((e,t)=>e+function(e){console.log(e);let t=c(e.genres);return`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${s}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${t} | ${e.release_date?.substring(0,4)}</p>\n            </li>\n        `}(t)),"")}i.addEventListener("click",u),l.addEventListener("click",(async function(){if(0===o.length)return;m.classList.remove("is-hidden");const e=f(await h(o));m.classList.add("is-hidden"),g(e)})),window.addEventListener("load",u);const p="light-theme",y="dark-theme",w="grey-background-theme",L=document.querySelector("body"),v=document.querySelector("footer"),S=e=>{const t=document.querySelectorAll(".movie-card__name",".modal_all");for(let n=0;n<t.length;n++)t[n].style.color=e},_=e=>{"darkTheme"===e?(L.classList.add(y),v.classList.add(w),S("#ffffff")):(L.classList.add(p),S("#121213f7"))},b=document.querySelector("#switcher");b.addEventListener("change",(()=>{const e=b.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),L.classList.remove(p,y),v.classList.remove(p,w),_(e)}));const q=localStorage.getItem("Theme");null!==q&&(b.checked="darkTheme"===q,_(q)),(()=>{const e={openModalBtn:document.querySelector("[team-modal-open]"),closeModalBtn:document.querySelector("[team-modal-close]"),modal:document.querySelector("[team-modal]")};function t(){e.modal.classList.toggle("is-hidden")}e.openModalBtn.addEventListener("click",t),e.closeModalBtn.addEventListener("click",t),document.querySelector("a").onclick=function(e){e.preventDefault(),window.open(this.href)}})();const k=document.querySelector(".scroll-up-btn");k.addEventListener("click",(function e(){window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(e,0))})),window.addEventListener("scroll",(function(){const e=window.pageYOffset,t=document.documentElement.clientHeight;e>t?k.classList.add("go-up-show"):k.classList.remove("go-up-show")}));
//# sourceMappingURL=library.4e46269a.js.map
