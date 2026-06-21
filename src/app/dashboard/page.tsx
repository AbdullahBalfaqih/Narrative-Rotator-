"use client";

import React, { useState, useEffect } from 'react';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { coinsData, type Coin } from './coinsData';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import GsapCardAnimation from '@/components/GsapCardAnimation';
import GsapSectionAnimation from '@/components/GsapSectionAnimation';
import ContainerCryptos from './ContainerCryptos';
import DetailsSection from './DetailsSection';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const autonomousGuardrailsColumns = [
  {
    icon: '/details/images/v127_18.png',
    iconClass: 'object-cover object-center scale-[1.4]',
    title: 'Max size per trade',
    subtitle: '15%',
    bullets: ['Max allocation rotation shift per cycle']
  },
  {
    icon: '/details/images/v127_59.png',
    iconClass: 'object-cover object-center scale-[1.4]',
    title: 'Daily drawdown limit',
    subtitle: '5%',
    bullets: ['Daily risk loss cap before agent sleeps']
  },
  {
    icon: '/details/images/v127_100.png',
    iconClass: 'object-cover object-center scale-[1.4]',
    title: 'Slippage protection',
    subtitle: '0.5%',
    bullets: ['Maximum swap slippage protection setting']
  }
];

const onChainCredentialsColumns = [
  {
    icon: '/agentcredit/images/v128_171.png',
    iconClass: 'object-cover object-center scale-[2.2]',
    title: 'Twak wallet mode',
    subtitle: 'Agent wallet active',
    bullets: ['Trust wallet safe address: 0x64eFbE37a50C82eD8cba5170f805aA4f2048fDA9']
  },
  {
    icon: '/agentcredit/images/v128_198.png',
    iconClass: 'object-cover object-center scale-[2.2]',
    title: 'Bnb identity sdk',
    subtitle: 'Registered (Erc-8004)',
    bullets: []
  },
  {
    icon: '/agentcredit/images/v128_145.png',
    iconClass: 'object-cover object-center scale-[2.2]',
    title: 'Megafuel paymaster',
    subtitle: 'Sponsored gas enabled',
    bullets: []
  }
];

import FooterDashboard from './FooterDashboard';
import ActivePortfolio from './ActivePortfolio';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'payment';
  message: string;
}

