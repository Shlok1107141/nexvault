

const CATS = {
  expense: ["Food","Transport","Housing","Entertainment","Health","Shopping","Education","Travel","Other"],
  income:  ["Salary","Investment","Freelance","Other"],
};

const CAT_COLOR = {
  Food:"#f59e0b", Transport:"#06b6d4", Housing:"#8b5cf6", Entertainment:"#ec4899",
  Health:"#ef4444", Shopping:"#f97316", Education:"#3b82f6", Travel:"#10b981",
  Salary:"#10b981", Investment:"#a78bfa", Freelance:"#22d3ee", Other:"#6b7280",
};

const CAT_ICON = {
  Food:"🍕", Transport:"🚗", Housing:"🏠", Entertainment:"🎮", Health:"❤️",
  Shopping:"🛍️", Education:"📚", Travel:"✈️", Salary:"💼", Investment:"📈",
  Freelance:"💻", Other:"📦",
};

let transactions = [
  {id:1,  type:"income",  cat:"Salary",        amount:5500, note:"Monthly salary",       date:"2026-04-01"},
  {id:2,  type:"expense", cat:"Housing",        amount:1200, note:"Rent",                 date:"2026-04-01"},
  {id:3,  type:"expense", cat:"Food",           amount:85,   note:"Grocery run",           date:"2026-04-02"},
  {id:4,  type:"expense", cat:"Entertainment",  amount:15,   note:"Netflix",               date:"2026-04-02"},
  {id:5,  type:"income",  cat:"Freelance",      amount:800,  note:"UI design project",     date:"2026-04-03"},
  {id:6,  type:"expense", cat:"Transport",      amount:45,   note:"Fuel",                  date:"2026-04-04"},
  {id:7,  type:"expense", cat:"Health",         amount:60,   note:"Gym membership",        date:"2026-04-05"},
  {id:8,  type:"expense", cat:"Shopping",       amount:130,  note:"Clothes",               date:"2026-04-06"},
  {id:9,  type:"income",  cat:"Investment",     amount:320,  note:"Dividends",             date:"2026-04-07"},
  {id:10, type:"expense", cat:"Food",           amount:42,   note:"Restaurant dinner",     date:"2026-04-07"},
  {id:11, type:"income",  cat:"Salary",         amount:5500, note:"Monthly salary",        date:"2026-03-01"},
  {id:12, type:"expense", cat:"Housing",        amount:1200, note:"Rent",                  date:"2026-03-01"},
  {id:13, type:"expense", cat:"Food",           amount:310,  note:"Monthly groceries",     date:"2026-03-15"},
  {id:14, type:"expense", cat:"Entertainment",  amount:85,   note:"Concert tickets",       date:"2026-03-20"},
  {id:15, type:"expense", cat:"Transport",      amount:120,  note:"Car service",           date:"2026-03-10"},
  {id:16, type:"income",  cat:"Freelance",      amount:1200, note:"Web development",       date:"2026-03-25"},
  {id:17, type:"expense", cat:"Shopping",       amount:220,  note:"Electronics",           date:"2026-03-18"},
  {id:18, type:"income",  cat:"Salary",         amount:5500, note:"Monthly salary",        date:"2026-02-01"},
  {id:19, type:"expense", cat:"Housing",        amount:1200, note:"Rent",                  date:"2026-02-01"},
  {id:20, type:"expense", cat:"Food",           amount:275,  note:"Monthly groceries",     date:"2026-02-15"},
  {id:21, type:"expense", cat:"Travel",         amount:450,  note:"Weekend trip",          date:"2026-02-14"},
  {id:22, type:"expense", cat:"Health",         amount:60,   note:"Gym membership",        date:"2026-02-05"},
  {id:23, type:"income",  cat:"Investment",     amount:280,  note:"Stock gains",           date:"2026-02-20"},
  {id:24, type:"expense", cat:"Entertainment",  amount:50,   note:"Streaming services",    date:"2026-02-10"},
  {id:25, type:"expense", cat:"Education",      amount:29,   note:"Online course",         date:"2026-02-22"},
];



