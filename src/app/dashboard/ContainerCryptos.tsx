"use client";

import React, { useState, useEffect } from 'react';
import './cryptos.css';
import WorldMap from '../../components/ui/world-map';

const DoughnutChart = ({ data, size = 200, strokeWidth = 40 }: { data: any[], size?: number, strokeWidth?: number }) => {
  const [mounted, setMounted] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  let currentOffset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="#f5f5f4" strokeWidth={strokeWidth} />
      {data.map((item, index) => {
        const percentage = total > 0 ? item.value / total : 0;
        const strokeDasharray = `${percentage * circumference} ${circumference}`;
        const offset = -currentOffset;
        currentOffset += percentage * circumference;

        return (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={mounted ? strokeDasharray : `0 ${circumference}`}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out cursor-pointer hover:opacity-80"
            style={{ transitionDelay: `${index * 150}ms` }}
          />
        );
      })}
    </svg>
  );
};

const fundData = [
  { label: 'Development & AI R&D', value: 50, color: '#d6f966' },
  { label: 'Marketing & BD', value: 25, color: '#136f84' },
  { label: 'Operations & Legal', value: 15, color: '#44a08d' },
  { label: 'Liquidity Provision', value: 10, color: '#bdec32' },
];

const tokenData = [
  { label: 'Ecosystem & Rewards', value: 40, color: '#d6f966' },
  { label: 'Investors & Public', value: 30, color: '#136f84' },
  { label: 'Team & Advisors', value: 20, color: '#44a08d' },
  { label: 'Liquidity & Exchange', value: 10, color: '#bdec32' },
];

import { type Coin } from './coinsData';

