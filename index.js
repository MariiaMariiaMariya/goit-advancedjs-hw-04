/* empty css                      */import{a as P,S as R,i as s}from"./assets/vendor-C1DvvBV_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const B="57992697-c89f89a0e9b65e9090b37caa0",$="https://pixabay.com/api/";async function f(o,t){return(await P.get($,{params:{key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".load-more"),M=new R(".gallery a",{captionsData:"alt",captionDelay:250});function y(o){const t=o.map(({webformatURL:l,largeImageURL:i,tags:e,likes:r,views:c,comments:S,downloads:q})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${l}"
              alt="${e}"
              loading="lazy"
            />
          </a>
          <div class="image-info">
            <div class="info-item">
              <strong>Likes</strong>
              <span>${r}</span>
            </div>
            <div class="info-item">
              <strong>Views</strong>
              <span>${c}</span>
            </div>
            <div class="info-item">
              <strong>Comments</strong>
              <span>${S}</span>
            </div>
            <div class="info-item">
              <strong>Downloads</strong>
              <span>${q}</span>
            </div>
          </div>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",t),M.refresh()}function x(){m.innerHTML=""}function v(){p.classList.remove("is-hidden")}function L(){p.classList.add("is-hidden")}function g(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}const O=document.querySelector(".form"),E=document.querySelector(".load-more");let d="",a=1,u=0;const w=15;let n=!1;O.addEventListener("submit",async o=>{if(o.preventDefault(),!n){if(d=o.currentTarget.elements["search-text"].value.trim(),!d){s.warning({message:"Please enter a search query!",position:"topRight"});return}a=1,u=0,x(),b(),v(),n=!0;try{const t=await f(d,a);if(u=t.totalHits,t.hits.length===0){s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(t.hits),a*w<u?g():s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{s.error({message:"Something went wrong. Please try again!",position:"topRight"})}finally{L(),n=!1}}});E.addEventListener("click",async()=>{if(!n){b(),v(),n=!0;try{const o=a+1,t=await f(d,o);if(t.hits.length===0){s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}a=o,y(t.hits);const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"}),a*w<u?g():s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{s.error({message:"Failed to load more images!",position:"topRight"}),g()}finally{L(),n=!1}}});
//# sourceMappingURL=index.js.map
