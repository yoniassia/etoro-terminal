import { useEffect, useRef } from 'react';
import '../styles/about.css';

interface AboutPageProps {
  onEnterTerminal: () => void;
}

const panels = [
  { code: 'QT', name: 'Quote', icon: '📊', desc: 'Real-time price, P/E, market cap' },
  { code: 'CH', name: 'Chart', icon: '📈', desc: 'Interactive charts with indicators' },
  { code: 'PF', name: 'Portfolio', icon: '💼', desc: 'Positions, P/L, allocation' },
  { code: 'TRD', name: 'Trade Ticket', icon: '⚡', desc: 'Execute with dupe protection' },
  { code: 'WL', name: 'Watchlists', icon: '👁️', desc: 'Custom watchlists, unlimited' },
  { code: 'WLM', name: 'Monitor', icon: '🖥️', desc: 'Multi-symbol live grid' },
  { code: 'EXP', name: 'Explorer', icon: '🔍', desc: 'Browse 10,800+ instruments' },
  { code: 'MKT', name: 'Markets', icon: '🌍', desc: 'Global indices & sectors' },
  { code: 'ORD', name: 'Blotter', icon: '📋', desc: 'Order history & fills' },
  { code: 'AL', name: 'Alerts', icon: '🔔', desc: 'Price alerts with sound' },
  { code: 'FEED', name: 'Social', icon: '💬', desc: 'Trader social feed' },
  { code: 'CL', name: 'Curated', icon: '✨', desc: 'Editorial picks & themes' },
  { code: 'PI', name: 'Copy Trade', icon: '👥', desc: 'Find Popular Investors' },
  { code: 'TP', name: 'Profiles', icon: '🎯', desc: 'Deep trader analytics' },
  { code: 'RISK', name: 'Risk', icon: '🛡️', desc: 'Risk metrics & exposure' },
  { code: 'PERF', name: 'Performance', icon: '🏆', desc: 'Returns across timeframes' },
  { code: 'ACT', name: 'Activity', icon: '📝', desc: 'Complete activity log' },
  { code: 'API', name: 'API Tester', icon: '🔧', desc: 'Direct API explorer' },
  { code: 'CONN', name: 'Status', icon: '🟢', desc: 'API health & diagnostics' },
  { code: 'REC', name: 'Recommend', icon: '💡', desc: 'Investment recommendations' },
  { code: 'HELP', name: 'Help', icon: '❓', desc: 'Commands & shortcuts' },
];

const commands = [
  { input: 'AAPL', result: 'Instant quote' },
  { input: 'AAPL QT', result: 'Open quote panel' },
  { input: 'PF', result: 'Your portfolio' },
  { input: 'TRD TSLA', result: 'Trade ticket for Tesla' },
  { input: 'MKT', result: 'Market overview' },
  { input: 'HELP', result: 'All commands' },
];

const ecosystemApps = [
  { name: 'ClawX', icon: '🧠', desc: 'Personal AI trading assistant', url: 'https://x.moneyclaw.com', status: 'Live' },
  { name: 'AlphaAgents', icon: '📊', desc: 'AI-powered stock ratings', url: 'https://agents.moneyclaw.com', status: 'Live' },
  { name: 'eToro Terminal', icon: '💹', desc: 'Bloomberg-style interface', url: 'https://terminal.moneyclaw.com', status: 'Live' },
  { name: 'Quant Arena', icon: '⚔️', desc: 'Strategy builder & backtester', url: 'https://arena.moneyclaw.com', status: 'Live' },
  { name: 'WalletClaw', icon: '💰', desc: 'AI-native crypto wallet', url: '#', status: 'Coming Soon' },
];