const fmt  = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",minimumFractionDigits:2}).format(n);
const fmtK = n => n >= 1000 ? `₹${(n/1000).toFixed(1)}k` : fmt(n);

const totalBy = (type) => transactions.filter(t => t.type === type).reduce((s,t) => s + t.amount, 0);

function getMonthly() {
  const mm = {};
  transactions.forEach(t => {
    const k = t.date.slice(0,7);
    if (!mm[k]) mm[k] = {k, income:0, expense:0};
    mm[k][t.type] += t.amount;
  });
  return Object.values(mm).sort((a,b) => a.k.localeCompare(b.k));
}

function monthName(ym, opts={month:"short"}) {
  return new Date(ym+"-01").toLocaleString("default", opts);
}



function updateTotals() {
  const income  = totalBy("income");
  const expense = totalBy("expense");
  const balance = income - expense;
  const rate    = income ? ((balance/income)*100).toFixed(1) : 0;

  
  document.getElementById("kpi-income").textContent  = fmtK(income);
  document.getElementById("kpi-expense").textContent = fmtK(expense);
  const kbEl = document.getElementById("kpi-balance");
  kbEl.textContent = fmtK(balance);
  kbEl.className = "kpi-value " + (balance >= 0 ? "green" : "red");
  document.getElementById("kpi-rate").textContent = rate + "%";

  
  document.getElementById("top-income").textContent  = fmtK(income);
  document.getElementById("top-expense").textContent = fmtK(expense);

  
  const sbEl = document.getElementById("sidebar-balance");
  sbEl.textContent = fmtK(Math.abs(balance));
  sbEl.className = "balance-amount" + (balance < 0 ? " neg" : "");
  document.getElementById("sidebar-balance-sub").textContent =
    balance >= 0 ? "↑ positive balance" : "↓ negative balance";
}



