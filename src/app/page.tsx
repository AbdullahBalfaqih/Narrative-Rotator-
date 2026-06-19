"use client";

import React from 'react';

export default function LandingPage() {
  return (
    <div className="font-sans text-stone-300 min-h-screen flex flex-col justify-between relative bg-[#0c0a09] overflow-x-hidden">
      {/* Premium subtle grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Background Ambient Glow */}
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#CDFC74]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a09]/75 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-sans text-2xl font-semibold text-stone-100 tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CDFC74] rounded-full inline-block"></span>
            Narrative Rotator
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
            <a href="#stack" className="hover:text-stone-100">Stack</a>
            <a href="#tracks" className="hover:text-stone-100">Tracks</a>
            <a href="#prizes" className="hover:text-stone-100">Prizes</a>
            <a href="#timeline" className="hover:text-stone-100">Timeline</a>
            <a href="/dashboard" className="text-[#CDFC74] hover:text-white transition-colors">Dashboard</a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <a href="https://t.me/+MhiOLT0YUnlmNWFk" target="_blank" className="text-stone-400 hover:text-stone-100">Telegram</a>
            <a href="/dashboard" className="bg-[#CDFC74] text-stone-950 px-5 py-2.5 rounded-full hover:bg-white transition-all duration-300 font-semibold">
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="w-full max-w-[1240px] mx-auto px-6 relative flex flex-col items-center justify-center text-center select-none pt-40 pb-16">
        <div className="max-w-[860px] z-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-full px-5 py-2 text-xs text-stone-400 mb-8">
            <span className="w-2 h-2 bg-[#CDFC74] rounded-full animate-pulse"></span>
            BNB Hack: AI Trading Agent Edition — Live Competition
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold text-stone-100 tracking-tight leading-[1.08] mb-6">
            Autonomous AI Agent for<br />
            <span className="text-[#CDFC74]">Narrative Rotation</span> on BSC
          </h1>

          <p className="text-base md:text-xl text-stone-400 font-light leading-relaxed max-w-[680px] mb-8">
            An AI-powered trading agent that scans market sentiment across sectors, detects emerging narratives, and autonomously rotates your portfolio via Trust Wallet — competing live in the BNB Hack Track 1.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="bg-stone-900 border border-stone-700 rounded-full px-4 py-1.5 text-sm text-stone-300">CMC Agent Hub</span>
            <span className="bg-stone-900 border border-stone-700 rounded-full px-4 py-1.5 text-sm text-stone-300">TWAK Self-Custody</span>
            <span className="bg-stone-900 border border-stone-700 rounded-full px-4 py-1.5 text-sm text-stone-300">BNB AI Agent SDK</span>
            <span className="bg-stone-900 border border-stone-700 rounded-full px-4 py-1.5 text-sm text-stone-300">x402 Payments</span>
            <span className="bg-stone-900 border border-stone-700 rounded-full px-4 py-1.5 text-sm text-stone-300">ERC-8004 Identity</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard" className="bg-stone-100 text-stone-950 px-8 py-3.5 rounded-full font-medium hover:bg-stone-200 transition-all duration-300 shadow-lg text-center">
              Launch Dashboard
            </a>
            <a href="https://github.com" target="_blank" className="bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-200 px-8 py-3.5 rounded-full font-medium transition-all duration-300 text-center">
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Prize Highlight Strip */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-12 relative z-20">
        <div className="bg-[#292524] rounded-[32px] p-8 md:p-12 border border-stone-800/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-[#CDFC74]">$36,000</p>
              <p className="text-stone-400 text-sm mt-2">Total Prize Pool</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white">2</p>
              <p className="text-stone-400 text-sm mt-2">Competition Tracks</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white">8</p>
              <p className="text-stone-400 text-sm mt-2">Winning Teams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Build Here */}
      <section id="stack" className="w-full max-w-[1240px] mx-auto px-6 py-16 relative z-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight leading-tight mb-4">Why build here</h2>
          <p className="text-stone-400 text-base max-w-[680px] mx-auto font-light">
            AI agents are eating crypto. Every team rebuilds the same data and execution layer before writing agent logic. Our stack removes that step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1c1917] rounded-2xl p-8 min-h-[280px] border border-transparent hover:border-stone-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#CDFC74]/10 flex items-center justify-center mb-6">
              <span className="text-[#CDFC74] text-xl font-bold">CM</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-100 mb-3">CMC Agent Hub</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Agent-native crypto data across CEX, derivatives, on-chain, social, KOLs, and news. MCP, x402, CLI, and a growing Skills library.
            </p>
          </div>

          <div className="bg-[#1c1917] rounded-2xl p-8 min-h-[280px] border border-transparent hover:border-stone-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#CDFC74]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#CDFC74]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-stone-100 mb-3">Trust Wallet Agent Kit</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Self-custody local signing across 30+ chains with MCP, REST, CLI, and LangChain coverage. Native x402 support built in.
            </p>
          </div>

          <div className="bg-[#1c1917] rounded-2xl p-8 min-h-[280px] border border-transparent hover:border-stone-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#CDFC74]/10 flex items-center justify-center mb-6">
              <span className="text-[#CDFC74] text-xl font-bold">B</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-100 mb-3">BNB AI Agent SDK</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              The fastest path from idea to a working agent on BSC. On-chain identity registration, agent wallet, and execution primitives.
            </p>
          </div>

          <div className="bg-[#1c1917] rounded-2xl p-8 min-h-[280px] border border-transparent hover:border-stone-700 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#CDFC74]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#CDFC74]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-stone-100 mb-3">BNB Chain</h3>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Fast blocks, cheap gas, and the ecosystem moving fastest on agents right now. Live trading on BSC during competition week.
            </p>
          </div>
        </div>
      </section>

      {/* Two Tracks */}
      <section id="tracks" className="w-full max-w-[1240px] mx-auto px-6 py-16 relative z-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight leading-tight mb-4">Two tracks. One prize pool.</h2>
          <p className="text-stone-400 text-base max-w-[680px] mx-auto font-light">Pick your path. Both share a $36,000 prize pool.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Track 1 */}
          <div className="bg-[#292524] rounded-[24px] p-8 md:p-10 border border-stone-800/80 hover:border-[#CDFC74]/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Track 1. Autonomous Trading</h3>
                <p className="text-[#CDFC74] text-sm font-medium">$24,000 — 5 winners</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Powered by CMC + Trust Wallet + BNB AI Agent SDK. Build an agent that reads markets and acts on them. 
              Natural-language strategy in, on-chain execution out. Your agent reads markets via CMC, decides, 
              and signs its own transactions via TWAK, all within rules you set. Then it trades live on BSC 
              during competition week, scored on real PnL.
            </p>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-5 w-fit border border-stone-800">
                <div className="w-6 h-6 rounded-full bg-[#CDFC74] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-stone-300 text-xs">Live PnL scoring on BSC</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-5 w-fit border border-stone-800">
                <div className="w-6 h-6 rounded-full bg-[#CDFC74] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-stone-300 text-xs">Self-custody signing via TWAK</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-5 w-fit border border-stone-800">
                <div className="w-6 h-6 rounded-full bg-[#CDFC74] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-stone-300 text-xs">x402 for data &amp; inference payments</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-stone-950 rounded-xl border border-stone-800">
              <p className="text-stone-400 text-xs font-medium mb-2">Our entry: Narrative Rotator</p>
              <p className="text-stone-300 text-sm font-light">
                AI agent scanning sentiment across AI, Meme, RWA, L2, and DeFi sectors — 
                autonomously rotating capital via TWAK swaps when narrative heat crosses 
                configurable thresholds. Registered via <code className="text-[#CDFC74]">twak compete register</code>.
              </p>
            </div>
          </div>

          {/* Track 2 */}
          <div className="bg-[#292524] rounded-[24px] p-8 md:p-10 border border-stone-800/80 hover:border-stone-700 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Track 2. Strategy Skills</h3>
                <p className="text-amber-400 text-sm font-medium">$6,000 — 3 winners</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Powered by CMC. Lower entry bar, no execution layer required. Build a CMC Skill that turns market data into 
              a trading strategy. Your deliverable is a backtestable strategy spec, not a live-trading agent. 
              Think Quantopian-style strategy generation, adapted to crypto and authored as an LLM Skill.
            </p>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-5 w-fit border border-stone-800">
                <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-stone-300 text-xs">No execution layer needed</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-5 w-fit border border-stone-800">
                <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-stone-300 text-xs">Backtestable strategy spec</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-5 w-fit border border-stone-800">
                <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-stone-300 text-xs">Authored as an LLM Skill</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Prizes */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-12 relative z-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-100 tracking-tight">Special Prizes</h2>
          <p className="text-stone-400 text-sm mt-2">Three cross-track bonuses, $2,000 each</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1c1917] rounded-2xl p-6 border border-stone-800/80 text-center">
            <p className="text-[#CDFC74] font-bold text-lg mb-2">Best Use of TWAK</p>
            <p className="text-stone-400 text-xs font-light">Deepest self-custody signing, autonomous-mode execution, and native x402 integration</p>
          </div>
          <div className="bg-[#1c1917] rounded-2xl p-6 border border-stone-800/80 text-center">
            <p className="text-[#CDFC74] font-bold text-lg mb-2">Best Use of Agent Hub</p>
            <p className="text-stone-400 text-xs font-light">Most inventive use of CMC data via MCP, x402, CLI, and pre-built Skills</p>
          </div>
          <div className="bg-[#1c1917] rounded-2xl p-6 border border-stone-800/80 text-center">
            <p className="text-[#CDFC74] font-bold text-lg mb-2">Best Use of BNB SDK</p>
            <p className="text-stone-400 text-xs font-light">Most inventive integration of the BNB AI Agent SDK into your agent</p>
          </div>
        </div>
      </section>

      {/* Prize Breakdown */}
      <section id="prizes" className="w-full max-w-[1240px] mx-auto px-6 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#292524] rounded-[24px] p-8 border border-stone-800/80">
            <h3 className="text-2xl font-semibold text-stone-100 mb-6">Track 1 — $24,000</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">1st Place</span>
                <span className="text-[#CDFC74] font-bold text-lg">$10,000</span>
              </div>
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">2nd Place</span>
                <span className="text-stone-100 font-bold text-lg">$6,000</span>
              </div>
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">3rd Place</span>
                <span className="text-stone-100 font-bold text-lg">$4,000</span>
              </div>
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">4th Place</span>
                <span className="text-stone-100 font-bold text-lg">$2,000</span>
              </div>
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">5th Place</span>
                <span className="text-stone-100 font-bold text-lg">$2,000</span>
              </div>
            </div>
          </div>

          <div className="bg-[#292524] rounded-[24px] p-8 border border-stone-800/80">
            <h3 className="text-2xl font-semibold text-stone-100 mb-6">Track 2 — $6,000</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">1st Place</span>
                <span className="text-amber-400 font-bold text-lg">$3,000</span>
              </div>
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">2nd Place</span>
                <span className="text-stone-100 font-bold text-lg">$2,000</span>
              </div>
              <div className="flex items-center justify-between bg-stone-950 rounded-xl px-6 py-4 border border-stone-800">
                <span className="text-stone-200 font-medium">3rd Place</span>
                <span className="text-stone-100 font-bold text-lg">$1,000</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-stone-950 rounded-xl border border-stone-800">
              <p className="text-stone-400 text-sm font-light">
                Plus <span className="text-[#CDFC74]">three $2,000 special prizes</span> for Best Use of TWAK, Agent Hub, and BNB SDK. 
                Top projects also get CMC Pro API credits, CMC Labs mentorship, and BNB Chain Kickstart eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="w-full max-w-[1240px] mx-auto px-6 py-16 relative z-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight mb-4">Timeline</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#292524] rounded-2xl p-6 border border-stone-800/80 text-center">
            <div className="text-[#CDFC74] font-bold text-lg mb-1">June 3</div>
            <div className="text-stone-400 text-xs font-medium uppercase tracking-wide">Registration Opens</div>
          </div>
          <div className="bg-[#292524] rounded-2xl p-6 border border-stone-800/80 text-center">
            <div className="text-stone-100 font-bold text-lg mb-1">June 3 – 21</div>
            <div className="text-stone-400 text-xs font-medium uppercase tracking-wide">Build Window</div>
          </div>
          <div className="bg-[#292524] rounded-2xl p-6 border border-[#CDFC74]/30 text-center ring-1 ring-[#CDFC74]/20">
            <div className="text-[#CDFC74] font-bold text-lg mb-1">June 22 – 28</div>
            <div className="text-stone-400 text-xs font-medium uppercase tracking-wide">Live Trading</div>
            <div className="inline-block mt-2 text-[10px] bg-[#CDFC74]/10 text-[#CDFC74] px-2 py-0.5 rounded-full">We are here</div>
          </div>
          <div className="bg-[#292524] rounded-2xl p-6 border border-stone-800/80 text-center">
            <div className="text-stone-100 font-bold text-lg mb-1">June 29 – July 5</div>
            <div className="text-stone-400 text-xs font-medium uppercase tracking-wide">Judging</div>
          </div>
          <div className="bg-[#292524] rounded-2xl p-6 border border-stone-800/80 text-center">
            <div className="text-stone-100 font-bold text-lg mb-1">July 6</div>
            <div className="text-stone-400 text-xs font-medium uppercase tracking-wide">Winners Announced</div>
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-12 relative z-20">
        <div className="bg-[#292524] rounded-[32px] p-8 md:p-12 border border-stone-800/60">
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-100 mb-8 text-center">How we are judged</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="text-stone-200 font-medium mb-1">Technical Execution</h4>
              <p className="text-stone-400 text-xs">Does it work? Is the on-chain piece real?</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              </div>
              <h4 className="text-stone-200 font-medium mb-1">Originality</h4>
              <p className="text-stone-400 text-xs">New take on a real problem?</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-stone-200 font-medium mb-1">Real-World Relevance</h4>
              <p className="text-stone-400 text-xs">Clear user, plausible adoption path?</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-stone-200 font-medium mb-1">Demo &amp; Presentation</h4>
              <p className="text-stone-400 text-xs">Clear demo with on-chain proof?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20">
        <div className="bg-gradient-to-br from-stone-900 to-[#292524] rounded-[32px] p-8 md:p-16 border border-stone-800/60 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-stone-100 mb-4">Ready to compete?</h2>
          <p className="text-stone-400 text-base max-w-[560px] mx-auto mb-8 font-light">
            Narrative Rotator is registered on-chain and trading live. Track our performance, 
            explore the architecture, and build your own.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/dashboard" className="bg-[#CDFC74] text-stone-950 px-8 py-3.5 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg">
              Live Dashboard
            </a>
            <a href="https://t.me/+MhiOLT0YUnlmNWFk" target="_blank" className="bg-stone-800 border border-stone-700 hover:border-stone-600 text-stone-200 px-8 py-3.5 rounded-full font-medium transition-all duration-300">
              Join Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-[1240px] mx-auto px-6 py-12 relative z-20 border-t border-stone-800/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CDFC74] rounded-full"></span>
            <span className="text-stone-300 font-medium">Narrative Rotator</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <span>Built for BNB Hack 2026</span>
            <span>·</span>
            <a href="https://coinmarketcap.com/api/agent" target="_blank" className="hover:text-stone-300">CMC Agent Hub</a>
            <span>·</span>
            <a href="https://portal.trustwallet.com" target="_blank" className="hover:text-stone-300">Trust Wallet</a>
            <span>·</span>
            <a href="https://github.com/bnb-chain/bnbagent-sdk" target="_blank" className="hover:text-stone-300">BNB SDK</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500">Built by BNB Chain, CoinMarketCap, and Trust Wallet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
