const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');
const close=()=>{nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')};
toggle?.addEventListener('click',()=>{let open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
const toast=document.querySelector('.toast');let timer;
document.querySelectorAll('[data-copy-email]').forEach(button=>button.addEventListener('click',async()=>{
 const value='sh.mastalipour@gmail.com';let ok=false;
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);ok=true}else{let t=document.createElement('textarea');t.value=value;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}}catch(e){}
 if(ok){toast.textContent=button.dataset.copied;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2700)}else{window.location.href='mailto:'+value}
}));