export default function Dashboard() {
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [statusText, setStatusText] = useState('Standby - Waiting for activation');
  const [x402TotalPaid, setX402TotalPaid] = useState(0.00);
  const [portfolioValue, setPortfolioValue] = useState(12480.50);
  const [walletAddress, setWalletAddress] = useState('0x64eFbE37a50C82eD8cba5170f805aA4f2048fDA9');
  const [erc8004Registered, setErc8004Registered] = useState(true);
  const [sponsoredGas, setSponsoredGas] = useState(true);
  const [totalTrades, setTotalTrades] = useState(0);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [maxDrawdownStat, setMaxDrawdownStat] = useState(0);
  const [monitoredPairs, setMonitoredPairs] = useState(0);
  const [bscBlock, setBscBlock] = useState('#—');
  const [bnbBalance, setBnbBalance] = useState(0);

  const [isBackendOffline, setIsBackendOffline] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  // Countdown timer for next rotation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 30, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) { minutes--; }
          else {
            minutes = 59;
            if (hours > 0) { hours--; }
            else { hours = 23; if (days > 0) { days--; } }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sector Narrative Heats (0 - 100)
  const [heats, setHeats] = useState<Record<string, number>>({
    AI: 78,
    DeFi: 45,
    RWA: 62,
    Meme: 89,
    L2: 50
  });

  // Current Capital Allocation percentages
  const [allocation, setAllocation] = useState<Record<string, number>>({
    AI: 25,
    DeFi: 15,
    RWA: 20,
    Meme: 30,
    L2: 10
  });

  // User adjustable risk limits
  const [maxTradeSize, setMaxTradeSize] = useState(15); // %
  const [dailyDrawdown, setDailyDrawdown] = useState(5); // %
  const [slippage, setSlippage] = useState(0.5); // %

  // Trade approval state
  const [pendingTrades, setPendingTrades] = useState<any[]>([]);
  const [autoTrade, setAutoTrade] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const scrollToServices = () => {
    const target = document.getElementById('services');
    if (!target) return;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - 100;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200; // 1.2 seconds for a luxurious smooth motion
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };
  const [confirmTrade, setConfirmTrade] = useState<any>(null);

  // Webhook / Inter-Agent state
  const [webhooks, setWebhooks] = useState<string[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [incomingMessages, setIncomingMessages] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAgents, setShowAgents] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Wallet Modal
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const [showDisconnect, setShowDisconnect] = useState(false);

  // Close disconnect dropdown on outside click
  useEffect(() => {
    if (!showDisconnect) return;
    const handler = () => setShowDisconnect(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showDisconnect]);

  // Fetch status, metrics, and logs from backend API
  const fetchData = async () => {
    try {
      // Fetch status
      const statusRes = await fetch(`${API_BASE}/api/status`);
      if (!statusRes.ok) throw new Error('Failed to fetch status');
      const statusData = await statusRes.json();

      setIsAgentActive(statusData.is_active);
      setStatusText(statusData.status_text);
      setPortfolioValue(statusData.total_usd_value);
      setX402TotalPaid(statusData.x402_total_paid);
      setWalletAddress(statusData.wallet_address);
      setErc8004Registered(statusData.erc8004_registered);
      setSponsoredGas(statusData.sponsored_gas);
      setTotalTrades(statusData.total_trades_executed ?? 0);
      setDailyProfit(statusData.daily_profit ?? 0);
      setMaxDrawdownStat(statusData.max_drawdown_pct ?? 0);
      setMonitoredPairs(statusData.monitored_pairs ?? 0);
      setBscBlock(statusData.bsc_block ? `#${statusData.bsc_block}` : '#—');
      setBnbBalance(statusData.bnb_balance ?? 0);

      // Fetch metrics
      const metricsRes = await fetch(`${API_BASE}/api/metrics`);
      if (!metricsRes.ok) throw new Error('Failed to fetch metrics');
      const metricsData = await metricsRes.json();
      if (metricsData.heats) setHeats(metricsData.heats);
      if (metricsData.allocation) setAllocation(metricsData.allocation);

      // Fetch logs
      const logsRes = await fetch(`${API_BASE}/api/logs`);
      if (!logsRes.ok) throw new Error('Failed to fetch logs');
      const logsData = await logsRes.json();
      setLogs(logsData.logs || []);

      // Fetch pending trades
      fetchPendingTrades();

      // Fetch webhook config & incoming messages
      fetchWebhookData();

      // Fetch settings
      try {
        const settingsRes = await fetch(`${API_BASE}/api/settings`);
        if (settingsRes.ok) setSettings(await settingsRes.json());
      } catch {}

      setIsBackendOffline(false);
    } catch (err) {
      console.warn('Backend server connection issue:', err);
      setIsBackendOffline(true);
    }
  };

  // Poll server data at short interval
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Webhook functions
  const fetchWebhookData = async () => {
    try {
      const [configRes, msgRes] = await Promise.all([
        fetch(`${API_BASE}/api/webhook-config`),
        fetch(`${API_BASE}/api/incoming-messages`)
      ]);
      if (configRes.ok) {
        const configData = await configRes.json();
        setWebhooks(configData.webhooks || []);
      }
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setIncomingMessages(msgData.messages || []);
      }
    } catch {}
  };

  const addWebhook = async () => {
    if (!webhookUrl.trim()) return;
    try {
      await fetch(`${API_BASE}/api/webhook-config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: webhookUrl.trim() })
      });
      setWebhookUrl('');
      fetchWebhookData();
    } catch {}
  };

  const removeWebhook = async (url: string) => {
    try {
      await fetch(`${API_BASE}/api/webhook-config`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      fetchWebhookData();
    } catch {}
  };

  const sendChatToAgent = async () => {
    if (!chatMessage.trim()) return;
    try {
      const payload: any = {
        agent: "User",
        type: "natural_language_command",
        data: {
          intent: "chat",
          message: chatMessage.trim(),
          confidence: 0.9,
        }
      };
      
      const words = chatMessage.toUpperCase().split(' ');
      const possibleTokens = words.filter(w => /^[A-Z]{2,5}$/.test(w) && !['THE', 'BUY', 'AND', 'FOR', 'SELL'].includes(w));
      
      if (chatMessage.toLowerCase().includes('buy') || chatMessage.toLowerCase().includes('اشتري') || chatMessage.toLowerCase().includes('استثمر')) {
        payload.data.intent = "trade_proposal";
        if (possibleTokens.length > 0) {
          payload.data.target_assets = possibleTokens;
        }
      }

      await fetch(`${API_BASE}/api/agent-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setChatMessage('');
      fetchWebhookData();
    } catch {}
  };

  // Toggle active agent state
  const toggleAgent = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/toggle`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to toggle agent');
      const data = await res.json();
      setIsAgentActive(data.is_active);
      fetchData(); // Refresh immediately
    } catch (err) {
      console.error(err);
      setIsBackendOffline(true);
    }
  };

  // Save updated risk limits to backend YAML configuration
  const saveRiskLimits = async (maxSize: number, drawdown: number, slip: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          max_trade_size: maxSize,
          daily_drawdown: drawdown,
          slippage: slip
        })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to save risk limits:', err);
    }
  };

  // Fetch pending trades
  const fetchPendingTrades = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/pending-trades`);
      if (!res.ok) throw new Error('Failed to fetch pending trades');
      const data = await res.json();
      setPendingTrades(data.trades || []);
    } catch (err) {
      // Silently ignore - backend may not have this endpoint yet
    }
  };

  // Approve a pending trade
  const approveTrade = async (tradeId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/approve-trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trade_id: tradeId })
      });
      if (res.ok) {
        setConfirmTrade(null);
        setPendingTrades(prev => prev.filter(t => t.id !== tradeId));
        fetchData();
      }
    } catch (err) {
      console.error('Failed to approve trade:', err);
    }
  };

  // Reject a pending trade
  const rejectTrade = async (tradeId: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/reject-trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trade_id: tradeId })
      });
      if (res.ok) {
        setPendingTrades(prev => prev.filter(t => t.id !== tradeId));
      }
    } catch (err) {
      console.error('Failed to reject trade:', err);
    }
  };

  // Toggle auto trade mode
  const toggleAutoTrade = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auto-trade`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to toggle auto trade');
      const data = await res.json();
      setAutoTrade(data.auto_trade);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSliderChange = (type: 'maxTrade' | 'drawdown' | 'slippage', val: number) => {
    if (type === 'maxTrade') {
      setMaxTradeSize(val);
      saveRiskLimits(val, dailyDrawdown, slippage);
    } else if (type === 'drawdown') {
      setDailyDrawdown(val);
      saveRiskLimits(maxTradeSize, val, slippage);
    } else if (type === 'slippage') {
      setSlippage(val);
      saveRiskLimits(maxTradeSize, dailyDrawdown, val);
    }
  };

  // Helper to access metrics case-insensitively
  const getMetricValue = (data: Record<string, number>, key: string): number => {
    if (!data) return 0;
    const foundKey = Object.keys(data).find(k => k.toLowerCase() === key.toLowerCase());
    return foundKey ? data[foundKey] : 0;
  };

  // Helper to find the maximum elements dynamically for monochromatic highlighting
  const getTopSectorKey = () => {
    let topKey = 'AI';
    let topVal = -1;
    const sectors = ['AI', 'Meme', 'RWA', 'L2', 'DeFi'];
    sectors.forEach((key) => {
      const val = getMetricValue(heats, key);
      if (val > topVal) {
        topVal = val;
        topKey = key;
      }
    });
    return topKey;
  };

  const getTopAllocationKey = () => {
    let topKey = 'AI';
    let topVal = -1;
    const sectors = ['AI', 'Meme', 'RWA', 'L2', 'DeFi'];
    sectors.forEach((key) => {
      const val = getMetricValue(allocation, key);
      if (val > topVal) {
        topVal = val;
        topKey = key;
      }
    });
    return topKey;
  };

  const topSector = getTopSectorKey();
  const topAllocation = getTopAllocationKey();

  const sectorsKeys = ['AI', 'Meme', 'RWA', 'L2', 'DeFi'] as const;
  const totalSectorAllocation = sectorsKeys.reduce((sum, key) => sum + getMetricValue(allocation, key), 0);
  const stablesAllocValue = Math.max(0, 100 - totalSectorAllocation);

  // Parse and capitalize log messages to avoid all-caps tokens
  const formatLogMsg = (msg: string) => {
    return msg
      .replace(/\[x402\]/gi, '[X402]')
      .replace(/\[TWAK\]/gi, '[Twak]')
      .replace(/\[CMC Agent Hub\]/gi, '[Cmc Agent Hub]')
      .replace(/\bBNB\b/g, 'Bnb')
      .replace(/\bUSD\b/g, 'Usd')
      .replace(/\bBSC\b/g, 'Bsc')
      .replace(/\bFET\b/g, 'Fet')
      .replace(/\bONDO\b/g, 'Ondo')
      .replace(/\bUNI\b/g, 'Uni')
      .replace(/\bPEPE\b/g, 'Pepe')
      .replace(/\bARB\b/g, 'Arb')
      .replace(/\bAI\b/g, 'Ai')
      .replace(/\bRWA\b/g, 'Rwa')
      .replace(/\bDEFI\b/g, 'Defi')
      .replace(/\bL2\b/g, 'L2')
      .replace(/\bPancakeSwap\b/gi, 'Pancakeswap');
  };

  const clearConsole = () => {
    setLogs([]);
  };

  return (
    <div className="font-sans text-white min-h-screen flex flex-col justify-between relative bg-black overflow-x-hidden">
      <SmoothCursor />

      {/* ============================================= */}
      {/* Navigation Header */}
      {/* ============================================= */}
      <nav className="fixed top-8 left-0 right-0 z-50 px-6 md:px-8 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <a href="/" className="font-sans text-2xl font-semibold text-stone-100 tracking-tight flex items-center gap-2">
            <img src="/icon.png" alt="Narrative Logo" className="w-8 h-8 object-contain" />
            Narrative
          </a>

          {/* Links and Actions (Central Box) */}
          <div className="hidden lg:flex items-center bg-[#1c1917] border border-stone-800/80 rounded-xl px-2 py-2 shadow-xl backdrop-blur-md text-sm font-medium text-stone-400">
            <button onClick={() => setShowSettings(true)} className="px-5 py-2 hover:text-stone-100 transition-colors">
              Settings
            </button>
            
            <div className="w-px h-5 bg-stone-800 mx-1"></div>
            
            <button onClick={() => setShowAgents(true)} className="px-5 py-2 hover:text-stone-100 transition-colors">
              Agents
            </button>
            
            <div className="w-px h-5 bg-stone-800 mx-2"></div>

            <button
              onClick={toggleAgent}
              disabled={isBackendOffline}
              className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-sm ${
                isBackendOffline
                  ? 'bg-stone-900 text-stone-500 cursor-not-allowed border border-stone-800'
                  : isAgentActive
                    ? 'bg-stone-100 text-stone-950 hover:bg-stone-200'
                    : 'bg-black text-white border border-stone-800 hover:bg-stone-900'
              }`}
            >
              {isBackendOffline ? 'Offline' : isAgentActive ? 'Stop' : 'Start'}
            </button>
            
            <div className="w-px h-5 bg-stone-800 mx-2"></div>
            
            <div className="flex items-center gap-2 px-3 py-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#F0B90B"><path d="M12 0L14.47 4.47 12 2.94 9.53 4.47zM16.88 6.12L21.18 8.59 18.71 10.12 14.41 7.65zM21.18 15.41L16.88 17.88 14.41 16.35 18.71 13.88zM12 21.06L9.53 19.53 12 18 14.47 19.53zM7.12 17.88L2.82 15.41 5.29 13.88 9.59 16.35zM2.82 8.59L7.12 6.12 9.59 7.65 5.29 10.12z" fill="#F0B90B"/><path d="M12 4.76L7.12 7.65 8.59 8.59 12 10.59 15.41 8.59 16.88 7.65zM12 13.41L8.59 11.41 7.12 12.35 12 15.24 16.88 12.35 15.41 11.41z" fill="#F0B90B"/></svg>
              <span className="text-stone-300 font-semibold">{bnbBalance.toFixed(4)}</span>
            </div>

            <div className="w-px h-5 bg-stone-800 mx-2"></div>

            <button
              onClick={toggleAutoTrade}
              disabled={isBackendOffline}
              className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-sm ${
                isBackendOffline
                  ? 'bg-stone-900 text-stone-500 cursor-not-allowed border border-stone-800'
                  : autoTrade
                    ? 'bg-[#CDFC74] text-stone-950 hover:bg-white'
                    : 'bg-black text-white border border-stone-800 hover:bg-stone-900'
              }`}
            >
              {autoTrade ? 'Auto Trade' : 'Manual'}
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="relative">
              {isConnected ? (
                <>
                  <button
                    onClick={() => setShowDisconnect((prev) => !prev)}
                    className="flex items-center px-4 md:px-6 py-2.5 rounded-lg bg-[#CDFC74] text-stone-950 font-semibold cursor-pointer transition-all duration-200 hover:bg-white shadow-lg active:scale-95"
                  >
                    <span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}</span>
                  </button>
                  {showDisconnect && (
                    <div className="absolute right-0 top-full mt-2 bg-[#1c1917] border border-stone-800/80 rounded-lg overflow-hidden shadow-xl z-50 min-w-[120px]">
                      <button
                        onClick={() => { disconnect(); setShowDisconnect(false); }}
                        className="w-full px-4 py-2.5 text-stone-300 text-sm text-left hover:text-white hover:bg-stone-800 transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={(e) => { e.preventDefault(); open(); }}
                  className="flex items-center px-4 md:px-6 py-2.5 rounded-lg bg-[#CDFC74] text-stone-950 font-semibold cursor-pointer transition-all duration-200 hover:bg-white shadow-lg active:scale-95 group"
                >
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 74 74"
                    height="20"
                    width="20"
                    className="ml-2 hidden sm:block transition-transform duration-300 ease-in-out group-hover:translate-x-[4px]"
                  >
                    <circle strokeWidth="3" stroke="currentColor" r="35.5" cy="37" cx="37"></circle>
                    <path
                      fill="currentColor"
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    ></path>
                  </svg>
                </button>
              )}
            </div>

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
        <div className={`lg:hidden absolute top-full left-4 right-4 mt-4 bg-[#1c1917] border border-stone-800/80 rounded-2xl shadow-2xl backdrop-blur-xl p-4 flex flex-col gap-4 origin-top transition-all duration-400 ease-in-out ${showMobileMenu ? 'opacity-100 scale-y-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-y-90 pointer-events-none -translate-y-5'}`}>
            <button onClick={() => { setShowSettings(true); setShowMobileMenu(false); }} className="text-left px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">
              Settings
            </button>
            <button onClick={() => { setShowAgents(true); setShowMobileMenu(false); }} className="text-left px-4 py-3 text-stone-300 hover:text-white hover:bg-stone-800/50 rounded-xl transition-colors font-medium">
              Agents
            </button>
            <div className="w-full h-px bg-stone-800/80"></div>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-stone-400 font-medium text-sm">BNB Balance</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#F0B90B"><path d="M12 0L14.47 4.47 12 2.94 9.53 4.47zM16.88 6.12L21.18 8.59 18.71 10.12 14.41 7.65zM21.18 15.41L16.88 17.88 14.41 16.35 18.71 13.88zM12 21.06L9.53 19.53 12 18 14.47 19.53zM7.12 17.88L2.82 15.41 5.29 13.88 9.59 16.35zM2.82 8.59L7.12 6.12 9.59 7.65 5.29 10.12z" fill="#F0B90B"/><path d="M12 4.76L7.12 7.65 8.59 8.59 12 10.59 15.41 8.59 16.88 7.65zM12 13.41L8.59 11.41 7.12 12.35 12 15.24 16.88 12.35 15.41 11.41z" fill="#F0B90B"/></svg>
                <span className="text-stone-300 font-semibold">{bnbBalance.toFixed(4)}</span>
              </div>
            </div>
            <div className="w-full h-px bg-stone-800/80"></div>
            <div className="flex gap-2">
              <button
                onClick={() => { toggleAgent(); setShowMobileMenu(false); }}
                disabled={isBackendOffline}
                className={`flex-1 py-3 rounded-xl transition-all duration-300 font-semibold shadow-sm ${
                  isBackendOffline
                    ? 'bg-stone-900 text-stone-500 cursor-not-allowed border border-stone-800'
                    : isAgentActive
                      ? 'bg-stone-100 text-stone-950 hover:bg-stone-200'
                      : 'bg-black text-white border border-stone-800 hover:bg-stone-900'
                }`}
              >
                {isBackendOffline ? 'Offline' : isAgentActive ? 'Stop' : 'Start'}
              </button>
              <button
                onClick={() => { toggleAutoTrade(); setShowMobileMenu(false); }}
                disabled={isBackendOffline}
                className={`flex-1 py-3 rounded-xl transition-all duration-300 font-semibold shadow-sm ${
                  isBackendOffline
                    ? 'bg-stone-900 text-stone-500 cursor-not-allowed border border-stone-800'
                    : autoTrade
                      ? 'bg-[#CDFC74] text-stone-950 hover:bg-white'
                      : 'bg-black text-white border border-stone-800 hover:bg-stone-900'
                }`}
              >
                {autoTrade ? 'Auto Trade' : 'Manual'}
              </button>
            </div>
          </div>
      </nav>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowSettings(false)}>
          <div className="bg-[#0B0C0D] border border-stone-800 rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-stone-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(settings).map(([key, val]) => {
                const isSecret = key.includes('KEY') || key.includes('PASSWORD') || key.includes('SECRET');
                return (
                  <div key={key}>
                    <label className="text-stone-400 text-xs font-mono block mb-1">{key}</label>
                    <input
                      type={isSecret ? 'password' : 'text'}
                      placeholder={isSecret ? '••••••••••••••••' : val}
                      onChange={(e) => setSettings(prev => ({...prev, [key]: e.target.value}))}
                      className="w-full bg-[#191A1B] text-white text-sm rounded-lg px-4 py-2.5 border border-stone-700 outline-none focus:border-[#CDFC74] transition-colors font-mono placeholder:text-stone-600"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={async () => {
                for (const [key, value] of Object.entries(settings)) {
                  try {
                    await fetch(`${API_BASE}/api/settings`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ key, value })
                    });
                  } catch {}
                }
                setShowSettings(false);
              }} className="flex-1 bg-[#CDFC74] text-stone-900 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#b8e368] transition-colors">Save</button>
              <button onClick={() => setShowSettings(false)} className="flex-1 bg-stone-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-stone-700 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Agents Modal */}
      {showAgents && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowAgents(false)}>
          <div className="bg-[#0B0C0D] border border-stone-800 rounded-2xl p-8 w-full max-w-2xl mx-4 shadow-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-semibold">Agent Communication</h2>
              <button onClick={() => setShowAgents(false)} className="text-stone-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p className="text-[#C7C7C7] text-sm mb-6">Connect other AI agents via webhooks. Other agents can POST to <code className="text-[#CDFC74]">/api/agent-webhook</code> to communicate.</p>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Outgoing Webhooks */}
              <div className="flex-1 bg-[#050505] rounded-xl p-5 border border-stone-800">
                <h4 className="text-white text-base font-medium mb-3">Outgoing Webhooks</h4>
                <p className="text-stone-400 text-xs mb-4">We notify these URLs on trade proposals &amp; executions</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://other-agent.com/webhook"
                    className="flex-1 bg-[#191A1B] text-white text-sm rounded-lg px-4 py-2 border border-stone-700 outline-none focus:border-[#CDFC74] transition-colors placeholder:text-stone-500"
                  />
                  <button onClick={addWebhook} className="bg-[#CDFC74] text-stone-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#b8e368] transition-colors">Add</button>
                </div>
                {webhooks.length === 0 ? (
                  <p className="text-stone-500 text-xs italic">No webhooks configured</p>
                ) : (
                  <ul className="space-y-2">
                    {webhooks.map((url, i) => (
                      <li key={i} className="flex items-center justify-between bg-[#191A1B] rounded-lg px-3 py-2">
                        <span className="text-stone-300 text-xs truncate max-w-[250px]">{url}</span>
                        <button onClick={() => removeWebhook(url)} className="text-red-400 text-xs hover:text-red-300 ml-2 shrink-0">Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Incoming Messages */}
              <div className="flex-1 bg-[#050505] rounded-xl p-5 border border-stone-800">
                <h4 className="text-white text-base font-medium mb-3">Incoming Messages</h4>
                <p className="text-stone-400 text-xs mb-4">From other AI agents</p>
                {incomingMessages.length === 0 ? (
                  <p className="text-stone-500 text-xs italic">No messages yet</p>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {incomingMessages.map((msg, i) => (
                      <div key={i} className="bg-[#191A1B] rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2 text-xs mb-1">
                          <span className="text-[#CDFC74] font-medium">{msg.agent}</span>
                          <span className="text-stone-500">•</span>
                          <span className="text-stone-400">{msg.type}</span>
                          {msg.timestamp && <><span className="text-stone-500">•</span><span className="text-stone-500">{msg.timestamp}</span></>}
                        </div>
                        <pre className="text-stone-300 text-xs whitespace-pre-wrap break-all">{JSON.stringify(msg.data, null, 1)}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat with Agent */}
            <div className="mt-6 bg-[#050505] rounded-xl p-5 border border-stone-800">
              <h4 className="text-white text-base font-medium mb-3">Send Command to Agent</h4>
              <p className="text-stone-400 text-xs mb-4">Type a natural language command (e.g. "Buy FET"). It will be translated into a structured webhook and sent to the agent.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChatToAgent()}
                  placeholder="Type your command..."
                  className="flex-1 bg-[#191A1B] text-white text-sm rounded-lg px-4 py-3 border border-stone-700 outline-none focus:border-[#CDFC74] transition-colors placeholder:text-stone-500"
                />
                <button onClick={sendChatToAgent} className="bg-[#CDFC74] text-stone-900 text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#b8e368] transition-colors whitespace-nowrap">
                  Send Command
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================= */}
      {/* MAIN CONTAINER */}
      {/* ============================================= */}
      <main className="w-full max-w-[1500px] mx-auto px-0 sm:px-6 pt-28 pb-20 relative z-20 flex-grow">

        {/* Single unified card */}
        <div id="about" className="bg-[#050505] rounded-none sm:rounded-3xl p-4 sm:p-8 flex flex-col gap-10 scroll-mt-28">
          <GsapSectionAnimation>

          {/* Connection Offline Notice */}
          {isBackendOffline && (
            <div className="bg-amber-50 text-amber-800 px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping flex-shrink-0"></span>
                <p className="text-sm font-light leading-relaxed">
                  Agent backend connection offline. To sync live agent actions and on-chain logs, run <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-xs text-amber-700">python src/server.py</code> inside the narrative-rotator directory.
                </p>
              </div>
              <button
                onClick={fetchData}
                className="px-4 py-1.5 bg-amber-100 hover:bg-amber-200 text-xs font-semibold rounded-lg transition-all flex-shrink-0 self-end sm:self-auto"
              >
                Retry connection
              </button>
            </div>
          )}

          {/* Token Sale Section - replaces Narrative rotator console */}
          <div data-gsap="blurIn" className="relative rounded-none sm:rounded-3xl overflow-hidden bg-[#0D0E0F]" style={{ background: 'linear-gradient(125deg, #222325 0%, #0a0a0a 100%)' }}>
            <div className="flex flex-col items-center gap-10 md:gap-20 py-12 sm:py-16 md:py-[130px] px-4 sm:px-8 lg:px-12 xl:px-24">
              {/* Header row: badge + title + social */}
              <div className="flex flex-col items-start gap-5 w-full max-w-[1400px]">
                {/* Badge */}
                <div className="flex py-[7px] px-4 justify-center items-center rounded-md bg-[#E1F076] w-[135px] h-[30px]">
                  <span className="text-[#191A1B] text-sm leading-[14px]">Live Execution</span>
                </div>

                {/* Title + Social */}
                <div className="flex flex-wrap items-center justify-between gap-[30px] w-full">
                  <div className="flex flex-col flex-1 min-w-[300px]">
                    <h1 className="text-white text-4xl md:text-5xl leading-[58px] tracking-[-0.03em]">
                      Agent Performance
                    </h1>
                  </div>
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <img src="/BTC.png" alt="BTC" className="w-[280px] h-[280px] -mt-32" />
                    <div className="flex items-center gap-5">
                      <link href="/social icon/css/main.css" rel="stylesheet" />
                      <div className="v116_8899 cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="v116_8900 hover:scale-110 transition-transform"></div>
                      <div className="v116_8902 hover:scale-110 transition-transform"></div>
                      <div className="v116_8904 hover:scale-110 transition-transform"></div>
                      <div className="v116_8906 hover:scale-110 transition-transform"></div>
                      <div className="v116_8908 hover:scale-110 transition-transform"></div>
                      <div className="v116_8910 hover:scale-110 transition-transform"></div>
                      <div className="v116_8912 hover:scale-110 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Token Metrics Card */}
              <div data-gsap="zoomIn" className="flex flex-col p-4 sm:p-8 md:p-[60px] gap-12 rounded-md bg-[#191A1B] w-full max-w-[1400px]">
                {/* Top Row: Token stats & Timer */}
                <div className="flex flex-wrap justify-between items-center gap-10 w-full">
                  {/* Left: Token stats */}
                  <div className="flex flex-col gap-4 w-full md:flex-1 md:max-w-[500px]">
                    <p className="text-white text-xl leading-5">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
                    <div className="rounded-[100px] bg-[rgba(255,255,255,0.15)] w-full h-1.5 overflow-hidden">
                      <div className="rounded-[100px] bg-[#E1F076] w-[225px] h-1.5"></div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-4 w-full">
                       <p className="text-white text-lg md:text-xl leading-5">Daily Profit: {dailyProfit >= 0 ? '+' : ''}${Math.abs(dailyProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                       <p className="text-[#E1F076] text-lg md:text-xl leading-5">Total Trades: {totalTrades.toLocaleString()}</p>
                     </div>
                  </div>

                  {/* Right: Timer */}
                  <div className="flex flex-col gap-4 md:gap-[30px] w-full md:w-auto">
                    <p className="text-white text-xl leading-5">Next portfolio rotation in</p>
                    <p className="text-[rgba(255,255,255,0.20)] text-3xl md:text-[40px] font-medium leading-10">
                      {String(timeLeft.days).padStart(2, '0')} : {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-[rgba(255,255,255,0.1)]"></div>

          {/* Bottom Row: Narrative Heat Index */}
          <div className="flex flex-col gap-8 w-full mt-4">
            <div className="flex flex-col gap-3">
              <p className="text-white text-2xl leading-[30px]">Narrative heat index</p>
              <p className="text-[#C7C7C7] text-lg leading-6">Calculated via Cmc Agent Hub news, socials, & Kol sentiment metrics</p>
            </div>
            
            {/* The user's exact Figma exported HTML for the cards */}
            <GsapCardAnimation>
              <div style={{ marginTop: '24px' }}>
                <link href="/cards/css/main.css" rel="stylesheet" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1: AI */}
                  <div className="v115_8839 gsap-card transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(225,240,118,0.3)] duration-300 flex flex-col gap-4" style={{ position: 'relative', left: 'auto', top: 'auto', margin: 0, height: 'auto', minHeight: '270px', width: '100%' }}>
                    <div className="v115_8841" style={{ position: 'relative' }}>
                      <div className="v115_8842"></div>
                    </div>
                    <span className="v115_8844" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Ai narrative ({heats.AI || 78}%)</span>
                    <span className="v115_8847" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>AI tokens are surging as artificial intelligence adoption grows globally. Fet and Rndr lead the pack in decentralized compute and AI agents.</span>
                  </div>

                  {/* Card 2: Meme */}
                  <div className="v115_8849 gsap-card transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(225,240,118,0.3)] duration-300 flex flex-col gap-4" style={{ position: 'relative', left: 'auto', top: 'auto', margin: 0, height: 'auto', minHeight: '270px', width: '100%' }}>
                    <div className="v115_8851" style={{ position: 'relative' }}>
                      <div className="v115_8852"></div>
                    </div>
                    <span className="v115_8854" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Meme momentum ({heats.Meme || 62}%)</span>
                    <span className="v115_8857" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Driven by community sentiment and social media buzz, meme coins like Pepe and Shib show high volatility and massive retail interest.</span>
                  </div>

                  {/* Card 3: RWA */}
                  <div className="v115_8859 gsap-card transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(225,240,118,0.3)] duration-300 flex flex-col gap-4" style={{ position: 'relative', left: 'auto', top: 'auto', margin: 0, height: 'auto', minHeight: '270px', width: '100%' }}>
                    <div className="v115_8861" style={{ position: 'relative' }}>
                      <div className="v115_8862"></div>
                    </div>
                    <span className="v115_8864" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Rwa tokenization ({heats.RWA || 67}%)</span>
                    <span className="v115_8867" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Real World Assets are being brought on-chain. Ondo and Polyx are pioneers in bridging traditional finance yields with DeFi accessibility.</span>
                  </div>

                  {/* Card 4: L2 */}
                  <div className="v115_8869 gsap-card transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(225,240,118,0.3)] duration-300 flex flex-col gap-4" style={{ position: 'relative', left: 'auto', top: 'auto', margin: 0, height: 'auto', minHeight: '270px', width: '100%' }}>
                    <div className="v115_8871" style={{ position: 'relative' }}>
                      <div className="v115_8872"></div>
                    </div>
                    <span className="v115_8874" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Layer 2 scalability ({heats.L2 || 57}%)</span>
                    <span className="v115_8877" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Arbitrum and Optimism are solving Ethereum's congestion by providing fast, cheap transactions while inheriting L1 security.</span>
                  </div>

                  {/* Card 5: DeFi */}
                  <div className="v115_8879 gsap-card transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(225,240,118,0.3)] duration-300 flex flex-col gap-4" style={{ position: 'relative', left: 'auto', top: 'auto', margin: 0, height: 'auto', minHeight: '270px', width: '100%' }}>
                    <div className="v115_8881" style={{ position: 'relative' }}>
                      <div className="v115_8882"></div>
                    </div>
                    <span className="v115_8884" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Defi hubs ({heats.DeFi || 62}%)</span>
                    <span className="v115_8887" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Decentralized finance powerhouses like Uniswap and Aave continue to dominate on-chain liquidity, lending, and borrowing volume.</span>
                  </div>

                  {/* Card 6: Web3 */}
                  <div className="v115_8889 gsap-card transition-transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(225,240,118,0.3)] duration-300 flex flex-col gap-4" style={{ position: 'relative', left: 'auto', top: 'auto', margin: 0, height: 'auto', minHeight: '270px', width: '100%' }}>
                    <div className="v115_8891" style={{ position: 'relative' }}>
                      <div className="v115_8892"></div>
                    </div>
                    <span className="v115_8894" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Web3 Infrastructure (55%)</span>
                    <span className="v115_8897" style={{ width: '100%', display: 'block', whiteSpace: 'normal' }}>Essential infrastructure powering the decentralized web. Chainlink provides critical oracle data, while The Graph organizes blockchain data.</span>
                  </div>
                </div>
              </div>
            </GsapCardAnimation>
                </div>

                {/* Container Cryptos */}
                <div data-gsap="fadeInRight" id="services" className="w-full flex flex-col gap-6 scroll-mt-28 pt-8">
                  <ContainerCryptos selectedCoin={selectedCoin} />
                </div>

                {/* Active Portfolio Allocation (Circular Diagram) */}
                <div data-gsap="fadeInUp" id="resources" className="flex flex-col gap-6 scroll-mt-28">
                  <ActivePortfolio allocation={allocation} portfolioValue={portfolioValue} stablesAllocValue={stablesAllocValue} />
                </div>
              </div>

              {/* Stats Row */}
              <div data-gsap="staggerItems" className="flex flex-wrap justify-between gap-8 w-full max-w-[1400px]">
                <div data-gsap-item className="flex flex-col gap-3.5 w-[45%] md:w-auto md:max-w-[215px]">
                  <p className="text-white text-xl leading-5">{isAgentActive ? 'Active' : 'Standby'}</p>
                  <p className="text-[#C7C7C7] text-base md:text-xl leading-tight md:leading-[30px]">Agent Status</p>
                </div>
                <div data-gsap-item className="flex flex-col gap-3.5 w-[45%] md:w-auto md:max-w-[191px]">
                  <p className="text-white text-xl leading-5">{totalTrades > 0 ? `${totalTrades} Trades` : '—'}</p>
                  <p className="text-[#C7C7C7] text-base md:text-xl leading-tight md:leading-[30px]">Total Executed</p>
                </div>
                <div data-gsap-item className="flex flex-col gap-3.5 w-[45%] md:w-auto md:max-w-[191px]">
                  <p className="text-white text-xl leading-5">{maxDrawdownStat > 0 ? `${maxDrawdownStat.toFixed(1)}%` : '—'}</p>
                  <p className="text-[#C7C7C7] text-base md:text-xl leading-tight md:leading-[30px]">Max Drawdown</p>
                </div>
                <div data-gsap-item className="flex flex-col gap-3.5 w-[45%] md:w-auto md:max-w-[191px]">
                  <p className="text-white text-xl leading-5">{monitoredPairs > 0 ? `${monitoredPairs} Pairs` : '—'}</p>
                  <p className="text-[#C7C7C7] text-base md:text-xl leading-tight md:leading-[30px]">Actively Monitored</p>
                </div>
                <div data-gsap-item className="flex flex-col gap-3.5 w-[45%] md:w-auto md:max-w-[116px]">
                  <p className="text-white text-xl leading-5">{sponsoredGas ? 'Megafuel' : '—'}</p>
                  <p className="text-[#C7C7C7] text-base md:text-xl leading-tight md:leading-[30px]">Sponsored Gas</p>
                </div>
              </div>
              </div>

              {/* Autonomous Guardrails & On-Chain Credentials (Merged) */}
              <div data-gsap="fadeInLeft" className="w-full pt-10 mt-6">
                <DetailsSection 
                  sections={[
                    {
                      title: "Autonomous guardrails",
                      subtitle: "Strict limits stored locally; the agent cannot violate these rules",
                      columns: autonomousGuardrailsColumns
                    },
                    {
                      title: "On-chain credentials",
                      subtitle: "Autonomous identity parameters on Bnb Chain (Bsc)",
                      columns: onChainCredentialsColumns
                    }
                  ]}
                />
              </div>
            </div>
          </div>
          {/* Trade Recommendations - Infinite Scrolling Strip */}
          {pendingTrades.length > 0 && (
            <div className="w-full overflow-hidden relative my-8">
              <style>{`
                @keyframes scrollLoop {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .trade-strip {
                  display: flex;
                  gap: 30px;
                  width: fit-content;
                  animation: scrollLoop 80s linear infinite;
                }
                .trade-strip:hover {
                  animation-play-state: paused;
                }
                .trade-card {
                  width: 253px;
                  height: 150px;
                  background: rgba(1,3,20,1);
                  border-radius: 10px;
                  padding: 20px;
                  flex-shrink: 0;
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  gap: 0;
                  border-right: 1px solid rgba(255,255,255,0.12);
                  font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
                }
                .trade-card:last-child {
                  border-right: none;
                }
                .trade-card .icon-area {
                  width: 30px;
                  height: 30px;
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
                  justify-content: center;
                  position: relative;
                }
                .trade-card .coin-icon {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  object-fit: contain;
                  flex-shrink: 0;
                }
                .trade-card .coin-fallback {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  background: rgba(57,55,74,1);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-family: 'Outfit', sans-serif;
                  font-size: 14px;
                  font-weight: 700;
                  flex-shrink: 0;
                }
                .trade-card .icon-bar {
                  height: 6px;
                  width: 100%;
                  background: linear-gradient(90deg, #00FFA3, #DC1FFF);
                  border-radius: 1px;
                }
                .trade-card .btn-buy {
                  width: 39px;
                  height: 24px;
                  background: linear-gradient(rgba(57,55,74,1), rgba(26,27,36,1));
                  border-radius: 2px;
                  border: none;
                  color: white;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .trade-card .btn-buy:hover {
                  background: linear-gradient(rgba(77,75,94,1), rgba(46,47,56,1));
                }
                .trade-card .btn-reject {
                  width: 50px;
                  height: 24px;
                  background: linear-gradient(rgba(57,55,74,1), rgba(26,27,36,1));
                  border-radius: 2px;
                  border: none;
                  color: white;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .trade-card .btn-reject:hover {
                  background: linear-gradient(rgba(77,75,94,1), rgba(46,47,56,1));
                }
                .trade-card .token-name {
                  color: white;
                  font-family: 'Plus Jakarta Sans', sans-serif;
                  font-size: 14px;
                  font-weight: 600;
                }
                .trade-card .token-row {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  margin-top: 24px;
                }
                .trade-card .token-ticker {
                  color: white;
                  font-family: 'Outfit', sans-serif;
                  font-size: 14px;
                  font-weight: 700;
                }
                .trade-card .token-price {
                  color: white;
                  font-family: 'Outfit', sans-serif;
                  font-size: 14px;
                  font-weight: 600;
                }
                .trade-card .token-badge {
                  background: rgba(214,249,102,1);
                  border-radius: 999px;
                  padding: 4px 10px;
                  font-family: 'Outfit', sans-serif;
                  font-size: 13px;
                  font-weight: 600;
                  color: rgba(1,3,20,1);
                  white-space: nowrap;
                  margin-left: auto;
                }
              `}</style>
              <div className="trade-strip">
                {[...pendingTrades, ...pendingTrades].map((trade, idx) => {
                  const coinData = coinsData.find(c => c.symbol.toUpperCase() === trade.token.toUpperCase());
                  const iconSrc = coinData?.icon || null;
                  const changePct = trade.change_pct ?? 0;
                  const changePrefix = changePct >= 0 ? '▲' : '▼';
                  const displayPrice = (trade.price && trade.price > 0) ? trade.price : null;
                  return (
                  <div key={`${trade.id}-${idx}`} className="trade-card">
                    <div className="flex items-start justify-between w-full" style={{ height: 30 }}>
                      <div className="icon-area">
                        {iconSrc ? (
                          <img src={iconSrc} alt={trade.token} className="coin-icon" />
                        ) : (
                          <div className="coin-fallback">{trade.token.charAt(0)}</div>
                        )}
                      </div>
                      <div className="flex gap-1" style={{ marginLeft: 'auto' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmTrade(trade); }}
                          className="btn-buy"
                        >
                          {trade.is_buy ? 'Buy' : 'Sell'}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); rejectTrade(trade.id); }}
                          className="btn-reject"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="token-name" style={{ marginTop: 30 }}>{trade.sector}</div>
                    <div className="token-row">
                      <span className="token-ticker">{trade.token}</span>
                      {displayPrice !== null ? (
                        <span className="token-price">${displayPrice < 1 ? displayPrice.toFixed(6) : displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      ) : (
                        <span className="token-price">—</span>
                      )}
                      <span className="token-badge">{changePrefix}{Math.abs(changePct).toFixed(2)}%</span>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Trade Confirmation Modal */}
          {confirmTrade && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setConfirmTrade(null)}>
              <div className="bg-[#191A1B] border border-stone-800 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-white text-xl font-semibold mb-6">Confirm Trade</h3>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 text-sm">Action</span>
                    <span className={`text-sm font-bold ${confirmTrade.is_buy ? 'text-emerald-500' : 'text-red-500'}`}>
                      {confirmTrade.is_buy ? 'BUY' : 'SELL'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 text-sm">Token</span>
                    <span className="text-white text-sm font-semibold">{confirmTrade.token}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 text-sm">Amount</span>
                    <span className="text-white text-sm font-semibold">${confirmTrade.amount_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 text-sm">Sector</span>
                    <span className="text-white text-sm font-semibold">{confirmTrade.sector}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-stone-400 text-sm">Reason</span>
                    <span className="text-stone-300 text-sm text-right max-w-[200px]">{confirmTrade.reason}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmTrade(null)}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => approveTrade(confirmTrade.id)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white transition-all ${
                      confirmTrade.is_buy
                        ? 'bg-emerald-600 hover:bg-emerald-500'
                        : 'bg-red-600 hover:bg-red-500'
                    }`}
                  >
                    Confirm {confirmTrade.is_buy ? 'Buy' : 'Sell'}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Real-time Execution Logs */}
          <div data-gsap="fadeInRight" className="bg-[#191A1B] border border-stone-800 rounded-3xl p-6 flex flex-col gap-4 flex-grow min-h-[480px] shadow-sm mt-12">
            <div className="flex items-center justify-between pb-3 flex-shrink-0 border-b border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isAgentActive && !isBackendOffline ? 'bg-emerald-500 animate-pulse' : 'bg-stone-500'}`}></span>
                <span className="text-white text-sm font-medium">Real-time execution logs</span>
              </div>
              <button onClick={clearConsole} className="text-stone-400 hover:text-white text-xs transition-colors">Clear console</button>
            </div>
            <div className="flex-grow overflow-y-auto font-mono text-[12px] flex flex-col gap-2 max-h-[360px] pr-2 scrollbar-thin leading-relaxed">
              {isBackendOffline ? (
                <div className="text-amber-600/80 text-center py-12">Connection offline.<br />Start server.py to stream live logs.</div>
              ) : logs.length === 0 ? (
                <div className="text-stone-400 text-center py-12">Console feed empty. Start the agent to log activities.</div>
              ) : (
                [...logs].reverse().map((log, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="text-stone-500 flex-shrink-0 select-none font-mono">[{log.timestamp}]</span>
                    {log.type === 'success' && <span className="text-emerald-500"><strong className="text-emerald-400 mr-1">✓</strong> {formatLogMsg(log.message)}</span>}
                    {log.type === 'warn' && <span className="text-amber-500"><strong className="text-amber-400 mr-1">!</strong> {formatLogMsg(log.message)}</span>}
                    {log.type === 'payment' && <span className="text-[#CDFC74]"><strong className="text-stone-500 mr-1">$</strong> {formatLogMsg(log.message)}</span>}
                    {log.type === 'info' && <span className="text-stone-400"><strong className="text-stone-500 mr-1">i</strong> {formatLogMsg(log.message)}</span>}
                  </div>
                ))
              )}
            </div>
            <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-stone-400">
              <span>Status: <strong className="text-stone-600">{statusText}</strong></span>
              <span>Bsc block: <strong className="text-stone-500">{bscBlock}</strong></span>
            </div>
          </div>

          {/* Supported Coins - Figma Cards Design */}
          <div data-gsap="fadeInUp" className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-8">
              <div className="flex flex-col gap-5 flex-1">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#CDFC74] text-stone-900 text-xs font-medium w-fit">Main</span>
                <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">Supported coins</h2>
                <p className="text-stone-400 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                  Narrative Rotator monitors and trades a curated set of high-conviction assets across AI, Meme, RWA, L2, and DeFi sectors. Our autonomous agent scans on-chain liquidity and narrative heat in real time — expanding supported assets as new narratives emerge, without waiting for manual updates.
                </p>
              </div>
              <div className="shrink-0 -ml-12">
                <img src="/coins.png" alt="Supported coins" className="w-[300px] md:w-[450px] h-auto" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'ERC20', 'BEP20', 'TRC20', 'ARB1', 'Polygon', 'TON', 'Base', 'Avalanche', 'Bitcoin', 'Litecoin', 'Dash', 'Dogecoin', 'Ripple', 'Bitcoin Cash', 'OP', 'OPBNB', 'SOL', 'HYPE'].map((filter) => (
                <span
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                    activeFilter === filter
                      ? 'bg-white text-black'
                      : 'bg-[#191A1B] text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  {filter}
                </span>
              ))}
            </div>
            <div className="relative max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search the coin"
                className="w-full bg-[#191A1B] text-white placeholder-stone-500 rounded-xl pl-11 pr-4 py-3 text-sm outline-none border border-stone-800 focus:border-[#CDFC74]/50 transition-colors shadow-sm"
              />
            </div>

            {searchQuery.trim() !== '' ? (
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-semibold text-white tracking-tight">Search results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {coinsData
                    .filter(c =>
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((coin) => (
                      <div key={coin.symbol} onClick={() => { setSelectedCoin(coin); scrollToServices(); }} className="bg-white rounded-2xl p-6 flex flex-col justify-between h-[152px] relative border border-stone-100 hover:border-[#CDFC74]/50 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md">
                        <div className="w-8 h-8 flex-shrink-0">
                          {coin.icon ? (
                            <img src={coin.icon} alt={coin.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400">
                              {coin.symbol.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col mt-4">
                          <span className="text-stone-900 font-semibold text-sm tracking-tight truncate">{coin.name}</span>
                          <span className="text-stone-400 text-xs font-medium uppercase mt-0.5">{coin.symbol}</span>
                        </div>
                        <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-[#CDFC74] group-hover:text-stone-900 transition-colors duration-300 text-stone-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-semibold text-stone-900 tracking-tight">Popular</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {coinsData
                      .slice(0, 10)
                      .filter(c => activeFilter === 'All' || c.filter === activeFilter)
                      .map((coin) => (
                        <div key={coin.symbol} onClick={() => { setSelectedCoin(coin); scrollToServices(); }} className="bg-white rounded-2xl p-6 flex flex-col justify-between h-[152px] relative border border-stone-100 hover:border-[#CDFC74]/50 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md">
                          <div className="w-8 h-8 flex-shrink-0">
                            {coin.icon ? (
                              <img src={coin.icon} alt={coin.name} className="w-8 h-8 object-contain" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400">
                                {coin.symbol.slice(0, 1)}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col mt-4">
                            <span className="text-stone-900 font-semibold text-sm tracking-tight truncate">{coin.name}</span>
                            <span className="text-stone-400 text-xs font-medium uppercase mt-0.5">{coin.symbol}</span>
                          </div>
                          <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-stone-50 flex items-center justify-center group-hover:bg-[#CDFC74] group-hover:text-stone-900 transition-colors duration-300 text-stone-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">Other</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {coinsData
                      .slice(10)
                      .filter(c => activeFilter === 'All' || c.filter === activeFilter)
                      .map((coin) => (
                        <div key={coin.symbol} onClick={() => { setSelectedCoin(coin); scrollToServices(); }} className="bg-[#191A1B] rounded-2xl p-6 flex flex-col justify-between h-[152px] relative border border-stone-800 hover:border-[#CDFC74]/50 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgba(205,252,116,0.1)]">
                          <div className="w-8 h-8 flex-shrink-0">
                            {coin.icon ? (
                              <img src={coin.icon} alt={coin.name} className="w-8 h-8 object-contain" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-400">
                                {coin.symbol.slice(0, 1)}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col mt-4">
                            <span className="text-white font-semibold text-sm tracking-tight truncate">{coin.name}</span>
                            <span className="text-stone-400 text-xs font-medium uppercase mt-0.5">{coin.symbol}</span>
                          </div>
                          <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-[#CDFC74] group-hover:text-stone-900 transition-colors duration-300 text-stone-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

          </div>
          </GsapSectionAnimation>

        </div>
      </main>

      {/* Full-width Footer Component */}
      <FooterDashboard />

    </div>
  );
}