function renderDonut() {
  const catMap = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    catMap[t.cat] = (catMap[t.cat]||0) + t.amount;
  });
  const total = Object.values(catMap).reduce((s,v) => s+v, 0);

  document.getElementById("donut-total").textContent = fmtK(total);

  const entries = Object.entries(catMap).sort((a,b) => b[1]-a[1]);
  const svg = document.getElementById("donut-svg");
  svg.innerHTML = "";

  const cx=90, cy=90, r=72, ri=48;
  let angle = -Math.PI/2;

  entries.forEach(([cat, val]) => {
    const slice = (val/total) * Math.PI * 2;
    const x1 = cx + r*Math.cos(angle), y1 = cy + r*Math.sin(angle);
    const x2 = cx + r*Math.cos(angle+slice), y2 = cy + r*Math.sin(angle+slice);
    const ix1 = cx + ri*Math.cos(angle), iy1 = cy + ri*Math.sin(angle);
    const ix2 = cx + ri*Math.cos(angle+slice), iy2 = cy + ri*Math.sin(angle+slice);
    const large = slice > Math.PI ? 1 : 0;

    const path = document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("d",
      `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2}
       L${ix2},${iy2} A${ri},${ri} 0 ${large},0 ${ix1},${iy1} Z`
    );
    path.setAttribute("fill", CAT_COLOR[cat] || "#666");
    path.setAttribute("stroke", "#07070b");
    path.setAttribute("stroke-width", "2");
    svg.appendChild(path);
    angle += slice;
  });

  // Legend
  const leg = document.getElementById("donut-legend");
  leg.innerHTML = entries.slice(0,6).map(([cat]) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${CAT_COLOR[cat]}"></div>
      ${cat}
    </div>
  `).join("");
}



function renderBarChart() {
  const monthly = getMonthly();
  const maxVal  = Math.max(...monthly.map(m => Math.max(m.income, m.expense)), 1);
  const container = document.getElementById("bar-chart");
  container.innerHTML = "";

  monthly.forEach(m => {
    const iH = Math.round((m.income  / maxVal) * 140);
    const eH = Math.round((m.expense / maxVal) * 140);
    const g  = document.createElement("div");
    g.className = "bar-group";
    g.innerHTML = `
      <div class="bars">
        <div class="bar" style="height:${iH}px;background:var(--green)" title="Income: ${fmt(m.income)}"></div>
        <div class="bar" style="height:${eH}px;background:var(--purple)" title="Expenses: ${fmt(m.expense)}"></div>
      </div>
      <div class="bar-label">${monthName(m.k)}</div>
    `;
    container.appendChild(g);
  });
}


function renderRecent() {
  const list = [...transactions]
    .sort((a,b) => new Date(b.date)-new Date(a.date))
    .slice(0,5);
  document.getElementById("recent-list").innerHTML =
    list.length ? list.map(txHTML).join("") : `<div class="empty">No transactions yet</div>`;
}

function txHTML(tx) {
  const isInc = tx.type === "income";
  return `
    <div class="tx-row">
      <div class="tx-icon" style="background:${CAT_COLOR[tx.cat]}22">${CAT_ICON[tx.cat]}</div>
      <div class="tx-info">
        <div class="tx-note">${tx.note}</div>
        <div class="tx-meta">${tx.cat} · ${tx.date}</div>
      </div>
      <div class="tx-amount ${isInc?"green":"red"}">${isInc?"+":"-"}${fmt(tx.amount)}</div>
    </div>
  `;
}



let txFilter = "all";

function renderTxList() {
  const search = document.getElementById("tx-search").value.toLowerCase();
  const list   = [...transactions]
    .filter(t => txFilter === "all" || t.type === txFilter)
    .filter(t => !search || (t.note+t.cat).toLowerCase().includes(search))
    .sort((a,b) => new Date(b.date)-new Date(a.date));

  document.getElementById("tx-count").textContent =
    `${list.length} transaction${list.length !== 1 ? "s" : ""}`;

  document.getElementById("tx-list").innerHTML = list.length
    ? list.map(tx => `
        <div class="tx-row">
          <div class="tx-icon" style="background:${CAT_COLOR[tx.cat]}22">${CAT_ICON[tx.cat]}</div>
          <div class="tx-info">
            <div class="tx-note">${tx.note}</div>
            <div class="tx-meta">${tx.cat} · ${tx.date}</div>
          </div>
          <div class="tx-amount ${tx.type==="income"?"green":"red"}">
            ${tx.type==="income"?"+":"-"}${fmt(tx.amount)}
          </div>
          <button class="tx-del" data-id="${tx.id}" title="Delete">✕</button>
        </div>
      `).join("")
    : `<div class="empty">No transactions found</div>`;

  
  document.querySelectorAll(".tx-del").forEach(btn => {
    btn.addEventListener("click", () => {
      transactions = transactions.filter(t => t.id !== Number(btn.dataset.id));
      renderAll();
    });
  });
}


document.querySelectorAll(".pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    txFilter = btn.dataset.filter;
    renderTxList();
  });
});


document.getElementById("tx-search").addEventListener("input", renderTxList);


document.getElementById("toggle-form").addEventListener("click", () => {
  const f = document.getElementById("add-form");
  f.style.display = f.style.display === "none" ? "block" : "none";
});


function populateCatSelect() {
  const typeEl = document.getElementById("f-type");
  const catEl  = document.getElementById("f-cat");
  catEl.innerHTML = CATS[typeEl.value].map(c => `<option>${c}</option>`).join("");
}
document.getElementById("f-type").addEventListener("change", populateCatSelect);
populateCatSelect();


document.getElementById("save-tx").addEventListener("click", () => {
  const type   = document.getElementById("f-type").value;
  const cat    = document.getElementById("f-cat").value;
  const amount = parseFloat(document.getElementById("f-amount").value);
  const note   = document.getElementById("f-note").value.trim() || cat;
  const date   = document.getElementById("f-date").value;

  if (!amount || !date) { alert("Please fill in amount and date."); return; }

  transactions.push({ id: Date.now(), type, cat, amount, note, date });
  document.getElementById("f-amount").value = "";
  document.getElementById("f-note").value   = "";
  document.getElementById("add-form").style.display = "none";
  renderAll();
});



function renderAnalytics() {
  const monthly = getMonthly();
  const maxVal  = Math.max(...monthly.map(m => Math.max(m.income, m.expense, m.income-m.expense)), 1);

  
  const abars = document.getElementById("analytics-bars");
  abars.innerHTML = "";
  monthly.forEach(m => {
    const s  = m.income - m.expense;
    const iH = Math.round((m.income  / maxVal) * 140);
    const eH = Math.round((m.expense / maxVal) * 140);
    const sH = Math.max(0, Math.round((s / maxVal) * 140));
    const g  = document.createElement("div");
    g.className = "bar-group";
    g.innerHTML = `
      <div class="bars">
        <div class="bar" style="height:${iH}px;background:var(--green)"  title="Income: ${fmt(m.income)}"></div>
        <div class="bar" style="height:${eH}px;background:var(--purple)" title="Expenses: ${fmt(m.expense)}"></div>
        <div class="bar" style="height:${sH}px;background:var(--cyan)"   title="Savings: ${fmt(s)}"></div>
      </div>
      <div class="bar-label">${monthName(m.k, {month:"short", year:"2-digit"})}</div>
    `;
    abars.appendChild(g);
  });

 
  const catMap = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    catMap[t.cat] = (catMap[t.cat]||0) + t.amount;
  });
  const entries = Object.entries(catMap).sort((a,b) => b[1]-a[1]);
  const maxCat  = entries[0]?.[1] || 1;
  const catEl   = document.getElementById("cat-bars");
  catEl.innerHTML = entries.map(([cat, val]) => `
    <div class="cat-bar-row">
      <div class="cat-bar-label">${cat}</div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill" style="width:${(val/maxCat*100).toFixed(1)}%;background:${CAT_COLOR[cat]}"></div>
      </div>
      <div class="cat-bar-val">${fmtK(val)}</div>
    </div>
  `).join("");

  
  const tbody = document.getElementById("summary-body");
  tbody.innerHTML = monthly.map(m => {
    const s = m.income - m.expense;
    const r = m.income ? ((s/m.income)*100).toFixed(1) : 0;
    const rPct = Math.min(100, Math.max(0, parseFloat(r)));
    const rColor = parseFloat(r) >= 20 ? "var(--green)" : parseFloat(r) >= 0 ? "var(--purple-l)" : "var(--red)";
    return `
      <tr>
        <td style="color:var(--text);font-weight:500">${monthName(m.k, {month:"long",year:"numeric"})}</td>
        <td style="color:var(--green)">${fmt(m.income)}</td>
        <td style="color:var(--red)">${fmt(m.expense)}</td>
        <td style="color:${s>=0?"var(--green)":"var(--red)"}; font-weight:600">${fmt(s)}</td>
        <td>
          <div class="rate-bar-wrap">
            <div class="rate-bar-track">
              <div class="rate-bar-fill" style="width:${rPct}%;background:${rColor}"></div>
            </div>
            <span style="font-size:10px;color:var(--muted);min-width:32px">${r}%</span>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}



const PAGE_LABELS = { dashboard:"Dashboard", transactions:"Transactions", analytics:"Analytics" };

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.page;

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page-"+target).classList.add("active");

    document.getElementById("page-title").textContent = PAGE_LABELS[target];
  });
});



function renderAll() {
  updateTotals();
  renderDonut();
  renderBarChart();
  renderRecent();
  renderTxList();
  renderAnalytics();
}


const today = new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
document.getElementById("page-date").textContent = today;
document.getElementById("f-date").value = new Date().toISOString().slice(0,10);

renderAll();
