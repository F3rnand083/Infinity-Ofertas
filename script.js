let produtos=[];
let lang='pt';

function setLang(l){lang=l;render();}

fetch('data/produtos.csv').then(r=>r.text()).then(t=>{
const linhas=t.split('\n').slice(1);
linhas.forEach(l=>{
if(!l)return;
let [nome,preco,desc,img,link]=l.split(',');
produtos.push({nome,preco,desc,img,link,valor:parseFloat(preco.replace('R$','').replace(',','.'))});
});
render();
});

function render(){
let s=document.getElementById('search').value.toLowerCase();
let o=document.getElementById('order').value;
let lista=[...produtos].filter(p=>p.nome.toLowerCase().includes(s));
if(o==='asc')lista.sort((a,b)=>a.valor-b.valor);
if(o==='desc')lista.sort((a,b)=>b.valor-a.valor);
let c=document.getElementById('produtos');
c.innerHTML='';
lista.forEach(p=>{
c.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h3>${p.nome}</h3>
<p>${p.desc}</p>
<strong>${p.preco}</strong>
<a href="${p.link}" target="_blank">${lang==='pt'?'Comprar':'Buy'}</a>
</div>`;
});
}