export default function AboutPage({ onEnterTerminal }: AboutPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} style={styles.page} className="about-page">
      {/* Fixed nav bar */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <span style={styles.navLogo}>
            <span style={styles.navLogoIcon}>◆</span> eToro Terminal
          </span>
          <div style={styles.navLinks} className="about-nav-links">
            <a href="#panels" style={styles.navLink} className="about-nav-link">Panels</a>
            <a href="#speed" style={styles.navLink} className="about-nav-link">Speed</a>
            <a href="#security" style={styles.navLink} className="about-nav-link">Security</a>
            <a href="https://github.com/yoniassia/etoro-terminal" target="_blank" rel="noopener noreferrer" style={styles.navLink} className="about-nav-link">GitHub</a>
            <button onClick={onEnterTerminal} style={styles.navCta}>
              Enter Terminal →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span style={styles.heroBadgeDot} />
            Open Source • Free Forever
          </div>
          <h1 style={styles.heroTitle}>
            The Bloomberg Terminal<br />
            <span style={styles.heroTitleAccent}>for Everyone.</span>
          </h1>
          <p style={styles.heroSub}>
            Professional-grade trading tools built on the eToro API.<br />
            21 panels. 10,800+ instruments. Zero cost.
          </p>
          <div style={styles.heroButtons}>
            <button onClick={onEnterTerminal} style={styles.primaryButton} className="about-primary-btn">
              Enter Terminal
            </button>
            <a href="https://github.com/yoniassia/etoro-terminal" target="_blank" rel="noopener noreferrer" style={styles.secondaryButton} className="about-secondary-btn">
              View on GitHub
            </a>
          </div>
        </div>
        {/* Terminal mockup */}
        <div style={styles.terminalPreview}>
          <div style={styles.terminalBar}>
            <div style={styles.terminalDots}>
              <span style={{ ...styles.terminalDot, backgroundColor: '#ff5f57' }} />
              <span style={{ ...styles.terminalDot, backgroundColor: '#ffbd2e' }} />
              <span style={{ ...styles.terminalDot, backgroundColor: '#28c840' }} />
            </div>
            <span style={styles.terminalBarTitle}>eToro Terminal v1.4.0</span>
          </div>
          <div style={styles.terminalBody}>
            <div style={styles.terminalLine}>
              <span style={styles.terminalPrompt}>&gt;</span> AAPL QT
            </div>
            <div style={styles.terminalOutput}>
              ╔══ APPLE INC (AAPL) ══════════════════╗<br />
              ║ Price: $198.45 &nbsp; Change: +2.31% &nbsp;&nbsp;&nbsp;║<br />
              ║ P/E: 31.2 &nbsp;&nbsp;&nbsp; Mkt Cap: $3.06T &nbsp;&nbsp;║<br />
              ║ Vol: 48.2M &nbsp;&nbsp; Range: 195.80-199.12 ║<br />
              ╚══════════════════════════════════════╝
            </div>
            <div style={styles.terminalLine}>
              <span style={styles.terminalPrompt}>&gt;</span> PF
            </div>
            <div style={styles.terminalOutput}>
              Loading portfolio... 12 positions found.<br />
              Total Value: $127,450.32 &nbsp; P/L: +$4,231.18 (+3.4%)
            </div>
            <div style={styles.terminalLine}>
              <span style={styles.terminalCursor}>▊</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={styles.statsBar}>
        <div style={styles.statsInner}>
          {[
            { value: '10,800+', label: 'Instruments' },
            { value: '21', label: 'Panels' },
            { value: '$0', label: 'Per Year' },
            { value: '100%', label: 'Open Source' },
          ].map((stat) => (
            <div key={stat.label} style={styles.statItem}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The Story */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.storyGrid} className="about-story-grid">
            <div>
              <h2 style={styles.sectionTitle}>
                Bloomberg charges<br />
                <span style={styles.priceHighlight}>$24,000 a year.</span>
              </h2>
              <p style={styles.storyText}>
                That's $2,000 a month for the privilege of seeing real-time data, 
                running analytics, and executing trades through a professional interface. 
                For institutional traders, it's table stakes. For everyone else, it's a locked door.
              </p>
              <p style={styles.storyPunchline}>
                We built the key.
              </p>
              <p style={styles.storyText}>
                eToro Terminal is a Bloomberg-style trading workspace built entirely on the 
                eToro Public API. Every quote is real. Every chart is live. Every trade executes 
                on your actual eToro account. And it costs exactly nothing.
              </p>
            </div>
            <div style={styles.priceComparison}>
              {[
                { name: 'Bloomberg', price: '$24,000', color: '#ff4444' },
                { name: 'Refinitiv', price: '$22,000', color: '#ff6644' },
                { name: 'FactSet', price: '$12,000', color: '#ff8844' },
                { name: 'eToro Terminal', price: '$0', color: '#00ff00' },
              ].map((item) => (
                <div key={item.name} style={styles.priceCompareRow}>
                  <span style={styles.priceCompareName}>{item.name}</span>
                  <div style={styles.priceCompareBarOuter}>
                    <div style={{
                      ...styles.priceCompareBarInner,
                      width: item.price === '$0' ? '2px' : `${(parseInt(item.price.replace(/[^0-9]/g, '')) / 24000) * 100}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}40`,
                    }} />
                  </div>
                  <span style={{ ...styles.priceComparePrice, color: item.color }}>{item.price}/yr</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 21 Panels Grid */}
      <section id="panels" style={{ ...styles.section, backgroundColor: '#080c14' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>21 Professional Panels</h2>
          <p style={styles.sectionSub}>
            Drag them. Resize them. Arrange them your way. Save your layout. This is YOUR trading floor.
          </p>
          <div style={styles.panelGrid} className="about-panel-grid">
            {panels.map((panel) => (
              <div key={panel.code} style={styles.panelCard} className="about-panel-card">
                <div style={styles.panelCardIcon}>{panel.icon}</div>
                <div style={styles.panelCardCode}>{panel.code}</div>
                <div style={styles.panelCardName}>{panel.name}</div>
                <div style={styles.panelCardDesc}>{panel.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Bar */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Type Like a Trader</h2>
          <p style={styles.sectionSub}>
            No menus. No clicks. Just commands. The command bar is your gateway to everything.
          </p>
          <div style={styles.commandDemo}>
            <div style={styles.commandBarMock}>
              <span style={styles.commandBarChevron}>▸</span>
              <span style={styles.commandBarText}>AAPL QT</span>
              <span style={styles.commandBarHint}>Press / to focus</span>
            </div>
            <div style={styles.commandList}>
              {commands.map((cmd) => (
                <div key={cmd.input} style={styles.commandRow}>
                  <code style={styles.commandInput}>{cmd.input}</code>
                  <span style={styles.commandArrow}>→</span>
                  <span style={styles.commandResult}>{cmd.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speed Section */}
      <section id="speed" style={{ ...styles.section, backgroundColor: '#080c14' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Built for Speed</h2>
          <p style={styles.sectionSub}>The Terminal isn't just pretty — it's fast.</p>
          <div style={styles.featureGrid}>
            {[
              {
                icon: '⚡',
                title: 'Request Caching',
                desc: 'Intelligent 30-second cache eliminates redundant API calls. Your data stays fresh without hammering the server.',
              },
              {
                icon: '🔗',
                title: 'Request Deduplication',
                desc: 'Multiple panels requesting the same data? One API call. Shared result. Zero waste.',
              },
              {
                icon: '🟢',
                title: 'Flash Updates',
                desc: 'Watchlist Monitor highlights price changes in real-time. Green flash for up. Red flash for down.',
              },
              {
                icon: '⌨️',
                title: 'Keyboard-First',
                desc: 'Every panel has a keyboard shortcut. Every command can be typed. Professional traders don\'t click — they type.',
              },
            ].map((feature) => (
              <div key={feature.title} style={styles.featureCard} className="about-feature-card">
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Security First</h2>
          <div style={styles.securityGrid}>
            <div style={styles.securityCard}>
              <div style={styles.securityIcon}>🔒</div>
              <h3 style={styles.securityTitle}>Client-Side Only</h3>
              <p style={styles.securityDesc}>
                Your API keys never leave your browser. No backend server stores your credentials. 
                Everything runs locally in your browser.
              </p>
            </div>
            <div style={styles.securityCard}>
              <div style={styles.securityIcon}>⏱️</div>
              <h3 style={styles.securityTitle}>Auto-Expire</h3>
              <p style={styles.securityDesc}>
                Keys auto-expire after 30 minutes of inactivity. Every console log is sanitized — 
                no credential exposure, even in developer tools.
              </p>
            </div>
            <div style={styles.securityCard}>
              <div style={styles.securityIcon}>🛡️</div>
              <h3 style={styles.securityTitle}>Trade Protection</h3>
              <p style={styles.securityDesc}>
                Built-in duplicate trade prevention. AbortController cancels duplicate requests. 
                A 1-second cooldown prevents identical trades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Section */}
      <section style={{ ...styles.section, backgroundColor: '#080c14' }}>
        <div style={styles.sectionInner}>
          <div style={styles.mobileGrid} className="about-mobile-grid">
            <div>
              <h2 style={styles.sectionTitle}>Mobile Ready</h2>
              <p style={styles.storyText}>
                Full responsive design. Touch-friendly navigation. Works on your phone, 
                your tablet, your desktop. Trade from anywhere.
              </p>
              <div style={styles.modeCards}>
                <div style={styles.modeCard}>
                  <span style={styles.modeIcon}>🟢</span>
                  <div>
                    <div style={styles.modeTitle}>Real Mode</div>
                    <div style={styles.modeDesc}>Trade with real money on your eToro account</div>
                  </div>
                </div>
                <div style={styles.modeCard}>
                  <span style={styles.modeIcon}>🔵</span>
                  <div>
                    <div style={styles.modeTitle}>Demo Mode</div>
                    <div style={styles.modeDesc}>Practice with $100,000 virtual portfolio</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={styles.mobilePhoneMock}>
              <div style={styles.phoneNotch} />
              <div style={styles.phoneScreen}>
                <div style={styles.phoneHeader}>◆ eToro Terminal</div>
                <div style={styles.phonePanel}>
                  <div style={styles.phonePanelTitle}>AAPL — $198.45</div>
                  <div style={{ color: '#00ff00', fontSize: '12px' }}>+2.31% today</div>
                </div>
                <div style={styles.phonePanel}>
                  <div style={styles.phonePanelTitle}>Portfolio</div>
                  <div style={{ color: '#00cc00', fontSize: '11px' }}>$127,450 • +3.4%</div>
                </div>
                <div style={styles.phoneNav}>
                  <span>QT</span><span>PF</span><span>CH</span><span>WL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Built This */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Who Built This</h2>
          <div style={styles.founderSection} className="about-founder-section">
            <div style={styles.founderAvatar}>YA</div>
            <div style={styles.founderInfo}>
              <h3 style={styles.founderName}>Yoni Assia</h3>
              <p style={styles.founderRole}>Founder & CEO, eToro</p>
              <p style={styles.storyText}>
                After taking eToro public on NASDAQ in 2025 at a $5.6 billion valuation, 
                Yoni asked a simple question: <em style={{ color: '#00ff00' }}>"What if every eToro user 
                had access to the same tools the professionals use?"</em>
              </p>
              <p style={styles.storyText}>
                Bloomberg costs $24,000. Refinitiv costs $22,000. FactSet costs $12,000. 
                These tools are incredible — but they're gates, not bridges. They keep 
                professional-grade analysis in the hands of the few.
              </p>
              <p style={styles.storyPunchline}>
                Professional tools shouldn't require a professional budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MoneyClaw Ecosystem */}
      <section style={{ ...styles.section, backgroundColor: '#080c14' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Part of MoneyClaw</h2>
          <p style={styles.sectionSub}>
            eToro Terminal is one piece of the MoneyClaw trading intelligence platform.
          </p>
          <div style={styles.ecosystemGrid}>
            {ecosystemApps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target={app.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={styles.ecosystemCard}
                className="about-ecosystem-card"
              >
                <div style={styles.ecosystemIcon}>{app.icon}</div>
                <div style={styles.ecosystemName}>{app.name}</div>
                <div style={styles.ecosystemDesc}>{app.desc}</div>
                <div style={{
                  ...styles.ecosystemStatus,
                  color: app.status === 'Live' ? '#00ff00' : '#ffaa00',
                }}>
                  {app.status === 'Live' ? '● ' : '○ '}{app.status}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section style={styles.section}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>Getting Started</h2>
          <p style={styles.sectionSub}>Three steps. That's it.</p>
          <div style={styles.stepsGrid}>
            {[
              { step: '1', title: 'Get your eToro API key', desc: 'Settings → Trading → API Key Management' },
              { step: '2', title: 'Enter your credentials', desc: 'Your keys stay in your browser' },
              { step: '3', title: 'Start trading', desc: 'Type any ticker and go' },
            ].map((item) => (
              <div key={item.step} style={styles.stepCard}>
                <div style={styles.stepNumber}>{item.step}</div>
                <h3 style={styles.stepTitle}>{item.title}</h3>
                <p style={styles.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={styles.ctaSection}>
            <p style={styles.ctaText}>No signup. No subscription. No catch.</p>
            <button onClick={onEnterTerminal} style={styles.primaryButton} className="about-primary-btn">
              Enter Terminal →
            </button>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section style={{ ...styles.section, backgroundColor: '#080c14' }}>
        <div style={styles.sectionInner}>
          <h2 style={styles.sectionTitle}>The Technology</h2>
          <div style={styles.techGrid}>
            {[
              { name: 'React 18', desc: 'Modern component architecture' },
              { name: 'TypeScript', desc: 'Type-safe, bug-resistant code' },
              { name: 'Vite', desc: 'Sub-second hot reload' },
              { name: 'eToro API', desc: 'Real-time data, real trades' },
            ].map((tech) => (
              <div key={tech.name} style={styles.techCard}>
                <div style={styles.techName}>{tech.name}</div>
                <div style={styles.techDesc}>{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerTop}>
            <span style={styles.footerLogo}>◆ eToro Terminal</span>
            <span style={styles.footerTagline}>Because $24,000/year for market data is ridiculous.</span>
          </div>
          <div style={styles.footerBottom}>
            <span style={styles.footerCopy}>
              Built by the founder of eToro. Free for every trader.
            </span>
            <a
              href="https://github.com/yoniassia/etoro-terminal"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerGithub}
            >
              GitHub →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0a0e1a',
    color: '#e0e0e0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflowX: 'hidden',
    scrollBehavior: 'smooth',
  },

  // Nav
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(10, 14, 26, 0.9)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 255, 0, 0.1)',
  },
  navInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLogo: {
    fontFamily: '"Courier New", monospace',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00ff00',
    letterSpacing: '1px',
  },
  navLogoIcon: {
    marginRight: '8px',
    fontSize: '18px',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: '#888',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  navCta: {
    background: '#00ff00',
    color: '#0a0e1a',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: '"Courier New", monospace',
  },

  // Hero
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 24px 60px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: '-200px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,255,0,0.08) 0%, rgba(0,255,0,0.02) 40%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    borderRadius: '100px',
    backgroundColor: 'rgba(0, 255, 0, 0.08)',
    border: '1px solid rgba(0, 255, 0, 0.2)',
    color: '#00ff00',
    fontSize: '13px',
    marginBottom: '32px',
    fontFamily: '"Courier New", monospace',
  },
  heroBadgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#00ff00',
    boxShadow: '0 0 8px #00ff00',
  },
  heroTitle: {
    fontSize: 'clamp(36px, 6vw, 72px)',
    fontWeight: 800,
    lineHeight: 1.1,
    color: '#ffffff',
    marginBottom: '24px',
    letterSpacing: '-1px',
  },
  heroTitleAccent: {
    background: 'linear-gradient(135deg, #00ff00, #00cc88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: {
    fontSize: '18px',
    lineHeight: 1.6,
    color: '#999',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    background: '#00ff00',
    color: '#0a0e1a',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: '"Courier New", monospace',
    letterSpacing: '0.5px',
    transition: 'all 0.2s',
    boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
  },
  secondaryButton: {
    background: 'transparent',
    color: '#00ff00',
    border: '1px solid rgba(0, 255, 0, 0.3)',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: '"Courier New", monospace',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s',
  },

  // Terminal Preview
  terminalPreview: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '680px',
    width: '100%',
    marginTop: '60px',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 255, 0, 0.15)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 255, 0, 0.05)',
  },
  terminalBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#1a1f2e',
    borderBottom: '1px solid #2a2f3e',
  },
  terminalDots: {
    display: 'flex',
    gap: '6px',
  },
  terminalDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  terminalBarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: '12px',
    fontFamily: '"Courier New", monospace',
  },
  terminalBody: {
    padding: '20px',
    backgroundColor: '#0d1117',
    fontFamily: '"Courier New", monospace',
    fontSize: '13px',
    lineHeight: 1.8,
    color: '#00ff00',
  },
  terminalLine: {
    marginBottom: '4px',
  },
  terminalPrompt: {
    color: '#00cc00',
    marginRight: '8px',
  },
  terminalOutput: {
    color: '#00aa00',
    marginBottom: '12px',
    opacity: 0.85,
    fontSize: '12px',
  },
  terminalCursor: {
    color: '#00ff00',
    animation: 'blink 1s infinite',
  },

  // Stats Bar
  statsBar: {
    borderTop: '1px solid rgba(0, 255, 0, 0.1)',
    borderBottom: '1px solid rgba(0, 255, 0, 0.1)',
    backgroundColor: 'rgba(0, 255, 0, 0.02)',
  },
  statsInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '24px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#00ff00',
    fontFamily: '"Courier New", monospace',
  },
  statLabel: {
    fontSize: '13px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },

  // Sections
  section: {
    padding: '100px 24px',
  },
  sectionInner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'clamp(28px, 4vw, 44px)',
    fontWeight: 800,
    color: '#ffffff',
    marginBottom: '16px',
    letterSpacing: '-0.5px',
  },
  sectionSub: {
    fontSize: '17px',
    color: '#888',
    lineHeight: 1.6,
    marginBottom: '48px',
    maxWidth: '600px',
  },

  // Story
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
  },
  storyText: {
    fontSize: '16px',
    lineHeight: 1.8,
    color: '#aaa',
    marginBottom: '16px',
  },
  storyPunchline: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#00ff00',
    margin: '24px 0',
    fontFamily: '"Courier New", monospace',
  },
  priceHighlight: {
    color: '#ff4444',
  },
  priceComparison: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  priceCompareRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  priceCompareName: {
    width: '120px',
    fontSize: '14px',
    color: '#aaa',
    textAlign: 'right',
  },
  priceCompareBarOuter: {
    flex: 1,
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  priceCompareBarInner: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 1s ease',
  },
  priceComparePrice: {
    width: '100px',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: '"Courier New", monospace',
  },

  // Panel Grid
  panelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '12px',
  },
  panelCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center',
    transition: 'all 0.2s',
    cursor: 'default',
  },
  panelCardIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  panelCardCode: {
    fontFamily: '"Courier New", monospace',
    fontSize: '13px',
    color: '#00ff00',
    fontWeight: 'bold',
    marginBottom: '4px',
    letterSpacing: '1px',
  },
  panelCardName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#ddd',
    marginBottom: '4px',
  },
  panelCardDesc: {
    fontSize: '11px',
    color: '#777',
    lineHeight: 1.4,
  },

  // Command Demo
  commandDemo: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  commandBarMock: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    backgroundColor: '#1a1f2e',
    border: '2px solid #00ff00',
    borderRadius: '8px',
    marginBottom: '32px',
    fontFamily: '"Courier New", monospace',
  },
  commandBarChevron: {
    color: '#00ff00',
    fontSize: '16px',
  },
  commandBarText: {
    color: '#00ff00',
    fontSize: '16px',
    flex: 1,
  },
  commandBarHint: {
    color: '#555',
    fontSize: '12px',
  },
  commandList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  commandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '10px 16px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '6px',
  },
  commandInput: {
    fontFamily: '"Courier New", monospace',
    color: '#00ff00',
    fontSize: '14px',
    minWidth: '120px',
    fontWeight: 'bold',
  },
  commandArrow: {
    color: '#444',
    fontSize: '14px',
  },
  commandResult: {
    color: '#999',
    fontSize: '14px',
  },

  // Feature Grid
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    padding: '28px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
  },
  featureIcon: {
    fontSize: '32px',
    marginBottom: '16px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  },
  featureDesc: {
    fontSize: '14px',
    color: '#888',
    lineHeight: 1.6,
  },

  // Security
  securityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  securityCard: {
    padding: '32px',
    backgroundColor: 'rgba(0, 255, 0, 0.02)',
    border: '1px solid rgba(0, 255, 0, 0.08)',
    borderRadius: '12px',
    textAlign: 'center',
  },
  securityIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  securityTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '12px',
  },
  securityDesc: {
    fontSize: '14px',
    color: '#888',
    lineHeight: 1.7,
  },

  // Mobile
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'center',
  },
  modeCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '24px',
  },
  modeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  modeIcon: {
    fontSize: '24px',
  },
  modeTitle: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '4px',
  },
  modeDesc: {
    fontSize: '13px',
    color: '#888',
  },
  mobilePhoneMock: {
    width: '260px',
    margin: '0 auto',
    backgroundColor: '#1a1f2e',
    borderRadius: '32px',
    padding: '12px',
    border: '2px solid #333',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  phoneNotch: {
    width: '100px',
    height: '6px',
    backgroundColor: '#333',
    borderRadius: '3px',
    margin: '4px auto 12px',
  },
  phoneScreen: {
    backgroundColor: '#0a0e1a',
    borderRadius: '20px',
    padding: '16px',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  phoneHeader: {
    fontFamily: '"Courier New", monospace',
    color: '#00ff00',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(0, 255, 0, 0.2)',
  },
  phonePanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px',
    padding: '12px',
    border: '1px solid rgba(0, 255, 0, 0.1)',
  },
  phonePanelTitle: {
    fontFamily: '"Courier New", monospace',
    color: '#00ff00',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  phoneNav: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 'auto',
    paddingTop: '12px',
    borderTop: '1px solid rgba(0, 255, 0, 0.1)',
    fontFamily: '"Courier New", monospace',
    color: '#00ff00',
    fontSize: '12px',
  },

  // Founder
  founderSection: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    maxWidth: '800px',
  },
  founderAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    border: '2px solid rgba(0, 255, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Courier New", monospace',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00ff00',
    flexShrink: 0,
  },
  founderInfo: {
    flex: 1,
  },
  founderName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '4px',
  },
  founderRole: {
    fontSize: '15px',
    color: '#00ff00',
    marginBottom: '20px',
    fontFamily: '"Courier New", monospace',
  },

  // Ecosystem
  ecosystemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  ecosystemCard: {
    padding: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'block',
    transition: 'all 0.2s',
    textAlign: 'center',
  },
  ecosystemIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  ecosystemName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  },
  ecosystemDesc: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '12px',
    lineHeight: 1.4,
  },
  ecosystemStatus: {
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: '"Courier New", monospace',
  },

  // Steps
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  stepCard: {
    padding: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    textAlign: 'center',
  },
  stepNumber: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    border: '2px solid #00ff00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontFamily: '"Courier New", monospace',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#00ff00',
  },
  stepTitle: {
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  },
  stepDesc: {
    fontSize: '14px',
    color: '#888',
    lineHeight: 1.5,
  },

  // CTA
  ctaSection: {
    textAlign: 'center',
  },
  ctaText: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '24px',
    fontFamily: '"Courier New", monospace',
  },

  // Tech
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  techCard: {
    padding: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  techName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: '8px',
    fontFamily: '"Courier New", monospace',
  },
  techDesc: {
    fontSize: '14px',
    color: '#888',
  },

  // Footer
  footer: {
    borderTop: '1px solid rgba(0, 255, 0, 0.1)',
    padding: '40px 24px',
    backgroundColor: '#060a12',
  },
  footerInner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  footerLogo: {
    fontFamily: '"Courier New", monospace',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00ff00',
  },
  footerTagline: {
    fontSize: '14px',
    color: '#666',
    fontStyle: 'italic',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  footerCopy: {
    fontSize: '13px',
    color: '#555',
  },
  footerGithub: {
    color: '#00ff00',
    textDecoration: 'none',
    fontSize: '14px',
    fontFamily: '"Courier New", monospace',
  },
};
