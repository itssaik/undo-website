const progress=document.querySelector('.progress');
const reveals=document.querySelectorAll('.reveal');
const hero=document.querySelector('.hero');
const card=document.querySelector('.card-main');
const back=document.querySelector('.card-back');
const heroCopy=document.querySelector('.hero-copy');
const track=document.querySelector('.product-track');
const cinema=document.querySelector('.cinema');
const stage=document.querySelector('.stage-product');

function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function onScroll(){
  const y=window.scrollY, max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(y/max*100)+'%';

  const h=hero.getBoundingClientRect();
  const hp=clamp(-h.top/(h.height-innerHeight),0,1);
  if(card){card.style.transform=`rotate(${4+hp*13}deg) scale(${1+hp*.12}) translateY(${hp*-70}px)`;back.style.transform=`rotate(${11-hp*8}deg) translateY(${30+hp*80}px)`;heroCopy.style.transform=`translateY(${hp*-80}px)`;heroCopy.style.opacity=1-hp*.8}

  const m=document.querySelector('.menu-section').getBoundingClientRect();
  if(track && m.top<innerHeight && m.bottom>0){
    const p=clamp((innerHeight-m.top)/(m.height+innerHeight),0,1);
    track.style.transform=`translateX(${-p*260}px)`;
  }

  const c=cinema.getBoundingClientRect();
  if(c.top<innerHeight && c.bottom>0){
    const p=clamp(-c.top/(c.height-innerHeight),0,1);
    stage.style.transform=`translateY(${(1-p)*90}px) scale(${1.15-p*.15}) rotate(${(1-p)*-5}deg)`;
  }
}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
reveals.forEach(x=>io.observe(x));
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
