# eToro Terminal — About Page Content

---

## Hero Section

### Headline
**The Bloomberg Terminal for Everyone.**

### Subheadline
Professional-grade trading tools built on the eToro API. 21 panels. 10,800+ instruments. Zero cost.

### CTA
[ Enter Terminal ] [ Watch Demo ]

---

## The Story

### Bloomberg charges $24,000 a year.

That's $2,000 a month for the privilege of seeing real-time data, running analytics, and executing trades through a professional interface. For institutional traders, it's table stakes. For everyone else, it's a locked door.

**We built the key.**

eToro Terminal is a Bloomberg-style trading workspace built entirely on the eToro Public API. Every quote is real. Every chart is live. Every trade executes on your actual eToro account. And it costs exactly nothing.

---

## What You Get

### 21 Professional Panels

Drag them. Resize them. Arrange them your way. Save your layout. This is YOUR trading floor.

| Panel | Code | What It Does |
|-------|------|-------------|
| **Quote** | `QT` | Real-time price, P/E, market cap, daily range |
| **Chart** | `CH` | Interactive price charts with technical indicators |
| **Portfolio** | `PF` | Your positions, P/L, allocation breakdown |
| **Trade Ticket** | `TRD` | Execute trades with built-in duplicate protection |
| **Watchlists** | `WL` | Custom watchlists, unlimited symbols |
| **Watchlist Monitor** | `WLM` | Multi-symbol live grid with flash highlights |
| **Asset Explorer** | `EXP` | Browse all 10,800+ instruments by category |
| **Market Overview** | `MKT` | Global indices, sectors, market pulse |
| **Blotter** | `ORD` | Order history, fills, execution details |
| **Alerts** | `AL` | Price alerts with sound notifications |
| **Social Feed** | `FEED` | What eToro traders are saying about any stock |
| **Curated Lists** | `CL` | eToro's editorial picks and themed collections |
| **Copy Trading** | `PI` | Find and analyze Popular Investors |
| **Trader Profile** | `TP` | Deep-dive into any trader's stats |
| **Risk Analysis** | `RISK` | Portfolio risk metrics and exposure |
| **Performance** | `PERF` | Returns analysis across timeframes |
| **Activity Log** | `ACT` | Your complete trading activity |
| **API Tester** | `API` | Direct API explorer for developers |
| **Connection Status** | `CONN` | Real-time API health and diagnostics |
| **Recommendations** | `REC` | Investment recommendations engine |
| **Help** | `HELP` | Full command reference and shortcuts |

### Command Bar

Type like a trader. No menus. No clicks. Just commands.

```
AAPL          → Instant quote
AAPL QT       → Open quote panel
PF            → Your portfolio
WL            → Watchlists  
TRD TSLA      → Trade ticket for Tesla
SEARCH crypto → Find crypto instruments
MKT           → Market overview
HELP          → All commands
```

### 10,800+ Instruments

Stocks. Crypto. ETFs. Commodities. Currencies. Indices. If eToro has it, the Terminal has it. Searchable. Quotable. Tradeable.

### Real & Demo Modes

Practice with virtual money. Trade with real money. Switch between modes instantly. Demo mode uses eToro's $100,000 virtual portfolio — perfect for testing strategies without risk.

### Mobile Ready

Full responsive design. Touch-friendly navigation. Works on your phone, your tablet, your desktop. Trade from anywhere.

---

## Built for Speed

The Terminal isn't just pretty — it's fast.

**Request Caching:** Intelligent 30-second cache eliminates redundant API calls. Your data stays fresh without hammering the server.

**Request Deduplication:** Multiple panels requesting the same data? One API call. Shared result. Zero waste.

**Flash Updates:** Watchlist Monitor highlights price changes in real-time. Green flash for up. Red flash for down. You see movement the instant it happens.

**Keyboard-First:** Every panel has a keyboard shortcut. Every command can be typed. Professional traders don't click — they type.

---

## Security First

Your API keys never leave your browser. The Terminal runs entirely client-side — no backend server stores your credentials. Keys auto-expire after 30 minutes of inactivity. Every console log is sanitized — no credential exposure, even in developer tools.

**Trade Protection:** Built-in duplicate trade prevention. If you accidentally double-click, the Terminal catches it. AbortController cancels duplicate requests. A 1-second cooldown prevents identical trades. Your money is protected from your mistakes.

---

## The Technology

- **React 18** — Modern component architecture
- **TypeScript** — Type-safe, bug-resistant code
- **Vite** — Sub-second hot reload development
- **Electron** — Desktop app for Windows, Mac, Linux (coming soon)
- **eToro Public API** — Real-time data, real trades

---

## Who Built This

eToro Terminal was created by **Yoni Assia**, founder of eToro — the social trading platform with 35+ million users worldwide. After taking eToro public on NASDAQ in 2025 at a $5.6 billion valuation, Yoni asked a simple question:

*"What if every eToro user had access to the same tools the professionals use?"*

Bloomberg costs $24,000. Refinitiv costs $22,000. FactSet costs $12,000. These tools are incredible — but they're gates, not bridges. They keep professional-grade analysis in the hands of the few.

eToro Terminal is the bridge. Same capabilities. Same real-time data. Same professional workflow. Built on the API that eToro already provides to every user.

**Professional tools shouldn't require a professional budget.**

---

## Part of MoneyClaw

eToro Terminal is one piece of the MoneyClaw trading intelligence platform:

- 🧠 **ClawX** — Personal AI trading assistant → x.moneyclaw.com
- 📊 **AlphaAgents** — AI-powered stock ratings → agents.moneyclaw.com
- 💹 **eToro Terminal** — Bloomberg-style interface → terminal.moneyclaw.com
- ⚔️ **Quant Arena** — Strategy builder & backtester → arena.moneyclaw.com
- 💰 **WalletClaw** — AI-native crypto wallet → Coming soon

---

## Getting Started

1. **Get your eToro API key** — Settings → Trading → API Key Management
2. **Enter your credentials** — Your keys stay in your browser
3. **Start trading** — Type any ticker and go

No signup. No subscription. No catch.

---

## Open Source

eToro Terminal is open source. Inspect the code. Verify the security. Contribute improvements.

**GitHub:** github.com/yoniassia/etoro-terminal

---

*eToro Terminal — Because $24,000/year for market data is ridiculous.*

*Built by the founder of eToro. Free for every trader.*
