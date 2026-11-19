const DEFAULT_DATA = {
  companies: [
    {id:"emssanar",name:"Emssanar",initials:"EM",description:"Herramientas y procesos de Emssanar",categories:["Radicación","Cuentas por Cobrar","Recobros","RIPS / MIPRES"]},
    {id:"sos",name:"SOS",initials:"SOS",description:"Herramientas y procesos de SOS",categories:["General"]},
    {id:"comfenalco",name:"Comfenalco",initials:"CF",description:"Herramientas y procesos de Comfenalco",categories:["General"]},
    {id:"cruz-verde",name:"Cruz Verde",initials:"CV",description:"Herramientas y procesos de Cruz Verde",categories:["General"]}
  ],
  tools: []
};
let data;
try { data = JSON.parse(localStorage.getItem("medmax-data")) || structuredClone(DEFAULT_DATA); }
catch { data = JSON.parse(JSON.stringify(DEFAULT_DATA)); }
let currentPage="home", currentCompany=null, currentCategory="Todas", searchTerm="";
const content=document.getElementById("content");
const companyNav=document.getElementById("company-nav");
const breadcrumb=document.getElementById("breadcrumb");
function save(){localStorage.setItem("medmax-data",JSON.stringify(data));}
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400);}
function company(id){return data.companies.find(c=>c.id===id);}
function renderNav(){
  companyNav.innerHTML=data.companies.map(c=>`<button class="nav-item ${currentPage==="company"&&currentCompany===c.id?"active":""}" data-company="${esc(c.id)}"><span>›</span>${esc(c.name)}</button>`).join("");
  document.querySelectorAll("[data-company]").forEach(b=>b.onclick=()=>{currentCompany=b.dataset.company;currentPage="company";currentCategory="Todas";render();document.getElementById("sidebar").classList.remove("open");});
}
function go(page){currentPage=page;render();document.getElementById("sidebar").classList.remove("open");}
function render(){
  renderNav();
  document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===currentPage));
  const c=company(currentCompany);
  breadcrumb.textContent=currentPage==="company"?(c?.name||"Herramientas"):({home:"Inicio",tools:"Herramientas",admin:"Administración"}[currentPage]||"Inicio");
  if(currentPage==="home") home();
  else if(currentPage==="tools") toolsPage();
  else if(currentPage==="company") companyPage();
  else if(currentPage==="admin") adminPage();
}
function home(){
  content.innerHTML=`<div class="hero"><div class="eyebrow">PLATAFORMA DE GESTIÓN Y HERRAMIENTAS</div><h1>Bienvenido a Medmax Technologies Col</h1><p>Tu espacio centralizado para organizar, consultar y ejecutar las herramientas de trabajo. Selecciona una empresa para comenzar.</p><div class="hero-actions"><button class="btn btn-primary" onclick="go('tools')">Explorar herramientas</button><button class="btn btn-ghost" onclick="go('admin')">Administrar portal</button></div></div>
  <div class="section-heading"><div><h2>Áreas de trabajo</h2><p>Selecciona una sección para consultar sus herramientas.</p></div></div>
  <div class="company-grid">${data.companies.map(c=>`<button class="company-card" onclick="openCompany('${esc(c.id)}')"><div class="company-icon">${esc(c.initials)}</div><h3>${esc(c.name)}</h3><p>${esc(c.description)}</p></button>`).join("")}</div>
  <div class="stats"><div class="stat-card"><strong>${data.companies.length}</strong><span>Empresas / secciones</span></div><div class="stat-card"><strong>${data.tools.length}</strong><span>Herramientas registradas</span></div><div class="stat-card"><strong>V1.0</strong><span>Versión inicial</span></div></div>`;
}
function openCompany(id){currentCompany=id;currentPage="company";currentCategory="Todas";render();}
function toolsPage(){
  const all=data.tools.filter(t=>(!searchTerm||`${t.name} ${t.description} ${t.category} ${company(t.companyId)?.name||""}`.toLowerCase().includes(searchTerm.toLowerCase())));
  content.innerHTML=`<div class="eyebrow">CENTRO DE APLICACIONES</div><h1 class="subhead">Herramientas</h1><p class="muted">Busca las herramientas registradas en todas las empresas.</p><div class="toolbar"><input class="search" id="global-search" placeholder="Buscar por nombre, empresa o categoría..." value="${esc(searchTerm)}"><button class="btn btn-primary" onclick="go('admin')">+ Agregar herramienta</button></div>${toolCards(all)}`;
  document.getElementById("global-search").addEventListener("input",e=>{searchTerm=e.target.value;toolsPage();const el=document.getElementById("global-search");el.focus();el.setSelectionRange(el.value.length,el.value.length);});
}
function companyPage(){
  const c=company(currentCompany);if(!c){go("home");return;}
  const cats=["Todas",...new Set(c.categories||[])];
  const list=data.tools.filter(t=>t.companyId===c.id&& (currentCategory==="Todas"||t.category===currentCategory));
  content.innerHTML=`<div class="eyebrow">EMPRESA / SECCIÓN</div><h1 class="subhead">${esc(c.name)}</h1><p class="muted">${esc(c.description)}</p><div class="toolbar"><input class="search" id="company-search" placeholder="Buscar en ${esc(c.name)}..." value="${esc(searchTerm)}"><button class="btn btn-primary" onclick="go('admin')">+ Agregar herramienta</button></div><div class="tool-layout"><aside class="panel"><h3>SECCIONES</h3>${cats.map(cat=>`<button class="filter-btn ${currentCategory===cat?"active":""}" data-cat="${esc(cat)}">${esc(cat)}</button>`).join("")}</aside><div>${toolCards(list)}</div></div>`;
  document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{currentCategory=b.dataset.cat;companyPage();});
  document.getElementById("company-search").addEventListener("input",e=>{searchTerm=e.target.value;const filtered=list.filter(t=>`${t.name} ${t.description}`.toLowerCase().includes(searchTerm.toLowerCase()));document.querySelector(".tool-layout > div").innerHTML=toolCards(filtered);});
}
function toolCards(list){
  if(!list.length)return `<div class="empty">Todavía no hay herramientas en esta sección.<br><br>Utiliza <b>Administración</b> para agregar la primera.</div>`;
  return `<div class="tool-grid">${list.map(t=>`<article class="tool-card"><div class="tool-symbol">▣</div><div><h3>${esc(t.name)}</h3><p>${esc(t.description||"Sin descripción")}</p><div class="tool-meta">${esc(company(t.companyId)?.name||"")} · ${esc(t.category||"General")}</div><div class="tool-actions" style="margin-top:10px">${t.url?`<a class="mini-btn" href="${esc(t.url)}" target="_blank" rel="noopener noreferrer">Abrir herramienta ↗</a>`:""}${t.download?`<a class="mini-btn" href="${esc(t.download)}" target="_blank" rel="noopener noreferrer">Descargar ↓</a>`:""}</div></div></article>`).join("")}</div>`;
}
function adminPage(){
  content.innerHTML=`<div class="eyebrow">CONFIGURACIÓN DEL PORTAL</div><h1 class="subhead">Administración</h1><p class="muted">Registra empresas, secciones y accesos a tus aplicaciones.</p><div class="notice"><b>Importante:</b> esta versión guarda los cambios en el navegador de este dispositivo mediante almacenamiento local. No hay usuarios ni sincronización entre computadores. No registres información clínica, personal o confidencial. El portal publicado en GitHub Pages es público si no se configura una protección adicional.</div><div class="admin-grid">
  <section class="panel"><h3>AGREGAR EMPRESA / SECCIÓN PRINCIPAL</h3><form id="company-form" class="form-grid"><div class="field"><label>Nombre</label><input name="name" required placeholder="Ej. Nueva EPS"></div><div class="field"><label>Sigla o iniciales</label><input name="initials" maxlength="5" placeholder="NE"></div><div class="field full"><label>Descripción</label><input name="description" placeholder="Descripción breve"></div><div class="field full"><button class="btn btn-primary">Agregar sección</button></div></form></section>
  <section class="panel"><h3>AGREGAR HERRAMIENTA</h3><form id="tool-form" class="form-grid"><div class="field full"><label>Empresa</label><select name="companyId" required>${data.companies.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}</select></div><div class="field"><label>Nombre de la herramienta</label><input name="name" required placeholder="Ej. Validador de archivos"></div><div class="field"><label>Sección / categoría</label><input name="category" placeholder="Ej. Radicación" list="category-list"><datalist id="category-list">${data.companies.flatMap(c=>c.categories||[]).filter((v,i,a)=>a.indexOf(v)===i).map(v=>`<option value="${esc(v)}">`).join("")}</datalist></div><div class="field full"><label>Descripción</label><textarea name="description" placeholder="¿Para qué sirve esta herramienta?"></textarea></div><div class="field full"><label>Enlace para abrir (opcional)</label><input name="url" type="url" placeholder="https://..."></div><div class="field full"><label>Enlace para descargar (opcional)</label><input name="download" type="url" placeholder="https://..."></div><div class="field full"><button class="btn btn-primary">Guardar herramienta</button></div></form></section></div>
  <section class="panel" style="margin-top:16px"><h3>DATOS DEL PORTAL</h3><p class="muted">Empresas: ${data.companies.length} · Herramientas: ${data.tools.length}</p><button class="mini-btn" onclick="exportBackup()">Descargar copia de seguridad (JSON)</button> <button class="mini-btn" onclick="resetData()">Restablecer datos de ejemplo</button></section>`;
  document.getElementById("company-form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),name=f.get("name").trim();if(data.companies.some(c=>c.name.toLowerCase()===name.toLowerCase()))return toast("Esa sección ya existe.");const id="sec-"+Date.now();data.companies.push({id,name,initials:(f.get("initials")||name.slice(0,2)).toUpperCase(),description:f.get("description")||"Nueva sección",categories:["General"]});save();render();toast("Sección agregada.");};
  document.getElementById("tool-form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const cat=(f.get("category")||"General").trim();const co=company(f.get("companyId"));if(!co.categories.includes(cat))co.categories.push(cat);data.tools.push({id:"tool-"+Date.now(),companyId:f.get("companyId"),name:f.get("name").trim(),category:cat,description:f.get("description"),url:f.get("url"),download:f.get("download")});save();render();toast("Herramienta guardada.");};
}
function exportBackup(){const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="respaldo-medmax.json";a.click();URL.revokeObjectURL(a.href);}
function resetData(){if(!confirm("Esto borrará los cambios guardados en este navegador. ¿Continuar?"))return;data=JSON.parse(JSON.stringify(DEFAULT_DATA));save();render();toast("Datos de ejemplo restaurados.");}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
document.getElementById("mobile-menu").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
render();
