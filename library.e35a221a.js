const e="watched",t="queue",n=JSON.parse(localStorage.getItem(e))||[],a=JSON.parse(localStorage.getItem(t))||[];const r="34e68a416eb051ec4adf34df5a0038fd",s="https://api.themoviedb.org/3/",c="https://image.tmdb.org/t/p/original",o=document.querySelector(".library-btn__watched"),i=document.querySelector(".library-btn__queue"),d=document.querySelector(".library-container"),l=document.querySelector(".dot-spinner");async function m(){if(0===n.length)return;l.classList.remove("is-hidden");const e=g(await u(n));l.classList.add("is-hidden"),h(e)}async function u(e){const t=e.map((e=>async function(e){const t=await fetch(`${s}movie/${e}?api_key=${r}&language=en-US`),n=await t.json();return console.log(n),n}(e)));return await Promise.all(t)}function h(e){d.innerHTML="",d.insertAdjacentHTML("beforeend",e)}function g(e){return e.reduce(((e,t)=>e+function(e){return`\n            <li class="movie-card"  ID=${e.id}>\n                <img class="movie-card__image" src="${c}${e.poster_path}" \n                onerror="this.onerror=null;this.src='https://thumbs.dreamstime.com/b/атрибуты-кино-вьюрок-фи-ьма-и-во-а-со-ы-в-бумажном-стаканчике-87336791.jpg'" \n                alt="${e.original_title}" \n                width="300"\n                ID=${e.id}>\n                <h2 class="movie-card__name"   ID=${e.id}>${e.original_title}</h2>\n                <p class="movie-card__text"   ID=${e.id}>${e.genre_ids} | ${e.release_date}</p>\n            </li>\n        `}(t)),"")}o.addEventListener("click",m),i.addEventListener("click",(async function(){if(0===a.length)return;l.classList.remove("is-hidden");const e=g(await u(a));l.classList.add("is-hidden"),h(e)})),window.addEventListener("load",m);const f="light-theme",y="dark-theme",L="grey-background-theme",_=document.querySelector("body"),v=document.querySelector("footer"),S=document.querySelector(".modal"),p=e=>{const t=document.querySelectorAll(".movie-card__name");for(let n=0;n<t.length;n++)t[n].style.color=e},b=e=>{"darkTheme"===e?(_.classList.add(y),v.classList.add(L),S.classList.add(L),p("#ffffff")):(_.classList.add(f),S.classList.add(f),p("#121213f7"))},$=document.querySelector("#switcher");$.addEventListener("change",(()=>{const e=$.checked?"darkTheme":"lightTheme";localStorage.setItem("Theme",e),_.classList.remove(f,y),v.classList.remove(f,L),S.classList.remove(f,L),b(e)}));const q=localStorage.getItem("Theme");null!==q&&($.checked="darkTheme"===q,b(q));
//# sourceMappingURL=library.e35a221a.js.map
