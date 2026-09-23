const progress=document.querySelector(".scroll-progress");
const hero=document.querySelector(".hero");
const heroLogo=document.querySelector(".hero-logo-wrap");
const heroProduct=document.querySelector(".hero-product");
const heroCopy=document.querySelector(".hero-copy");
const story=document.querySelector(".story-scene");
const storyCard=document.querySelector(".story-card");
const productRail=document.querySelector(".product-rail");
const toggle=document.querySelector(".menu-toggle");
const mobileMenu=document.querySelector(".mobile-menu");

function clamp(v,a=0,b=1){return Math.max(a,Math.min(b,v))}
function update(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(scrollY/max*100)+"%";

  const h=hero.getBoundingClientRect();
  const hp=clamp(-h.top/(h.height-innerHeight));
  heroLogo.style.transform=`scale(${1-hp*.48}) translateY(${hp*-70}px)`;
  heroLogo.style.opacity=1-hp*.72;
  heroCopy.style.transform=`translateY(${hp*-65}px)`;
  heroProduct.style.transform=`rotate(${7+hp*14}deg) translateY(${hp*-95}px) scale(${1+hp*.1})`;

  const s=story.getBoundingClientRect();
  const sp=clamp(-s.top/(s.height-innerHeight));
  storyCard.style.transform=`translateY(${(1-sp)*100}px) rotate(${(1-sp)*-5}deg) scale(${1.08-sp*.08})`;

  if(innerWidth>800){
    const m=document.querySelector(".menu").getBoundingClientRect();
    const mp=clamp((innerHeight-m.top)/(m.height+innerHeight));
    productRail.style.transform=`translateX(${-mp*360}px)`;
  }
}
window.addEventListener("scroll",update,{passive:true});
window.addEventListener("resize",update);
update();

const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));

toggle.addEventListener("click",()=>mobileMenu.classList.toggle("open"));
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("open")));

let startX=0, startScroll=0;
productRail.addEventListener("pointerdown",e=>{
  if(innerWidth<=800)return;
  startX=e.clientX; startScroll=productRail.scrollLeft; productRail.setPointerCapture(e.pointerId);
});
productRail.addEventListener("pointermove",e=>{
  if(innerWidth<=800 || !startX)return;
  productRail.scrollLeft=startScroll-(e.clientX-startX);
});
productRail.addEventListener("pointerup",()=>startX=0);
