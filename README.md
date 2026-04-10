# ✦ NexVault — Smart Finance Dashboard

> A web-based personal finance tracker built with pure HTML, CSS & JavaScript.
> Glassmorphism UI, animated star field, live charts, budget goals, and market news — zero dependencies, zero build step.

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-8b5cf6?style=flat-square&logo=github)](https://shlok1107141.github.io/nexvault/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=flat-square&logo=github)](https://github.com/Shlok1107141/nexvault)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## 🔗 Links

| | |
|---|---|
| **Live Website** | https://shlok1107141.github.io/nexvault/ |
| **GitHub Repository** | https://github.com/Shlok1107141/nexvault |

---

## 📌 What Is NexVault?

NexVault is a lightweight, browser-native personal finance dashboard that lets you track income and expenses, visualise spending patterns, set monthly budget goals, and browse live financial news — all without installing anything or signing up anywhere.

Built entirely with vanilla HTML, CSS, and JavaScript. No React, no Node, no build tools. Just three files and a browser.

---

## ✨ Features

### 📊 Dashboard
- Four animated KPI cards — Total Income, Total Expenses, Net Balance, Savings Rate
- SVG donut chart showing expense breakdown by category
- Monthly income vs expense bar chart
- Recent transactions feed

### 💳 Transactions
- Add income and expense entries with category, amount, note, and date
- Delete any transaction
- Filter by type (All / Income / Expense)
- Live search by note or category

### 📈 Analytics
- Monthly comparison bars — Income, Expenses, Savings side by side
- Horizontal category breakdown with proportional fill bars
- Month-by-month summary table with savings rate progress bars

### 🎯 Budget Goals
- Animated SVG progress rings per spending category
- Click-to-edit monthly limits
- Live over-budget detection with red alerts
- Add new budget goals at any time

### 📰 Market News
- Finance, Economy, Geopolitics, and Markets topic tabs
- Live data via NewsAPI.org (with your API key)
- Curated mock fallback data when no key is provided
- Glassmorphic news cards with sentiment badges (positive / negative / neutral)

---

## 🎨 Design System

| Property | Value |
|---|---|
| Background | `#050505` deep black |
| Glass cards | `rgba(255,255,255,0.045)` + `backdrop-filter: blur(18px)` |
| Border | `1px solid rgba(255,255,255,0.09)` |
| Income color | `#4ade80` mint green |
| Expense color | `#f87171` soft red |
| Accent | `#a78bfa` lavender |
| Display font | Syne (Google Fonts) |
| Body font | DM Sans (Google Fonts) |
| Star field | Canvas — 240 stars + nebula blobs + shooting stars via `requestAnimationFrame` |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 — semantic structure, `<canvas>` for star field |
| Styling | CSS3 — custom properties, glassmorphism, `backdrop-filter`, keyframe animations, CSS Grid, responsive media queries |
| Logic | Vanilla JavaScript ES6+ — DOM manipulation, SVG path rendering, canvas animation, `Intl.NumberFormat` (₹ INR), `fetch` API |
| Charts | Pure SVG donut + CSS flex bar charts — no external chart libraries |
| News | NewsAPI.org with curated mock fallback |
| Fonts | Google Fonts — Syne + DM Sans |
| Deployment | GitHub Pages — static, from `main` branch root |

**No frameworks. No npm. No build step. No dependencies.**

---

## 📁 File Structure

```
nexvault/
├── index.html   ← page structure, all four sections
├── style.css    ← glassmorphism theme, animations, responsive layout
├── app.js       ← all logic — charts, transactions, budget, news, star field
└── README.md
```

---

## 🚀 Run Locally

No installation needed. Just open the file:

```bash
git clone https://github.com/Shlok1107141/nexvault.git
cd nexvault
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or drag `index.html` into any browser.

---

## 🌐 Deploy to GitHub Pages

The site is already live. To update after making changes:

```bash
git add .
git commit -m "your update message"
git push origin main
```

GitHub Pages auto-deploys from the `main` branch root. No configuration needed.

To set it up from scratch on a new repo:
1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Click **Save** — live in ~60 seconds

---

## 🔑 NewsAPI Setup (Optional)

The news section works out of the box with mock data. To enable live headlines:

1. Get a free API key at [newsapi.org](https://newsapi.org)
2. Open `app.js`
3. Replace this line near the top:
   ```js
   const NEWSAPI_KEY = "YOUR_NEWSAPI_KEY_HERE";
   ```
   with your actual key:
   ```js
   const NEWSAPI_KEY = "abc123yourkeyhere";
   ```

> **Note:** NewsAPI free tier only works on `localhost`. For the deployed GitHub Pages site, the mock fallback data is used automatically — this is expected behaviour.

---

## 🗺 Roadmap

- [ ] localStorage persistence — save transactions between sessions
- [ ] User authentication — secure login with hashed credentials
- [ ] AES encryption for stored data
- [ ] Cloud sync via Firebase or Supabase
- [ ] CSV / PDF export of transaction history
- [ ] PWA support — installable on mobile and desktop
- [ ] Dark / light theme toggle

---

## 👤 Author

**Shlok Gupta**
Registration No: 24BCI0061
[GitHub](https://github.com/Shlok1107141) · [Live Site](https://shlok1107141.github.io/nexvault/)

---

## 📄 License

MIT © 2026 Shlok Gupta
