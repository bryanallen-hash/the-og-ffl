
window.FFL_DATA=window.FFL_DATA||{};
const FFL = (()=>{
  const fmtNumber=(v,d=0)=>{if(v===null||v===undefined||v==='')return '—';const n=Number(v);if(Number.isNaN(n))return String(v);return n.toLocaleString(undefined,{minimumFractionDigits:d,maximumFractionDigits:d});};
  const fmtSmart=(v)=>{if(v===null||v===undefined||v==='')return '—';const n=Number(v);if(Number.isNaN(n))return String(v);const d=Math.abs(n-Math.round(n))<.000001?0:2;return fmtNumber(n,d)};
  const fmtPct=(v,d=1)=>{if(v===null||v===undefined||v==='')return '—';const n=Number(v);return Number.isNaN(n)?String(v):(n*100).toFixed(d)+'%';};
  const esc=(s)=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const get=(o,k)=>o?.[k];
  const norm=(x)=>String(x??'').toLowerCase();
  const cmp=(a,b)=>{if(a===null||a===undefined||a==='')return 1;if(b===null||b===undefined||b==='')return -1;const na=Number(a),nb=Number(b);if(!Number.isNaN(na)&&!Number.isNaN(nb))return na-nb;return String(a).localeCompare(String(b));};
  function activeNav(){const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a').forEach(a=>{if((a.getAttribute('href')||'').split('?')[0]===p)a.classList.add('active')});}
  function unique(data,key){return [...new Set(data.map(r=>r[key]).filter(v=>v!==null&&v!==undefined&&v!==''))].sort((a,b)=>cmp(a,b));}
  function populateSelect(el, values, label='All'){if(!el)return;el.innerHTML='<option value="">'+esc(label)+'</option>'+values.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('');}
  function makeTable(opts){
    const root=typeof opts.root==='string'?document.querySelector(opts.root):opts.root;if(!root)return null;
    const state={data:opts.data||[],filtered:[],page:1,pageSize:opts.pageSize||50,sortKey:opts.defaultSort?.key||null,sortDir:opts.defaultSort?.dir||'asc'};
    const searchEl=opts.search?document.querySelector(opts.search):null;
    const filters=(opts.filters||[]).map(f=>({...f,el:document.querySelector(f.el)}));
    const cols=opts.columns;
    root.innerHTML='<div class="table-wrap"><table class="data-table"><thead><tr>'+cols.map(c=>'<th data-key="'+esc(c.key)+'" class="'+(c.className||'')+'">'+esc(c.label)+'<span class="sort-indicator"></span></th>').join('')+'</tr></thead><tbody></tbody></table></div><div class="pagination"><span class="pageinfo"></span><button data-prev>Prev</button><button data-next>Next</button></div>';
    const tbody=root.querySelector('tbody'), pageinfo=root.querySelector('.pageinfo'), prev=root.querySelector('[data-prev]'), next=root.querySelector('[data-next]');
    function match(r){
      const q=norm(searchEl?.value).trim(); if(q){const hay=cols.map(c=>norm(get(r,c.key))).join(' ');if(!hay.includes(q))return false;}
      for(const f of filters){const v=f.el?.value;if(!v)continue;if(f.test){if(!f.test(r,v))return false;}else if(String(get(r,f.key))!==String(v))return false;}
      return true;
    }
    function render(){
      let arr=state.data.filter(match);
      if(state.sortKey){const c=cols.find(x=>x.key===state.sortKey);arr.sort((a,b)=>{const aa=get(a,state.sortKey),bb=get(b,state.sortKey);return (c?.sort?c.sort(aa,bb,a,b):cmp(aa,bb))*(state.sortDir==='asc'?1:-1)});}
      state.filtered=arr; const pages=Math.max(1,Math.ceil(arr.length/state.pageSize)); if(state.page>pages)state.page=pages;
      const start=(state.page-1)*state.pageSize, rows=arr.slice(start,start+state.pageSize);
      tbody.innerHTML=rows.map((r,i)=>'<tr class="'+(opts.onRowClick?'clickable':'')+'" data-index="'+(start+i)+'">'+cols.map(c=>{let v=get(r,c.key);let html=c.format?c.format(v,r):esc(v??'—');return '<td class="'+(c.className||'')+'">'+html+'</td>'}).join('')+'</tr>').join('') || '<tr><td colspan="'+cols.length+'"><div class="empty">No matching records</div></td></tr>';
      pageinfo.textContent=arr.length?`${(start+1).toLocaleString()}–${Math.min(start+state.pageSize,arr.length).toLocaleString()} of ${arr.length.toLocaleString()}`:'0 records';
      prev.disabled=state.page<=1; next.disabled=state.page>=pages;
      root.querySelectorAll('th').forEach(th=>{const ind=th.querySelector('.sort-indicator');ind.textContent=th.dataset.key===state.sortKey?(state.sortDir==='asc'?'▲':'▼'):'';});
      if(opts.countEl){const e=document.querySelector(opts.countEl);if(e)e.textContent=arr.length.toLocaleString()+' records';}
    }
    root.querySelectorAll('th').forEach(th=>th.addEventListener('click',()=>{const k=th.dataset.key;if(state.sortKey===k)state.sortDir=state.sortDir==='asc'?'desc':'asc';else{state.sortKey=k;state.sortDir='asc'}state.page=1;render()}));
    prev.addEventListener('click',()=>{state.page--;render();});next.addEventListener('click',()=>{state.page++;render();});
    searchEl?.addEventListener('input',()=>{state.page=1;render();});filters.forEach(f=>f.el?.addEventListener('change',()=>{state.page=1;render();}));
    tbody.addEventListener('click',e=>{if(!opts.onRowClick)return;const tr=e.target.closest('tr[data-index]');if(tr)opts.onRowClick(state.filtered[Number(tr.dataset.index)]);});
    render(); return {state,render,setData(d){state.data=d;state.page=1;render();}};
  }
  function tabs(rootSel){const root=document.querySelector(rootSel);if(!root)return;root.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));root.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');root.querySelector('#'+btn.dataset.tab)?.classList.add('active');}));}
  document.addEventListener('DOMContentLoaded',activeNav);
  return {fmtNumber,fmtSmart,fmtPct,esc,unique,populateSelect,makeTable,tabs};
})();
