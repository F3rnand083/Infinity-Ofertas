
const GRID = document.getElementById('grid');
const TPL = document.getElementById('tpl-card');
const BUSCA = document.getElementById('busca');
const FILTRO = document.getElementById('filtroCategoria');

async function carregarDados() {
  const res = await fetch('products.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao carregar products.json');
  const data = await res.json();
  return data.produtos || [];
}

function preencherCategorias(produtos) {
  const cats = Array.from(new Set(produtos.map(p => p.categoria).filter(Boolean))).sort();
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c; FILTRO.appendChild(opt);
  });
}

function renderizar(produtos) {
  GRID.innerHTML = '';
  produtos.forEach(p => {
    const node = TPL.content.cloneNode(true);
    const img = node.querySelector('.card-img');
    const title = node.querySelector('.card-title');
    const desc = node.querySelector('.card-desc');
    const buy = node.querySelector('.card-buy');

    img.src = p.imagem_url; img.alt = p.nome;
    title.textContent = p.nome;
    desc.textContent = p.descricao;
    buy.href = p.link_compra; buy.setAttribute('aria-label', `Comprar ${p.nome}`);

    GRID.appendChild(node);
  });
}

function aplicarFiltros(base) {
  const termo = (BUSCA.value || '').toLowerCase();
  const cat = FILTRO.value;
  return base.filter(p => {
    const okCat = !cat || p.categoria === cat;
    const txt = `${p.nome} ${p.descricao} ${p.categoria}`.toLowerCase();
    const okBusca = !termo || txt.includes(termo);
    return okCat && okBusca;
  });
}

(async function init(){
  const produtos = await carregarDados();
  preencherCategorias(produtos);
  renderizar(produtos);
  const atualizar = () => renderizar(aplicarFiltros(produtos));
  BUSCA.addEventListener('input', atualizar);
  FILTRO.addEventListener('change', atualizar);
})();
