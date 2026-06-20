"use client";

import React, { useState } from 'react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('CRM');

  const tabs = ['AI', 'Meme', 'RWA', 'L2', 'DeFi'];

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
      <div className="absolute top-[300px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CDFC74]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a09]/75 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-sans text-2xl font-semibold text-stone-100 tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CDFC74] rounded-full inline-block"></span>
            Narrative
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400">
            <a href="#product" className="hover:text-stone-100">Product</a>
            <a href="/dashboard" className="text-[#CDFC74] hover:text-white transition-colors">Rotator Dashboard</a>
            <a href="#" className="hover:text-stone-100">Case studies</a>
            <a href="#" className="hover:text-stone-100">Pricing</a>
            <a href="#" className="hover:text-stone-100">Blog</a>
            <a href="#" className="hover:text-stone-100">About</a>
            <a href="#" className="hover:text-stone-100">Contact</a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <a href="#" className="text-stone-400 hover:text-stone-100">Login</a>
            <a href="/dashboard" className="bg-[#CDFC74] text-stone-950 px-5 py-2.5 rounded-full hover:bg-white transition-all duration-300 font-semibold">
              Launch App
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="w-full max-w-[1240px] h-auto min-h-[600px] mx-auto px-6 relative flex flex-col items-center justify-center text-center select-none pt-40 pb-20">
        <div className="max-w-[780px] z-20 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-full px-4 py-1.5 text-xs text-stone-400 mb-8 shadow-inner animate-pulse">
            <div className="flex text-amber-400">★★★★★</div>
            <span>Audited & Active</span>
          </div>

          <h1 className="font-sans text-5xl md:text-7xl font-semibold text-stone-100 tracking-tight leading-[1.08] mb-6">
            Autonomous Crypto Portfolio Management
          </h1>

          <p className="text-base md:text-xl text-stone-400 font-light leading-relaxed max-w-[620px] mb-10">
            AI-powered narrative rotator that scans market sentiment across sectors and autonomously rotates your portfolio to capture emerging trends
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a href="/dashboard" className="w-full sm:w-auto bg-stone-100 text-stone-950 px-8 py-3.5 rounded-full font-medium hover:bg-stone-200 transition-all duration-300 shadow-lg text-center">
              Launch Dashboard
            </a>
            <a href="/dashboard" className="w-full sm:w-auto bg-stone-900 border border-stone-800 hover:border-stone-700 hover:bg-stone-850 text-stone-200 px-8 py-3.5 rounded-full font-medium transition-all duration-300 text-center">
              Live Monitor
            </a>
          </div>
        </div>

        {/* Floating characters */}
        <div className="absolute w-[140px] h-[140px] pointer-events-none hidden lg:block animate-bounce" style={{ left: '159.4px', top: '61px', animationDuration: '6s' }}>
          <img src="/assets/character_lottie_1.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[56px] h-[56px] pointer-events-none hidden lg:block animate-pulse" style={{ left: '659.16px', top: '0px', animationDuration: '8s' }}>
          <img src="/assets/character_1_82.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[169px] h-[169px] pointer-events-none hidden lg:block animate-bounce" style={{ left: '985px', top: '119.5px', animationDuration: '5s' }}>
          <img src="/assets/character_1_42.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[178px] h-[235px] pointer-events-none hidden lg:block animate-pulse" style={{ left: '893.7px', top: '407.5px', animationDuration: '7s' }}>
          <img src="/assets/character_1_39.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[73px] h-[73px] pointer-events-none hidden lg:block animate-bounce" style={{ left: '313.8px', top: '468.7px', animationDuration: '5.5s' }}>
          <img src="/assets/character_1_85.png" alt="Character" className="w-full h-full object-contain" />
        </div>
      </header>

      {/* PRODUCT SECTION */}
      <section id="product" className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20">
        {/* Tabs and Large Mockup */}
        <div className="w-full flex flex-col items-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3 bg-stone-900/60 p-2.5 rounded-2xl border border-stone-800/80 mb-12">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'text-stone-100 bg-stone-800 shadow-md' 
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${activeTab === tab ? 'bg-[#CDFC74]' : 'bg-stone-700'}`}></span>
                {tab}
              </button>
            ))}
          </div>

          <div className="w-full max-w-[1200px] bg-stone-950 border border-stone-800 rounded-[32px] overflow-hidden relative shadow-2xl min-h-[450px] md:min-h-[600px] flex items-center justify-center">
            <img src="/assets/asset_1_579.png" alt="Dashboard Mockup" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 animate-fade-in">
              <img src="/assets/asset_1_582.png" alt="Project Details Overlay" className="max-w-full max-h-full object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="w-full bg-[#292524] rounded-[32px] p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-[#1c1917] rounded-2xl p-8 flex flex-col justify-between min-h-[380px] hover:border-stone-700 border border-transparent transition-all duration-300">
              <div>
                <div className="w-16 h-16 mb-8">
                  <img src="/assets/asset_1_591.png" alt="Real-Time Sentiment Icon" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-sans text-2xl font-semibold text-stone-100 mb-4">Real-Time Sentiment</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">
                  Scans CMC news, social media, and KOL sentiment every cycle to detect emerging narratives before they trend.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#121212] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between min-h-[380px] hover:border-stone-700 border border-transparent transition-all duration-300 overflow-hidden relative">
              <div className="max-w-[220px] flex flex-col justify-between h-full z-10">
                <div>
                  <div className="w-16 h-16 mb-8">
                    <img src="/assets/asset_1_606.png" alt="Autonomous Execution Icon" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-sans text-2xl font-semibold text-stone-100 mb-4">Autonomous Execution</h3>
                  <p className="text-stone-400 text-sm leading-relaxed font-light mb-6 md:mb-0">
                    Trust Wallet Agent Kit executes swaps automatically based on risk-adjusted allocation targets, with optional manual approval.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-[267px] h-[340px] md:h-[400px] flex items-center justify-center md:absolute md:right-4 md:bottom-0">
                <img src="/assets/asset_1_618.png" alt="Trade Execution Interface" className="w-full h-full object-contain object-bottom" />
              </div>
            </div>

            <div className="bg-[#1c1917] rounded-2xl p-8 flex flex-col justify-between min-h-[380px] hover:border-stone-700 border border-transparent transition-all duration-300">
              <div>
                <div className="w-16 h-16 mb-8">
                  <img src="/assets/asset_1_624.png" alt="On-Chain Identity Icon" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-sans text-2xl font-semibold text-stone-100 mb-4">On-Chain Identity</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">
                  ERC-8004 agent identity registered on BNB Chain with sponsored gas via Megafuel paymaster for gasless operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS BANNER */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-normal text-stone-300 tracking-tight">Trusted by leading Web3 Protocols</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {['Uniswap', 'Arbitrum', 'Chainlink', 'PancakeSwap', 'Aave', 'The Graph', 'Optimism', 'BNB Chain'].map((name, i) => (
            <div key={i} className="bg-[#292524] rounded-2xl h-[74px] flex items-center justify-center border border-stone-800/80 hover:border-stone-700 transition-colors duration-200">
              <span className="text-stone-400 font-sans text-xl font-bold tracking-tight opacity-80 hover:opacity-100 transition-opacity">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE LIST */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20 flex flex-col gap-10">
        <div className="mb-6 text-left">
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight leading-tight max-w-[780px]">Autonomous sector rotation powered by AI</h2>
        </div>

        {/* Feature 1 */}
        <div className="bg-[#292524] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[580px] hover:border-stone-700 border border-transparent transition-all duration-300">
          <div className="flex-1 flex flex-col justify-between h-full max-w-[540px]">
            <div>
              <h3 className="font-sans text-3xl md:text-4xl font-semibold text-stone-100 mb-6">Narrative Heat Tracking</h3>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                Real-time sentiment analysis across AI, Meme, RWA, L2, and DeFi sectors using CMC Agent Hub data, Fear & Greed index, and social metrics to detect which narratives are gaining momentum.
              </p>
              <div className="flex flex-col gap-3.5 mb-10">
                {['AI Sector', 'Meme Momentum', 'RWA Tokenization', 'DeFi & L2'].map((item, i) => (
                  <div key={i} className="inline-flex items-center gap-3 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-6 w-fit border border-stone-800">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-stone-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="/dashboard" className="w-fit bg-stone-100 text-stone-950 px-6 py-2.5 rounded-full font-medium hover:bg-stone-200 transition-all duration-300 shadow-md">View live heats</a>
          </div>
          <div className="flex-1 max-w-[540px] w-full flex items-center justify-center">
            <img src="/assets/task_board_interface.png" alt="Narrative Heat Dashboard" className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl" />
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#292524] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[580px] hover:border-stone-700 border border-transparent transition-all duration-300">
          <div className="flex-1 flex flex-col justify-between h-full max-w-[540px]">
            <div>
              <h3 className="font-sans text-3xl md:text-4xl font-semibold text-stone-100 mb-6">Automated Portfolio Rotation</h3>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                The decision engine calculates risk-adjusted target allocations based on sector heat indexes. When a narrative crosses the trigger threshold, the agent automatically rotates capital into the trending sector via Trust Wallet swaps.
              </p>
              <div className="flex flex-col gap-3.5 mb-10">
                {['Risk Limits', 'Auto Trade', 'Slippage Control'].map((item, i) => (
                  <div key={i} className="inline-flex items-center gap-3 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-6 w-fit border border-stone-800">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-stone-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="/dashboard" className="w-fit bg-stone-100 text-stone-950 px-6 py-2.5 rounded-full font-medium hover:bg-stone-200 transition-all duration-300 shadow-md">Monitor rotations</a>
          </div>
          <div className="flex-1 max-w-[540px] w-full flex items-center justify-center">
            <img src="/assets/project_list_interface.png" alt="Portfolio Rotation Dashboard" className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl" />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#292524] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[580px] hover:border-stone-700 border border-transparent transition-all duration-300">
          <div className="flex-1 flex flex-col justify-between h-full max-w-[540px]">
            <div>
              <h3 className="font-sans text-3xl md:text-4xl font-semibold text-stone-100 mb-6">On-Chain Execution</h3>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-8 font-light">
                Every trade is signed locally and broadcasted to BNB Chain via TWAK. Transactions settle on PancakeSwap V3 with configurable slippage and MEV protection.
              </p>
              <div className="flex flex-col gap-3.5 mb-10">
                {['Self-Custody Signing', 'x402 Gas Sponsorship', 'ERC-8004 Identity'].map((item, i) => (
                  <div key={i} className="inline-flex items-center gap-3 bg-stone-950 rounded-full py-1.5 pl-1.5 pr-6 w-fit border border-stone-800">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-stone-950" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-stone-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="/dashboard" className="w-fit bg-stone-100 text-stone-950 px-6 py-2.5 rounded-full font-medium hover:bg-stone-200 transition-all duration-300 shadow-md">View portfolio</a>
          </div>
          <div className="flex-1 max-w-[540px] w-full flex items-center justify-center">
            <img src="/assets/analytical_dashboard.png" alt="Portfolio Dashboard" className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold text-stone-100 tracking-tight leading-tight mb-4">Trusted by traders worldwide</h2>
          <p className="text-stone-400 text-base max-w-[600px] mx-auto font-light">See what our users say about autonomous portfolio management</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Linda Smith', role: 'DeFi Trader', avatar: '/assets/avatar_linda.png', text: 'The narrative rotation caught the AI trend before it exploded. I would have missed it entirely without this tool.' },
            { name: 'David Harper', role: 'Crypto Fund Manager', avatar: '/assets/avatar_david.png', text: 'We integrated Narrative Rotator into our fund strategy. The automated rebalancing saves us hours of manual analysis daily.' },
            { name: 'Daniel Carter', role: 'Independent Investor', avatar: '/assets/avatar_daniel.png', text: 'Finally, an agent that actually executes. I set my risk parameters and let it run. No more emotional trading.' },
            { name: 'Natalie Collins', role: 'Web3 Developer', avatar: '/assets/avatar_natalie.png', text: 'The self-custody approach is what sold me. My keys, my agent, my rules. TWAK integration is seamless.' },
            { name: 'Michael Turner', role: 'Risk Analyst', avatar: '/assets/avatar_michael.png', text: 'Drawdown limits actually work. I sleep better knowing the agent stops trading when conditions turn.' },
            { name: 'Alexander Reed', role: 'Crypto Researcher', avatar: '/assets/avatar_alexander.png', text: 'The sector heat maps give me insights I never had access to before. Game changer for narrative analysis.' }
          ].map((t, i) => (
            <div key={i} className="bg-[#292524] rounded-2xl p-6 border border-stone-800/80 hover:border-stone-700 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-stone-200 text-sm font-medium">{t.name}</p>
                  <p className="text-stone-500 text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed font-light">"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTEGRATIONS CTA */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20">
        <div className="bg-gradient-to-br from-stone-900 to-[#292524] rounded-[32px] p-8 md:p-16 border border-stone-800/60 overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-100 mb-4">Seamless integration with your existing stack</h2>
              <p className="text-stone-400 text-base mb-8 font-light max-w-[500px]">
                Connect your existing wallets and tools. The Narrative Rotator agent works alongside your current DeFi workflow.
              </p>
              <a href="/dashboard" className="inline-block bg-[#CDFC74] text-stone-950 px-8 py-3.5 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg">Get Started Free</a>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img src="/assets/cta_center_lottie.png" alt="Integration Graphic" className="w-full max-w-[400px] h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="w-full max-w-[1240px] mx-auto px-6 py-20 relative z-20 text-center">
        <h2 className="text-4xl md:text-6xl font-semibold text-stone-100 tracking-tight leading-[1.1] mb-6 max-w-[700px] mx-auto">
          Ready to automate your crypto portfolio?
        </h2>
        <p className="text-stone-400 text-base md:text-lg max-w-[550px] mx-auto mb-10 font-light">
          Join thousands of traders using AI-powered narrative rotation to capture emerging trends before they go mainstream.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/dashboard" className="bg-stone-100 text-stone-950 px-8 py-3.5 rounded-full font-medium hover:bg-stone-200 transition-all duration-300 shadow-lg">Launch Dashboard</a>
          <a href="#" className="bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-200 px-8 py-3.5 rounded-full font-medium transition-all duration-300">Documentation</a>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <img src="/assets/footer_cta_mockup.png" alt="App Mockup" className="w-full max-w-[800px] h-auto object-contain" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full max-w-[1240px] mx-auto px-6 py-12 relative z-20 border-t border-stone-800/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CDFC74] rounded-full"></span>
            <span className="text-stone-300 font-medium">Narrative</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-300">Privacy</a>
            <a href="#" className="hover:text-stone-300">Terms</a>
            <a href="#" className="hover:text-stone-300">Docs</a>
            <a href="#" className="hover:text-stone-300">Support</a>
          </div>
          <div className="text-xs text-stone-500">2026 Narrative. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
