const triggers=new WeakMap();function openDialog(d,b){triggers.set(d,b);d.showModal();}document.querySelectorAll('[data-dialog]').forEach(b=>b.addEventListener('click',()=>openDialog(document.getElementById(b.dataset.dialog),b)));document.querySelectorAll('dialog').forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>d.close());d.addEventListener('close',()=>triggers.get(d)?.focus());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}})});document.querySelectorAll('[data-image]').forEach(b=>b.addEventListener('click',()=>{const i=document.getElementById('galleryImage');i.src=b.dataset.image;i.alt=b.querySelector('img').alt;openDialog(document.getElementById('galleryDialog'),b);}));
const navToggle=document.querySelector('.nav-toggle'),siteNav=document.getElementById('site-nav');
function setNav(open){siteNav.classList.toggle('is-open',open);navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Закрыть навигацию':'Открыть навигацию');}
navToggle.addEventListener('click',()=>setNav(navToggle.getAttribute('aria-expanded')!=='true'));
siteNav.addEventListener('click',e=>{if(e.target.closest('a'))setNav(false)});
document.addEventListener('click',e=>{if(!e.target.closest('.top-inner'))setNav(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navToggle.getAttribute('aria-expanded')==='true'){setNav(false);navToggle.focus()}});
window.addEventListener('resize',()=>{if(getComputedStyle(navToggle).display==='none')setNav(false)});
document.querySelectorAll('input[name="coffee-size"]').forEach(input=>input.addEventListener('change',()=>{
  const index=Number(input.value);
  document.querySelectorAll('[data-prices]').forEach(price=>{price.textContent=price.dataset.prices.split(',')[index]+' ₽';});
  const volume=[200,300,400][index];
  const summary=Array.from(document.querySelectorAll('#coffee-prices .menu-line')).map(row=>row.querySelector('h4').textContent+': '+row.querySelector('.item-price').textContent).join('; ');
  document.getElementById('size-status').textContent='Цены за '+volume+' мл. '+summary+'.';
}));
