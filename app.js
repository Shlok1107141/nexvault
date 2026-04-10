// ── Star field ────────────────────────────────────────────────────────────────
(function initStars() {
  const canvas = document.getElementById("star-canvas");
  const ctx    = canvas.getContext("2d");
 
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  window.addEventListener("resize", resize);
 
  const COUNT = 240;
  const stars = Array.from({ length: COUNT }, () => ({
    x:   Math.random() * innerWidth,
    y:   Math.random() * innerHeight,
    r:   Math.random() * 1.2 + 0.15,
    o:   Math.random() * 0.55 + 0.08,
    spd: Math.random() * 0.005 + 0.0008,
    ph:  Math.random() * Math.PI * 2,
  }));
 
  // Subtle nebula blobs
  const blobs = [
    { rx: 0.10, ry: 0.15, size: 260, c: "rgba(60,30,120,0.04)"  },
    { rx: 0.85, ry: 0.70, size: 320, c: "rgba(20,60,140,0.035)" },
    { rx: 0.50, ry: 0.90, size: 200, c: "rgba(90,20,110,0.03)"  },
  ];
 
  let t = 0, lastShoot = 0;
 
  const draw = () => {
    t += 0.011;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    // Nebulae
    blobs.forEach(b => {
      const gx = b.rx * canvas.width, gy = b.ry * canvas.height;
      const g  = ctx.createRadialGradient(gx, gy, 0, gx, gy, b.size);
      g.addColorStop(0, b.c);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(gx, gy, b.size, 0, Math.PI * 2);
      ctx.fill();
    });
 
    // Stars
    stars.forEach(s => {
      const tw = 0.5 + 0.5 * Math.sin(t * s.spd * 80 + s.ph);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(235,230,255,${s.o * tw})`;
      ctx.fill();
    });
 
    // Occasional shooting star
    if (t - lastShoot > 10 + Math.random() * 16) {
      lastShoot = t;
      const sx  = Math.random() * canvas.width  * 0.65;
      const sy  = Math.random() * canvas.height * 0.35;
      const len = 60 + Math.random() * 120;
      const ang = Math.PI / 6 + Math.random() * 0.35;
      const g   = ctx.createLinearGradient(sx, sy, sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
      g.addColorStop(0,   "rgba(235,230,255,0)");
      g.addColorStop(0.5, "rgba(235,230,255,0.5)");
      g.addColorStop(1,   "rgba(235,230,255,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
      ctx.stroke();
    }
 
    requestAnimationFrame(draw);
  };
 
  draw();
})();
 
// ── Data ──────────────────────────────────────────────────────────────────────
const CATS = {
  expense: ["Food","Transport","Housing","Entertainment","Health","Shopping","Education","Travel","Other"],
  income:  ["Salary","Investment","Freelance","Other"],
};
 
const CAT_COLOR = {
  Food:"#f59e0b",  Transport:"#06b6d4", Housing:"#8b5cf6",
  Entertainment:"#ec4899", Health:"#ef4444", Shopping:"#f97316",
  Education:"#3b82f6", Travel:"#10b981",
  Salary:"#10b981", Investment:"#a78bfa", Freelance:"#22d3ee", Other:"#6b7280",
};
 
const CAT_ICON = {
  Food:"🍕", Transport:"🚗", Housing:"🏠", Entertainment:"🎮", Health:"❤️",
  Shopping:"🛍️", Education:"📚", Travel:"✈️",
  Salary:"💼", Investment:"📈", Freelance:"💻", Other:"📦",
};
 
let transactions = [
  {id:1,  type:"income",  cat:"Salary",        amount:55000, note:"Monthly salary",      date:"2026-04-01"},
  {id:2,  type:"expense", cat:"Housing",        amount:12000, note:"Rent",                date:"2026-04-01"},
  {id:3,  type:"expense", cat:"Food",           amount:3200,  note:"Grocery run",          date:"2026-04-02"},
  {id:4,  type:"expense", cat:"Entertainment",  amount:499,   note:"Netflix",              date:"2026-04-02"},
  {id:5,  type:"income",  cat:"Freelance",      amount:18000, note:"UI design project",    date:"2026-04-03"},
  {id:6,  type:"expense", cat:"Transport",      amount:1200,  note:"Fuel",                 date:"2026-04-04"},
  {id:7,  type:"expense", cat:"Health",         amount:800,   note:"Gym membership",       date:"2026-04-05"},
  {id:8,  type:"expense", cat:"Shopping",       amount:4500,  note:"Clothes",              date:"2026-04-06"},
  {id:9,  type:"income",  cat:"Investment",     amount:6200,  note:"Dividends",            date:"2026-04-07"},
  {id:10, type:"expense", cat:"Food",           amount:1100,  note:"Restaurant dinner",    date:"2026-04-07"},
  {id:11, type:"income",  cat:"Salary",         amount:55000, note:"Monthly salary",       date:"2026-03-01"},
  {id:12, type:"expense", cat:"Housing",        amount:12000, note:"Rent",                 date:"2026-03-01"},
  {id:13, type:"expense", cat:"Food",           amount:8500,  note:"Monthly groceries",    date:"2026-03-15"},
  {id:14, type:"expense", cat:"Entertainment",  amount:2200,  note:"Concert tickets",      date:"2026-03-20"},
  {id:15, type:"expense", cat:"Transport",      amount:3200,  note:"Car service",          date:"2026-03-10"},
  {id:16, type:"income",  cat:"Freelance",      amount:22000, note:"Web development",      date:"2026-03-25"},
  {id:17, type:"expense", cat:"Shopping",       amount:6800,  note:"Electronics",          date:"2026-03-18"},
  {id:18, type:"income",  cat:"Salary",         amount:55000, note:"Monthly salary",       date:"2026-02-01"},
  {id:19, type:"expense", cat:"Housing",        amount:12000, note:"Rent",                 date:"2026-02-01"},
  {id:20, type:"expense", cat:"Food",           amount:7200,  note:"Monthly groceries",    date:"2026-02-15"},
  {id:21, type:"expense", cat:"Travel",         amount:18000, note:"Weekend trip",         date:"2026-02-14"},
  {id:22, type:"expense", cat:"Health",         amount:800,   note:"Gym membership",       date:"2026-02-05"},
  {id:23, type:"income",  cat:"Investment",     amount:4800,  note:"Stock gains",          date:"2026-02-20"},
  {id:24, type:"expense", cat:"Entertainment",  amount:1200,  note:"Streaming services",   date:"2026-02-10"},
  {id:25, type:"expense", cat:"Education",      amount:2999,  note:"Online course",        date:"2026-02-22"},
];
 
// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt  = n => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", minimumFractionDigits:0 }).format(n);
const fmtK = n => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : n >= 1000 ? `₹${(n/1000).toFixed(1)}k` : fmt(n);
 
const totalBy = type => transactions.filter(t => t.type === type).reduce((s,t) => s + t.amount, 0);
 
function getMonthly() {
  const mm = {};
  transactions.forEach(t => {
    const k = t.date.slice(0,7);
    if (!mm[k]) mm[k] = { k, income:0, expense:0 };
    mm[k][t.type] += t.amount;
  });
  return Object.values(mm).sort((a,b) => a.k.localeCompare(b.k));
}
 
function monthName(ym, opts = { month:"short" }) {
  return new Date(ym + "-01").toLocaleString("default", opts);
}
 
// ── Totals ────────────────────────────────────────────────────────────────────
function updateTotals() {
  const income  = totalBy("income");
  const expense = totalBy("expense");
  const balance = income - expense;
  const rate    = income ? ((balance / income) * 100).toFixed(1) : 0;
 
  document.getElementById("kpi-income").textContent  = fmtK(income);
  document.getElementById("kpi-expense").textContent = fmtK(expense);
  const kbEl = document.getElementById("kpi-balance");
  kbEl.textContent = fmtK(balance);
  kbEl.className   = "kpi-value " + (balance >= 0 ? "green" : "red");
  document.getElementById("kpi-rate").textContent = rate + "%";
 
  document.getElementById("top-income").textContent  = fmtK(income);
  document.getElementById("top-expense").textContent = fmtK(expense);
 
  const sbEl = document.getElementById("sidebar-balance");
  sbEl.textContent = fmtK(Math.abs(balance));
  sbEl.className   = "balance-amount" + (balance < 0 ? " neg" : "");
  document.getElementById("sidebar-balance-sub").textContent =
    balance >= 0 ? "↑ positive balance" : "↓ negative balance";
}
 
// ── Donut ─────────────────────────────────────────────────────────────────────
function renderDonut() {
  const catMap = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    catMap[t.cat] = (catMap[t.cat] || 0) + t.amount;
  });
  const total   = Object.values(catMap).reduce((s,v) => s + v, 0);
  const entries = Object.entries(catMap).sort((a,b) => b[1] - a[1]);
 
  document.getElementById("donut-total").textContent = fmtK(total);
 
  const svg = document.getElementById("donut-svg");
  svg.innerHTML = "";
  const cx=90, cy=90, r=72, ri=50;
  let angle = -Math.PI / 2;
 
  entries.forEach(([cat, val]) => {
    const slice = (val / total) * Math.PI * 2;
    const x1=cx+r*Math.cos(angle),   y1=cy+r*Math.sin(angle);
    const x2=cx+r*Math.cos(angle+slice), y2=cy+r*Math.sin(angle+slice);
    const ix1=cx+ri*Math.cos(angle), iy1=cy+ri*Math.sin(angle);
    const ix2=cx+ri*Math.cos(angle+slice), iy2=cy+ri*Math.sin(angle+slice);
    const large = slice > Math.PI ? 1 : 0;
    const p = document.createElementNS("http://www.w3.org/2000/svg","path");
    p.setAttribute("d", `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${ri},${ri} 0 ${large},0 ${ix1},${iy1} Z`);
    p.setAttribute("fill", CAT_COLOR[cat] || "#555");
    p.setAttribute("stroke", "#050505");
    p.setAttribute("stroke-width", "2");
    p.style.opacity = "0.8";
    svg.appendChild(p);
    angle += slice;
  });
 
  document.getElementById("donut-legend").innerHTML =
    entries.slice(0,6).map(([cat]) =>
      `<div class="legend-item"><div class="legend-dot" style="background:${CAT_COLOR[cat]}"></div>${cat}</div>`
    ).join("");
}
 
// ── Bar chart ─────────────────────────────────────────────────────────────────
function renderBarChart() {
  const monthly = getMonthly();
  const maxVal  = Math.max(...monthly.map(m => Math.max(m.income, m.expense)), 1);
  const el      = document.getElementById("bar-chart");
  el.innerHTML  = "";
  monthly.forEach(m => {
    const iH = Math.round((m.income  / maxVal) * 130);
    const eH = Math.round((m.expense / maxVal) * 130);
    const g  = document.createElement("div");
    g.className = "bar-group";
    g.innerHTML = `
      <div class="bars">
        <div class="bar" style="height:${iH}px;background:#4ade80" title="Income: ${fmt(m.income)}"></div>
        <div class="bar" style="height:${eH}px;background:#f87171" title="Expenses: ${fmt(m.expense)}"></div>
      </div>
      <div class="bar-label">${monthName(m.k)}</div>`;
    el.appendChild(g);
  });
}
 
// ── Recent transactions ───────────────────────────────────────────────────────
function txRowHTML(tx, showDel = false) {
  const isInc = tx.type === "income";
  return `
    <div class="tx-row">
      <div class="tx-icon" style="background:${CAT_COLOR[tx.cat]}18;border:1px solid ${CAT_COLOR[tx.cat]}28">${CAT_ICON[tx.cat]}</div>
      <div class="tx-info">
        <div class="tx-note">${tx.note}</div>
        <div class="tx-meta">${tx.cat} · ${tx.date}</div>
      </div>
      <div class="tx-amount ${isInc ? "green" : "red"}">${isInc ? "+" : "−"}${fmt(tx.amount)}</div>
      ${showDel ? `<button class="tx-del" data-id="${tx.id}" title="Delete">✕</button>` : ""}
    </div>`;
}
 
function renderRecent() {
  const list = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,5);
  document.getElementById("recent-list").innerHTML =
    list.length ? list.map(t => txRowHTML(t)).join("") : `<div class="empty">No transactions yet</div>`;
}
 
// ── Transactions page ─────────────────────────────────────────────────────────
let txFilter = "all";
 
function renderTxList() {
  const search = document.getElementById("tx-search").value.toLowerCase();
  const list   = [...transactions]
    .filter(t => txFilter === "all" || t.type === txFilter)
    .filter(t => !search || (t.note + t.cat).toLowerCase().includes(search))
    .sort((a,b) => new Date(b.date) - new Date(a.date));
 
  document.getElementById("tx-count").textContent = `${list.length} transaction${list.length !== 1 ? "s" : ""}`;
  const el = document.getElementById("tx-list");
  el.innerHTML = list.length ? list.map(t => txRowHTML(t, true)).join("") : `<div class="empty">No transactions found</div>`;
 
  el.querySelectorAll(".tx-del").forEach(btn => {
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
  document.getElementById("add-form").classList.toggle("hidden");
});
 
function populateCatSelect() {
  const type = document.getElementById("f-type").value;
  document.getElementById("f-cat").innerHTML = CATS[type].map(c => `<option>${c}</option>`).join("");
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
  document.getElementById("add-form").classList.add("hidden");
  renderAll();
});
 
// ── Analytics page ────────────────────────────────────────────────────────────
function renderAnalytics() {
  const monthly = getMonthly();
  const maxVal  = Math.max(...monthly.map(m => Math.max(m.income, m.expense, Math.abs(m.income - m.expense))), 1);
 
  // Grouped bars
  const abars = document.getElementById("analytics-bars");
  abars.innerHTML = "";
  monthly.forEach(m => {
    const s  = m.income - m.expense;
    const iH = Math.round((m.income  / maxVal) * 130);
    const eH = Math.round((m.expense / maxVal) * 130);
    const sH = Math.max(0, Math.round((s / maxVal) * 130));
    const g  = document.createElement("div");
    g.className = "bar-group";
    g.innerHTML = `
      <div class="bars">
        <div class="bar" style="height:${iH}px;background:#4ade80" title="Income: ${fmt(m.income)}"></div>
        <div class="bar" style="height:${eH}px;background:#f87171" title="Expenses: ${fmt(m.expense)}"></div>
        <div class="bar" style="height:${sH}px;background:#a78bfa" title="Savings: ${fmt(s)}"></div>
      </div>
      <div class="bar-label">${monthName(m.k, { month:"short", year:"2-digit" })}</div>`;
    abars.appendChild(g);
  });
 
  // Category bars
  const catMap = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    catMap[t.cat] = (catMap[t.cat] || 0) + t.amount;
  });
  const entries = Object.entries(catMap).sort((a,b) => b[1] - a[1]);
  const maxCat  = entries[0]?.[1] || 1;
  document.getElementById("cat-bars").innerHTML = entries.map(([cat, val]) => `
    <div class="cat-bar-row">
      <div class="cat-bar-label">${cat}</div>
      <div class="cat-bar-track"><div class="cat-bar-fill" style="width:${(val/maxCat*100).toFixed(1)}%;background:${CAT_COLOR[cat]}"></div></div>
      <div class="cat-bar-val">${fmtK(val)}</div>
    </div>`).join("");
 
  // Summary table
  document.getElementById("summary-body").innerHTML = monthly.map(m => {
    const s   = m.income - m.expense;
    const r   = m.income ? ((s / m.income) * 100).toFixed(1) : 0;
    const pct = Math.min(100, Math.max(0, parseFloat(r)));
    const col = parseFloat(r) >= 20 ? "#4ade80" : parseFloat(r) >= 0 ? "#a78bfa" : "#f87171";
    return `
      <tr>
        <td style="color:#eaeaea">${monthName(m.k, { month:"long", year:"numeric" })}</td>
        <td style="color:#4ade80">${fmt(m.income)}</td>
        <td style="color:#f87171">${fmt(m.expense)}</td>
        <td style="color:${s >= 0 ? "#4ade80" : "#f87171"};font-weight:500">${fmt(s)}</td>
        <td>
          <div class="rate-bar-wrap">
            <div class="rate-bar-track"><div class="rate-bar-fill" style="width:${pct}%;background:${col};opacity:.8"></div></div>
            <span style="font-size:10px;color:#707070;min-width:30px">${r}%</span>
          </div>
        </td>
      </tr>`;
  }).join("");
}
 
// ── Finance & Geopolitical News ───────────────────────────────────────────────
// Replace NEWSAPI_KEY with a real key from newsapi.org if available.
// The dashboard falls back to curated mock data automatically.
const NEWSAPI_KEY = "YOUR_NEWSAPI_KEY_HERE";
 
const MOCK_NEWS = {
  finance: [
    { title:"RBI Holds Repo Rate at 6.5% Amid Inflation Watch", source:"Economic Times", description:"The Reserve Bank of India's monetary policy committee voted unanimously to hold rates steady, citing the need to monitor food inflation.", sentiment:"neutral", tag:"Central Bank", time:"2h ago" },
    { title:"Sensex Surges 680 Points as Foreign Investors Return", source:"Business Standard", description:"BSE Sensex and NSE Nifty posted sharp gains as foreign institutional investors turned net buyers after three weeks of selling.", sentiment:"positive", tag:"Equities", time:"3h ago" },
    { title:"Goldman Sachs Cuts India GDP Forecast to 6.2%", source:"Bloomberg", description:"The US investment bank trimmed its India growth outlook citing softening domestic consumption and external demand headwinds.", sentiment:"negative", tag:"Macro", time:"4h ago" },
    { title:"Gold Hits All-Time High as Dollar Weakens", source:"Reuters", description:"Spot gold climbed to a record $3,400 per ounce on safe-haven demand amid rising geopolitical tensions in the Middle East.", sentiment:"positive", tag:"Commodities", time:"5h ago" },
    { title:"Adani Group Repays $1.1B Loan Early, Signals Confidence", source:"Mint", description:"The conglomerate completed early repayment of a major margin-linked loan, boosting investor sentiment across group stocks.", sentiment:"positive", tag:"Corporate", time:"6h ago" },
    { title:"Crude Oil Falls Below $80 on Demand Slowdown Fears", source:"Financial Times", description:"WTI crude slipped under $80 a barrel as weak Chinese manufacturing data raised concerns about global energy demand.", sentiment:"negative", tag:"Energy", time:"7h ago" },
  ],
  economy: [
    { title:"India's Unemployment Rate Drops to 7.2% in Q1 2026", source:"CMIE", description:"Urban unemployment eased to a four-year low as manufacturing and services sectors absorbed more workers in the January-March quarter.", sentiment:"positive", tag:"Employment", time:"2h ago" },
    { title:"US Inflation Cools to 3.1% — Fed Eyes June Cut", source:"WSJ", description:"Core PCE inflation surprised to the downside, opening the door for the Federal Reserve to begin rate cuts at its June meeting.", sentiment:"positive", tag:"USA", time:"3h ago" },
    { title:"China Posts Surprise Trade Surplus of $80B", source:"Bloomberg", description:"China's exports beat forecasts as electronics and EVs drove demand, though the domestic consumption picture remained subdued.", sentiment:"neutral", tag:"China", time:"5h ago" },
    { title:"Europe Slides Toward Stagflation as PMI Contracts", source:"Reuters", description:"Eurozone manufacturing PMI fell to 46.2 in March, its lowest since 2020, as high energy costs and weak demand squeezed factories.", sentiment:"negative", tag:"Europe", time:"6h ago" },
  ],
  geopolitics: [
    { title:"US-China Trade Truce Extended for 90 Days", source:"Reuters", description:"Washington and Beijing agreed to extend their trade ceasefire, avoiding the reinstatement of retaliatory tariffs on $200B of goods.", sentiment:"positive", tag:"Trade War", time:"1h ago" },
    { title:"OPEC+ Considers Output Cut as Oil Slides", source:"Bloomberg", description:"Saudi Arabia and Russia are informally discussing further production cuts at the upcoming OPEC+ meeting to stabilise oil prices.", sentiment:"neutral", tag:"OPEC", time:"3h ago" },
    { title:"Taiwan Strait Tensions Rattle Asian Markets", source:"FT", description:"Rising military activity near the Taiwan Strait triggered risk-off sentiment across Asian equity and currency markets.", sentiment:"negative", tag:"Asia", time:"4h ago" },
    { title:"India-EU Free Trade Deal Inches Closer to Finalization", source:"Mint", description:"Indian and European negotiators completed another round of talks, with both sides expressing optimism about sealing a deal by year-end.", sentiment:"positive", tag:"Trade", time:"5h ago" },
  ],
  markets: [
    { title:"Nifty 50 Crosses 23,000 for First Time Since August", source:"NSE", description:"The benchmark index broke above a key resistance level buoyed by IT sector earnings and sustained FII buying.", sentiment:"positive", tag:"Nifty", time:"30m ago" },
    { title:"Bitcoin Retreats 4% as Regulatory Clarity Awaited", source:"CoinDesk", description:"BTC pulled back from $88,000 as markets await SEC guidance on spot ETF redemption rules expected later this month.", sentiment:"negative", tag:"Crypto", time:"2h ago" },
    { title:"Reliance Industries Posts Record ₹21,000 Cr Quarterly Profit", source:"BSE", description:"RIL beat analyst estimates on the back of strong Jio subscriber growth and an exceptional performance from its retail vertical.", sentiment:"positive", tag:"Corporate", time:"4h ago" },
    { title:"IPO Pipeline Swells: 14 Companies Set to List in April", source:"SEBI", description:"India's primary market is seeing a rush of listings as market conditions improve, with sectors ranging from fintech to defence.", sentiment:"positive", tag:"IPO", time:"5h ago" },
  ],
};
 
let currentTopic = "finance";
 
async function fetchNews(topic) {
  const statusEl = document.getElementById("news-status");
  const gridEl   = document.getElementById("news-grid");
  statusEl.textContent = "Fetching latest news…";
  gridEl.innerHTML = "";
 
  // Try real API first
  if (NEWSAPI_KEY && NEWSAPI_KEY !== "YOUR_NEWSAPI_KEY_HERE") {
    try {
      const q   = encodeURIComponent(topic === "geopolitics" ? "geopolitics OR world economy" : topic);
      const url = `https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&pageSize=6&language=en&apiKey=${NEWSAPI_KEY}`;
      const res = await fetch(url);
      if (res.ok) {
        const data    = await res.json();
        const articles = (data.articles || []).slice(0, 6);
        if (articles.length) {
          statusEl.textContent = "";
          renderNewsCards(articles.map(a => ({
            title:       a.title       || "Untitled",
            source:      a.source?.name || "Unknown",
            description: a.description  || "",
            sentiment:   "neutral",
            tag:         topic.charAt(0).toUpperCase() + topic.slice(1),
            time:        timeAgo(a.publishedAt),
          })));
          return;
        }
      }
    } catch (_) { /* fall through to mock */ }
  }
 
  // Fallback to mock data
  setTimeout(() => {
    statusEl.textContent = "";
    renderNewsCards(MOCK_NEWS[topic] || MOCK_NEWS.finance);
  }, 320);
}
 
function timeAgo(iso) {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 3600)  return Math.round(diff / 60)   + "m ago";
  if (diff < 86400) return Math.round(diff / 3600)  + "h ago";
  return Math.round(diff / 86400) + "d ago";
}
 
function renderNewsCards(items) {
  document.getElementById("news-grid").innerHTML = items.map(n => `
    <div class="news-card">
      <div class="news-card-top">
        <span class="news-source">${n.source}</span>
        <span class="news-badge ${n.sentiment}">${n.sentiment}</span>
      </div>
      <div class="news-title">${n.title}</div>
      <div class="news-desc">${n.description}</div>
      <div class="news-footer">
        <span class="news-time">${n.time}</span>
        <span class="news-tag"># ${n.tag}</span>
      </div>
    </div>`).join("");
}
 
// Topic pill listeners
document.querySelectorAll(".news-pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".news-pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    currentTopic = btn.dataset.topic;
    fetchNews(currentTopic);
  });
});
 
// ── Navigation ────────────────────────────────────────────────────────────────
const PAGE_LABELS = {
  dashboard:    "Dashboard",
  transactions: "Transactions",
  analytics:    "Analytics",
  news:         "Market News",
};
 
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.page;
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page-" + target).classList.add("active");
    document.getElementById("page-title").textContent = PAGE_LABELS[target];
    if (target === "news") fetchNews(currentTopic);
  });
});
 
// ── Render all ────────────────────────────────────────────────────────────────
function renderAll() {
  updateTotals();
  renderDonut();
  renderBarChart();
  renderRecent();
  renderTxList();
  renderAnalytics();
}
 
// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("page-date").value = new Date().toLocaleDateString("en-IN", {
  weekday:"long", year:"numeric", month:"long", day:"numeric",
});
document.getElementById("page-date").textContent = new Date().toLocaleDateString("en-IN", {
  weekday:"long", year:"numeric", month:"long", day:"numeric",
});
document.getElementById("f-date").value = new Date().toISOString().slice(0, 10);
 
renderAll();
