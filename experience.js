/* Brüva interactive experience — progressive enhancement, no third-party libraries */
(()=>{"use strict";
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const stage=$("#eco-stage"), demo=$("#producto");
if(stage){
  const names={marketing:"marketing",crm:"crm",ia:"ia",reports:"reportes"};
  $$(".eco-node").forEach(el=>{
    const label=el.querySelector(".eco-node-text b")?.textContent||"Abrir pilar";
    el.setAttribute("role","button");el.setAttribute("tabindex","0");el.setAttribute("aria-label","Explorar "+label+" en la demostración");
    const action=()=>{
      const name=names[el.dataset.pillar];if(!name)return;
      const tab=$('.demo-tabs [data-tab="'+name+'"]');if(tab)tab.click();
      if(demo)demo.scrollIntoView({behavior:reduce?"instant":"smooth",block:"start"});
    };
    el.addEventListener("click",action);
    el.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();action()}});
    el.addEventListener("focus",()=>{stage.classList.add("has-focus");el.classList.add("is-active");$('.eco-line[data-edge="'+el.dataset.pillar+'"]')?.classList.add("is-highlight")});
    el.addEventListener("blur",()=>{stage.classList.remove("has-focus");el.classList.remove("is-active");$('.eco-line[data-edge="'+el.dataset.pillar+'"]')?.classList.remove("is-highlight")});
  });
}
const cards=$$(".story-card");
const rails=$$(".story-rail span");
if(cards.length&&"IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
    if(visible.length){let current=visible[0].target.dataset.story;cards.forEach(el=>el.classList.toggle("is-current",el.dataset.story===current));rails.forEach(el=>el.classList.toggle("active",el.dataset.story===current))}
  },{rootMargin:"-20% 0px -30% 0px",threshold:[0,.1,.25,.5,.75]});
  cards.forEach(c=>observer.observe(c));
}
if(reduce)return;
if(window.matchMedia("(pointer:fine)").matches){
  const halo=document.createElement("div");halo.className="cursor-halo";halo.setAttribute("aria-hidden","true");document.body.appendChild(halo);
  let px=0,py=0,queued=false;
  window.addEventListener("pointermove",e=>{px=e.clientX;py=e.clientY;document.body.classList.add("is-pointer");if(queued)return;queued=true;requestAnimationFrame(()=>{halo.style.left=px+"px";halo.style.top=py+"px";queued=false})},{passive:true});
  const shell=$(".hero .shell");
  if(shell){
    shell.addEventListener("pointermove",e=>{const r=shell.getBoundingClientRect();const dx=(e.clientX-r.left)/r.width-.5;const dy=(e.clientY-r.top)/r.height-.5;shell.style.translate=(dx*12).toFixed(1)+"px "+(dy*10).toFixed(1)+"px"});
    shell.addEventListener("pointerleave",()=>{shell.style.translate="0px 0px"});
  }
}
if("IntersectionObserver" in window){
  $$(".story-card").forEach(el=>{el.style.opacity="1"});
  const artObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-current");artObserver.unobserve(e.target)}}),{rootMargin:"0px 0px -12% 0px"});
  cards.forEach(el=>artObserver.observe(el));
}
})();