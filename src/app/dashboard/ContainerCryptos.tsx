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

const funData = [
  { label: 'Contingency', value: 70, color: '#d6f966' },
  { label: 'Investor', value: 30, color: '#136f84' },
  { label: 'Legal & Regulation', value: 10, color: '#44a08d' },
];

const tokenData = [
  { label: 'Business Development', value: 10, color: '#d6f966' },
  { label: 'Poland', value: 8, color: '#136f84' },
  { label: 'Czech Republic', value: 15, color: '#44a08d' },
  { label: 'Advisors', value: 20, color: '#bdec32' },
  { label: 'Founders', value: 8, color: '#0f5869' },
];

const ContainerCryptos = () => {
  const [soldTokens, setSoldTokens] = useState(6523);
  const [cryptoRate, setCryptoRate] = useState(0.00012);
  const [usdLimit, setUsdLimit] = useState(30000000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSoldTokens(prev => prev + Math.floor(Math.random() * 5) + 1);
      setCryptoRate(prev => {
        const fluctuation = (Math.random() - 0.5) * 0.000002;
        return Math.max(0.00010, prev + fluctuation);
      });
      setUsdLimit(prev => prev + Math.floor(Math.random() * 150));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-10 w-full max-w-[1400px] mx-auto py-10 font-sans">
      
      {/* Top Row: Single Unified Card */}
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-10 w-full rounded-3xl bg-[#010314]/[0.05] border border-stone-200 shadow-sm relative overflow-hidden p-8 md:p-12">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#e1f076]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

        {/* Left Column Content */}
        <div className="flex flex-col justify-center items-center sm:items-start gap-10 w-full xl:w-5/12 relative z-10">
          <div className="flex flex-col justify-center items-center sm:items-start gap-6 w-full">
            <div className="flex flex-col justify-center items-start gap-6 w-full">
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] name_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Name:
                </div>
                <div className="flex flex-col items-start cryption text-stone-400 font-sans text-xl leading-[1.875rem]">
                  Cryption
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
                  28,000,000 USD
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] exchange_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Exchange:
                </div>
                <div className="flex flex-col items-start val-1eth text-stone-400 font-sans text-xl leading-[1.875rem]">
                  1ETH = 2,700 CRN
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-6 w-full mt-4 sm:mt-0">
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] currency_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Currency:
                </div>
                <div className="flex flex-col items-start eth__btc text-stone-400 font-sans text-xl leading-[1.875rem]">
                  ETH, BTC
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] min_purchase_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Min purchase:
                </div>
                <div className="flex flex-col items-start val-0-1eth text-stone-400 font-sans text-xl leading-[1.875rem]">
                  0.1ETH/240 CRN 
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] starts_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Starts:
                </div>
                <div className="flex flex-col items-start december_4__9_00_am_ text-stone-400 font-sans text-xl leading-[1.875rem]">
                  December 4 (9:00 AM)
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-10 w-full">
                <div className="flex flex-col items-start w-[7.875rem] ends_ text-white font-sans text-xl leading-[1.875rem] font-medium">
                  Ends:
                </div>
                <div className="flex flex-col items-start february_27__11_59_pm_ text-stone-400 font-sans text-xl leading-[1.875rem]">
                  February 27 (11:59 PM)
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
                  Sold CRO token
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
            1 CRYPTOS = {cryptoRate.toFixed(6)} BTC
          </div>
        </div>
      </div>
      
      {/* Bottom Row: Unified Card for Distributions */}
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch gap-10 w-full rounded-3xl bg-[#010314]/[0.05] border border-stone-200 shadow-sm p-8 md:p-12 relative overflow-hidden">
        
        {/* Fun Distribution */}
        <div className="flex flex-col sm:flex-row justify-center items-center w-full xl:w-5/12 gap-8">
          <div className="flex justify-center items-center w-32 h-32 sm:w-[12.5rem] sm:h-[12.5rem] rounded-full relative group shrink-0">
            <div className="w-[12.5rem] h-[12.5rem] flex items-center justify-center scale-[0.6] sm:scale-100 origin-center transition-transform duration-500 group-hover:scale-[0.65] sm:group-hover:scale-105">
              <DoughnutChart data={funData} size={200} strokeWidth={45} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-start gap-6 w-full">
            <div className="fun_distribution text-white font-sans text-xl sm:text-2xl font-semibold leading-7">
              Fun distribution
            </div>
            <div className="flex flex-col justify-center items-start gap-4 w-full">
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#d6f966]"></div>
                <div className="contingency__70_ text-white font-sans font-medium leading-7">
                  Contingency: 70%
                </div>
              </div>
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#136f84]"></div>
                <div className="investor__30_ text-white font-sans font-medium leading-7">
                  Investor: 30%
                </div>
              </div>
              <div className="flex items-center gap-2.5 w-full">
                <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#44a08d]"></div>
                <div className="legal___regulation__10_ text-white font-sans font-medium leading-7">
                  Legal & Regulation: 10%
                </div>
              </div>
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
                <div className="flex items-center gap-2.5">
                  <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#d6f966]"></div>
                  <div className="business_development__10_ text-white font-sans font-medium leading-7">
                    Business Development: 10%
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#136f84]"></div>
                  <div className="poland__8_ text-white font-sans font-medium leading-7">
                    Poland: 8%
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#44a08d]"></div>
                  <div className="czech_republic__15_ text-white font-sans font-medium leading-7">
                    Czech Republic: 15%
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#bdec32]"></div>
                  <div className="val-20-advisors text-white font-sans font-medium leading-7">
                    20% Advisors
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-[1.1875rem] h-[1.1875rem] rounded-full bg-[#0f5869]"></div>
                  <div className="val-8-founders text-white font-sans font-medium leading-7">
                    8% Founders
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContainerCryptos;
