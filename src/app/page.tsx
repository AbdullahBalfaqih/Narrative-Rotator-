"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('CRM');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-card').forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const tabs = ['AI', 'Meme', 'RWA', 'L2', 'DeFi'];

  return (
    <div ref={pageRef} className="font-sans text-stone-300 min-h-screen flex flex-col justify-between relative bg-[#0c0a09] overflow-x-hidden">
      <SmoothCursor />
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
      <nav className="fixed top-8 left-0 right-0 z-50 px-6 md:px-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <a href="#" className="font-sans text-2xl font-semibold text-stone-100 tracking-tight flex items-center gap-2">
            <img src="/icon.png" alt="Narrative Logo" className="w-8 h-8 object-contain" />
            Narrative
          </a>

          {/* Links (Central Box) */}
          <div className="hidden lg:flex items-center gap-8 bg-[#1c1917] border border-stone-800/80 rounded-xl px-8 py-3.5 shadow-xl backdrop-blur-md text-sm font-medium text-stone-400">
            <a href="#product" className="hover:text-stone-100 transition-colors">Product</a>
            <a href="/dashboard" className="text-[#CDFC74] hover:text-white transition-colors">Rotator Dashboard</a>
            <a href="#" className="hover:text-stone-100 transition-colors">Case studies</a>
            <a href="#" className="hover:text-stone-100 transition-colors">Pricing</a>
            <a href="#" className="hover:text-stone-100 transition-colors">Blog</a>
            <a href="#" className="hover:text-stone-100 transition-colors">About</a>
            <a href="#" className="hover:text-stone-100 transition-colors">Contact</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
            <a href="#" className="text-stone-400 hover:text-stone-100 hidden md:block transition-colors">Login</a>
            <a href="/dashboard" className="bg-[#CDFC74] text-stone-950 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-white transition-all duration-300 font-semibold shadow-lg">
              Launch App
            </a>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="lg:hidden flex items-center justify-center p-2 text-stone-300 hover:text-white pointer-events-auto"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden absolute top-full left-4 right-4 mt-4 bg-[#1c1917] border border-stone-800/80 rounded-2xl shadow-2xl backdrop-blur-xl p-4 flex flex-col gap-2 origin-top transition-all duration-400 ease-in-out ${showMobileMenu ? 'opacity-100 scale-y-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-y-90 pointer-events-none -translate-y-5'}`}>
            <a href="#product" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">Product</a>
            <a href="/dashboard" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-[#CDFC74] hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">Rotator Dashboard</a>
            <a href="#" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">Case studies</a>
            <a href="#" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">Pricing</a>
            <a href="#" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">Blog</a>
            <a href="#" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">About</a>
            <a href="#" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">Contact</a>
            <div className="w-full h-px bg-stone-800/80 my-2"></div>
            <a href="#" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 text-center text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors font-medium">Login</a>
          </div>
      </nav>

      {/* HERO SECTION */}
      <header className="w-full max-w-[1240px] h-auto min-h-[900px] mx-auto px-6 relative flex flex-col items-center justify-center text-center select-none pt-[220px] pb-32">
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
        <div className="absolute w-[140px] h-[140px] pointer-events-none hidden lg:flex items-center justify-center animate-bounce" style={{ left: '159.4px', top: '131px', animationDuration: '6s' }}>
          <img src="/assets/character_lottie_1.png" alt="Character" className="w-full h-full object-contain absolute inset-0" />
          <svg className="w-14 h-14 relative z-10 text-[#42500c] animate-face-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 10 Q7.5 7 10 10" />
            <path d="M14 10 Q16.5 7 19 10" />
            <path d="M8.5 15 Q12 18.5 15.5 15" />
          </svg>
        </div>
        <div className="absolute w-[56px] h-[56px] pointer-events-none hidden lg:block animate-pulse" style={{ left: '659.16px', top: '20px', animationDuration: '8s' }}>
          <img src="/assets/character_1_82.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[169px] h-[169px] pointer-events-none hidden lg:block animate-bounce" style={{ left: '985px', top: '159.5px', animationDuration: '5s' }}>
          <img src="/assets/character_1_42.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[178px] h-[235px] pointer-events-none hidden lg:block animate-pulse" style={{ left: '893.7px', top: '507.5px', animationDuration: '7s' }}>
          <img src="/assets/character_1_39.png" alt="Character" className="w-full h-full object-contain" />
        </div>
        <div className="absolute w-[73px] h-[73px] pointer-events-none hidden lg:block animate-bounce" style={{ left: '313.8px', top: '588.7px', animationDuration: '5.5s' }}>
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
            <div className="bg-[#1c1917] rounded-2xl p-8 flex flex-col justify-between min-h-[380px] hover:border-stone-700 border border-transparent transition-all duration-300 gsap-card">
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

            <div className="lg:col-span-2 bg-[#121212] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between min-h-[380px] hover:border-stone-700 border border-transparent transition-all duration-300 overflow-hidden relative gsap-card">
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

            <div className="bg-[#1c1917] rounded-2xl p-8 flex flex-col justify-between min-h-[380px] hover:border-stone-700 border border-transparent transition-all duration-300 gsap-card">
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
            <div key={i} className="bg-[#292524] rounded-2xl h-[74px] flex items-center justify-center border border-stone-800/80 hover:border-stone-700 transition-colors duration-200 gsap-card">
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
        <div className="bg-[#292524] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[580px] hover:border-stone-700 border border-transparent transition-all duration-300 gsap-card">
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
        <div className="bg-[#292524] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[580px] hover:border-stone-700 border border-transparent transition-all duration-300 gsap-card">
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
        <div className="bg-[#292524] rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[580px] hover:border-stone-700 border border-transparent transition-all duration-300 gsap-card">
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
            <div key={i} className="bg-[#292524] rounded-2xl p-6 border border-stone-800/80 hover:border-stone-700 transition-all duration-300 gsap-card">
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
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes rock-motion {
            0%, 100% { transform: rotate(15deg); }
            50% { transform: rotate(-15deg); }
          }
          .animate-rock {
            animation: rock-motion 4s ease-in-out infinite;
          }
          @keyframes face-float {
            0%, 100% { transform: translateY(-4px); }
            50% { transform: translateY(4px); }
          }
          .animate-face-float {
            animation: face-float 3s ease-in-out infinite;
          }
        `}} />
        <div className="bg-gradient-to-br from-stone-900 to-[#292524] rounded-[32px] p-8 md:p-16 border border-stone-800/60 overflow-hidden relative gsap-card">
          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-100 mb-4">Seamless integration with your existing stack</h2>
              <p className="text-stone-400 text-base mb-8 font-light max-w-[500px]">
                Connect your existing wallets and tools. The Narrative Rotator agent works alongside your current DeFi workflow.
              </p>
              <a href="/dashboard" className="inline-block bg-[#CDFC74] text-stone-950 px-8 py-3.5 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg">Get Started Free</a>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative flex items-center justify-center w-full max-w-[360px] aspect-square">
                <img src="/assets/cta_center_lottie.png" alt="Integration Graphic" className="absolute inset-0 w-full h-full object-contain animate-rock" />
                <svg className="absolute w-[120px] h-[120px] z-10 text-[#42500c] animate-face-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 10 Q7.5 7 10 10" />
                  <path d="M14 10 Q16.5 7 19 10" />
                  <path d="M8.5 15 Q12 18.5 15.5 15" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - CTA + Links */}
      <footer className="w-full relative z-20 mt-20">
        {/* CTA Section */}
        <div className="relative overflow-hidden bg-[#0c0a09] w-full gsap-card">
          <div className="max-w-[1240px] mx-auto px-6 py-24 md:py-32 text-center relative">
            {/* Floating decorative elements */}
            <div className="absolute top-12 left-[10%] w-[108px] h-[108px] pointer-events-none hidden lg:block animate-bounce" style={{ animationDuration: '6s' }}>
              <img src="/footer/images/v5_900.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute top-8 right-[8%] w-[35px] h-[35px] pointer-events-none hidden lg:block animate-pulse rounded-full" style={{ animationDuration: '8s', backgroundColor: 'rgba(219,252,116,1)' }}>
            </div>
            <div className="absolute bottom-16 right-[12%] w-[169px] h-[169px] pointer-events-none hidden lg:block animate-bounce" style={{ animationDuration: '5s' }}>
              <img src="/footer/images/v5_907.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="absolute bottom-8 left-[15%] w-[40px] h-[40px] pointer-events-none hidden lg:block" style={{ backgroundColor: 'rgba(250,198,251,1)' }}>
            </div>

            <h2 className="font-sans text-4xl md:text-6xl font-semibold text-stone-100 tracking-tight leading-[1.1] mb-6 max-w-[780px] mx-auto">
              Streamline your trading strategy
            </h2>
            <p className="text-stone-400 text-base md:text-lg max-w-[584px] mx-auto mb-10 font-light font-sans">
              Start using Narrative today and take your portfolio to the next level with autonomous AI-powered rotation.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-3 bg-stone-100 text-stone-950 px-6 py-3 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg"
            >
              <span className="w-8 h-8 rounded-full bg-stone-950 flex items-center justify-center">
                <svg className="w-4 h-4 text-stone-100" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              Let's get started
            </a>
          </div>
        </div>

        {/* Main Footer */}
        <div className="border-t border-stone-800/60 bg-[#0c0a09]">
          <div className="max-w-[1240px] mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {/* Logo + Description */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/icon.png" alt="Narrative" className="w-8 h-8 object-contain" />
                  <span className="text-stone-100 font-semibold text-lg">Narrative</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed max-w-[200px]">
                  AI-powered narrative rotator for autonomous crypto portfolio management on BNB Chain.
                </p>
              </div>

              {/* Column 1 */}
              <div>
                <h4 className="text-stone-400 text-sm font-medium mb-5 uppercase tracking-wider">Product</h4>
                <ul className="space-y-3">
                  {['Dashboard', 'Live Monitor', 'API', 'Documentation'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-stone-300 text-sm hover:text-stone-100 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h4 className="text-stone-400 text-sm font-medium mb-5 uppercase tracking-wider">Resources</h4>
                <ul className="space-y-3">
                  {['Whitepaper', 'FAQ', 'Support', 'Status'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-stone-300 text-sm hover:text-stone-100 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h4 className="text-stone-400 text-sm font-medium mb-5 uppercase tracking-wider">Company</h4>
                <ul className="space-y-3">
                  {['About', 'Privacy', 'Terms', 'GitHub'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-stone-300 text-sm hover:text-stone-100 transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-stone-800/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Social icons */}
                <a href="https://x.com/aqih0" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-stone-800 transition-colors">
                  <svg className="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://github.com/AbdullahBalfaqih/Narrative-Rotator-" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-stone-800 transition-colors">
                  <svg className="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://github.com/AbdullahBalfaqih/Narrative-Rotator-" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center hover:bg-stone-800 transition-colors">
                  <svg className="w-4 h-4 text-stone-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
              <div className="text-xs text-stone-500 font-sans">2026 Narrative. All rights reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