const ContainerCryptos = ({ selectedCoin }: { selectedCoin: Coin | null }) => {
  const [soldTokens, setSoldTokens] = useState(1542300);
  const [cryptoRate, setCryptoRate] = useState(0.000021);
  const [usdLimit, setUsdLimit] = useState(5000000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSoldTokens(prev => prev + Math.floor(Math.random() * 50) + 10);
      setCryptoRate(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.0000005;
        return Math.max(0.000015, prev + fluctuation);
      });
      setUsdLimit(prev => prev + Math.floor(Math.random() * 150));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1400px] mx-auto py-10 font-sans">
      
      {/* Top Row: Single Unified Card */}
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-10 w-full rounded-3xl bg-[#010314]/[0.05] shadow-sm relative overflow-hidden p-8 md:p-12">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#e1f076]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Left Column Content */}
        <div className="flex flex-col justify-center items-center sm:items-start gap-10 w-full xl:w-5/12 relative z-10">
          <div className="flex flex-col justify-center items-center sm:items-start gap-6 w-full">
            <div className="flex flex-col justify-center items-start gap-6 w-full">
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] name_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Name:
                </div>
                <div className="flex flex-col items-start text-[#e1f076] font-sans text-xl leading-[1.875rem] font-bold">
                  {selectedCoin ? `${selectedCoin.name} (${selectedCoin.symbol})` : 'Narrative (NARR)'}
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] fixed_limit_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Fixed limit:
                </div>
                <div className="flex flex-col items-start val-30m text-stone-400 font-sans text-xl leading-[1.875rem] transition-all duration-300">
                  {usdLimit.toLocaleString()} USD
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] soft_cap_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Soft cap:
                </div>
                <div className="flex flex-col items-start val-28m text-stone-400 font-sans text-xl leading-[1.875rem]">
                  1,500,000 USD
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] exchange_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Exchange:
                </div>
                <div className="flex flex-col items-start val-1eth text-stone-400 font-sans text-xl leading-[1.875rem]">
                  1 ETH = 50,000 {selectedCoin ? selectedCoin.symbol : 'NARR'}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-6 w-full mt-4 sm:mt-0">
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] currency_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Currency:
                </div>
                <div className="flex flex-col items-start eth__btc text-stone-400 font-sans text-xl leading-[1.875rem]">
                  ETH, USDT, USDC
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] min_purchase_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Min purchase:
                </div>
                <div className="flex flex-col items-start val-0-1eth text-stone-400 font-sans text-xl leading-[1.875rem]">
                  0.05 ETH / 2,500 {selectedCoin ? selectedCoin.symbol : 'NARR'}
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] starts_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Starts:
                </div>
                <div className="flex flex-col items-start december_4__9_00_am_ text-stone-400 font-sans text-xl leading-[1.875rem]">
                  August 15 (12:00 PM UTC)
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] ends_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Ends:
                </div>
                <div className="flex flex-col items-start february_27__11_59_pm_ text-stone-400 font-sans text-xl leading-[1.875rem]">
                  September 30 (11:59 PM UTC)
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center w-[11.4375rem] h-11 rounded-full bg-[#e1f076] cursor-pointer hover:bg-[#d5e65a] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 shadow-sm z-10">
            <div className="text-[#151515] text-center font-sans text-sm font-semibold leading-[14px]">
              Get Started Now
            </div>
          </div>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden xl:block w-px bg-stone-800/60 my-4" />
        
        {/* Right Column Content: World Map Area */}
        <div className="flex flex-col justify-center items-center w-full xl:w-7/12 relative overflow-hidden">
          <div className="w-full relative flex flex-col items-center justify-center min-h-[300px]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none bg-transparent px-6 py-3 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e1f076] animate-pulse"></span>
                <div className="sold_cro_token text-white font-sans text-lg md:text-xl leading-6 font-medium">
                  Sold {selectedCoin ? selectedCoin.symbol : 'NARR'} tokens
                </div>
              </div>
              <div className="val-6523 text-[#e1f076] text-center font-sans text-3xl md:text-[2.2rem] font-bold leading-none mt-2 transition-all duration-300">
                {soldTokens.toLocaleString()}
              </div>
            </div>

            <div className="w-full scale-110 md:scale-100 z-10 pt-16 xl:pt-4">
              <WorldMap 
                lineColor="#e1f076"
                dots={[
                  { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 51.5074, lng: -0.1278 } },
                  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 25.2048, lng: 55.2708 } },
                  { start: { lat: 25.2048, lng: 55.2708 }, end: { lat: 1.3521, lng: 103.8198 } },
                  { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: 35.6762, lng: 139.6503 } },
                  { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: 13.7942, lng: -88.8965 } },
                  { start: { lat: 13.7942, lng: -88.8965 }, end: { lat: 40.7128, lng: -74.0060 } },
                ]}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center w-full val-1-cryptos text-white text-center font-sans text-2xl sm:text-[2.5rem] font-bold leading-10 sm:leading-[48px] mt-8 xl:mt-auto relative z-20 transition-all duration-300">
            1 {selectedCoin ? selectedCoin.symbol : 'NARR'} = {cryptoRate.toFixed(6)} BTC
          </div>
        </div>
      </div>
      
      {/* Bottom Row: Unified Card for Distributions */}
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-10 w-full rounded-3xl bg-[#010314]/[0.05] shadow-sm p-8 md:p-12 relative overflow-hidden">
        
        {/* Fund Distribution */}
        <div className="flex flex-col sm:flex-row justify-center items-center w-full xl:w-5/12 gap-8">
          <div className="flex justify-center items-center w-32 h-32 sm:w-[12.5rem] sm:h-[12.5rem] rounded-full relative group shrink-0">
            <div className="w-[12.5rem] h-[12.5rem] flex items-center justify-center scale-[0.6] sm:scale-100 origin-center transition-transform duration-500 group-hover:scale-[0.65] sm:group-hover:scale-105">
              <DoughnutChart data={fundData} size={200} strokeWidth={45} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-6 w-full">
            <div className="fun_distribution text-white font-sans text-xl sm:text-2xl font-semibold leading-7">
              Fund distribution
            </div>
            <div className="flex flex-col justify-center items-start gap-4 w-full">
              {fundData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 w-full">
                  <div className="w-[1.1875rem] h-[1.1875rem] rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div className="text-white font-sans font-medium leading-7">
                    {item.label}: {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Divider for Desktop */}
        <div className="hidden xl:block w-px bg-stone-800/60 my-4" />
        {/* Horizontal Divider for Mobile */}
        <div className="block xl:hidden h-px w-full bg-stone-800/60" />
        
        {/* Token Distribution */}
        <div className="flex flex-col sm:flex-row justify-center items-center w-full xl:w-7/12 gap-8">
          <div className="flex justify-center items-center w-32 h-32 sm:w-[12.5rem] sm:h-[12.5rem] rounded-full relative group shrink-0">
            <div className="w-[12.5rem] h-[12.5rem] flex items-center justify-center scale-[0.6] sm:scale-100 origin-center transition-transform duration-500 group-hover:scale-[0.65] sm:group-hover:scale-105">
              <DoughnutChart data={tokenData} size={200} strokeWidth={45} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-6 w-full">
            <div className="token_distribution text-white font-sans text-xl sm:text-2xl font-semibold leading-7">
              Token distribution
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-6 w-full">
              <div className="flex flex-col justify-center items-start gap-4">
                {tokenData.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-[1.1875rem] h-[1.1875rem] rounded-full" style={{ backgroundColor: item.color }}></div>
                    <div className="text-white font-sans font-medium leading-7">
                      {item.label}: {item.value}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-start gap-4">
                {tokenData.slice(2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-[1.1875rem] h-[1.1875rem] rounded-full" style={{ backgroundColor: item.color }}></div>
                    <div className="text-white font-sans font-medium leading-7">
                      {item.label}: {item.value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContainerCryptos;
