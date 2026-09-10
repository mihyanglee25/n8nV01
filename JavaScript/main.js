
const menuBtn=document.querySelector('.menu-btn');const sidebar=document.querySelector('.sidebar');if(menuBtn)menuBtn.addEventListener('click',()=>sidebar.classList.toggle('open'));
const search=document.querySelector('.search');if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('[data-search]').forEach(el=>{el.classList.toggle('hidden',q&&!el.dataset.search.toLowerCase().includes(q));});});}
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{if(window.innerWidth<920)sidebar.classList.remove('open')}));
