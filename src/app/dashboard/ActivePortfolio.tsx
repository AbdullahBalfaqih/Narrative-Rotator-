import React from 'react';

interface ActivePortfolioProps {
  allocation: Record<string, number>;
  portfolioValue: number;
  stablesAllocValue: number;
}

const ActivePortfolio: React.FC<ActivePortfolioProps> = ({ allocation, portfolioValue, stablesAllocValue }) => {
  const getMetricValue = (alloc: Record<string, number>, key: string) => alloc[key] || 0;

  const aiVal = getMetricValue(allocation, 'AI');
  const memeVal = getMetricValue(allocation, 'Meme');
  const rwaVal = getMetricValue(allocation, 'Rwa');
  const l2Val = getMetricValue(allocation, 'L2');
  const defiVal = getMetricValue(allocation, 'DeFi');

  return (
    <div className="relative flex justify-center items-center w-full min-h-[750px]">
      <div className="relative w-[696px] h-[701px]">
        {/* Background Rotating Pattern */}
        <div className="absolute top-[183px] left-[218px] flex justify-center items-center w-[764px] h-[764px] opacity-[0.6] pointer-events-none z-0">
          <img src="/Allocation/images/v122_9470.png" alt="background circle" className="w-[764px] h-[764px] object-contain animate-spin-slow" />
        </div>

        {/* --- Arrows (Decorations) --- */}
        <div className="absolute top-[374px] left-[67px] z-0" style={{ transform: 'rotate(130deg)' }}>
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.062 17.519C33.722 28.537 13.918 8.019 13.918 8.019M13.918 8.019L27.058 19.349M13.918 8.019L11.536 24.321" stroke="#E1F076" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute top-[600px] left-[150px] z-0" style={{ transform: 'rotate(60deg)' }}>
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.062 17.519C33.722 28.537 13.918 8.019 13.918 8.019M13.918 8.019L27.058 19.349M13.918 8.019L11.536 24.321" stroke="#E1F076" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute top-[130px] left-[160px] z-0" style={{ transform: 'rotate(200deg)' }}>
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.062 17.519C33.722 28.537 13.918 8.019 13.918 8.019M13.918 8.019L27.058 19.349M13.918 8.019L11.536 24.321" stroke="#E1F076" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute top-[80px] left-[450px] z-0" style={{ transform: 'rotate(260deg)' }}>
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.062 17.519C33.722 28.537 13.918 8.019 13.918 8.019M13.918 8.019L27.058 19.349M13.918 8.019L11.536 24.321" stroke="#E1F076" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute top-[340px] left-[550px] z-0" style={{ transform: 'rotate(-30deg)' }}>
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.062 17.519C33.722 28.537 13.918 8.019 13.918 8.019M13.918 8.019L27.058 19.349M13.918 8.019L11.536 24.321" stroke="#E1F076" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute top-[580px] left-[460px] z-0" style={{ transform: 'rotate(20deg)' }}>
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M72.062 17.519C33.722 28.537 13.918 8.019 13.918 8.019M13.918 8.019L27.058 19.349M13.918 8.019L11.536 24.321" stroke="#E1F076" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* --- Center Square (v122_9462) --- */}
        <div className="absolute top-[270px] left-[265px] flex flex-col justify-center items-center w-[167px] h-[160px] rounded-[10px] bg-gradient-to-br from-[#222325] to-[#151515] p-5 shadow-xl border border-stone-800 z-10">
           <img src="/Allocation/images/v122_9467.png" alt="Center Star" className="w-[85px] h-[80px] object-contain" />
        </div>

        {/* --- Cards --- */}

        {/* Card 06: Stables (Cash) */}
        <div className="absolute top-[164px] left-[0px] w-[168px] h-[176px] z-20 hover:scale-105 transition-transform">
          <div className="relative w-full h-full bg-gradient-to-br from-[#222325] to-[#151515] rounded-[10px] p-3 pt-4 flex flex-col items-center justify-start border border-stone-800 shadow-xl">
            <img src="/Allocation/images/v122_9442.png" alt="icon" className="w-[85px] h-[80px] object-contain mb-1" />
            <div className="text-white font-sans font-medium text-[15px] text-center leading-[18px]">
              Stables (Cash)
            </div>
            <div className="text-[28px] font-bold text-[#E1F076] mt-1">{stablesAllocValue}%</div>
            <div className="absolute right-[-10px] top-[-10px] flex justify-center items-center w-[30px] h-[30px] rounded-[20px] bg-[#151515]">
              <span className="text-white text-[14px] font-medium leading-[14px]">06</span>
            </div>
          </div>
        </div>

        {/* Card 01: Ai (Fet) */}
        <div className="absolute top-[0px] left-[264px] w-[168px] h-[176px] z-20 hover:scale-105 transition-transform">
          <div className="relative w-full h-full bg-gradient-to-br from-[#222325] to-[#151515] rounded-[10px] p-3 pt-4 flex flex-col items-center justify-start border border-stone-800 shadow-xl">
            <img src="/Allocation/images/v122_9382.png" alt="icon" className="w-[85px] h-[80px] object-contain mb-1" />
            <div className="text-white font-sans font-medium text-[15px] text-center leading-[18px]">
              Ai (Fet)
            </div>
            <div className="text-[28px] font-bold text-[#E1F076] mt-1">{aiVal}%</div>
            <div className="absolute right-[-10px] top-[-10px] flex justify-center items-center w-[30px] h-[30px] rounded-[20px] bg-[#151515]">
              <span className="text-white text-[14px] font-medium leading-[14px]">01</span>
            </div>
          </div>
        </div>

        {/* Card 02: Meme (Pepe) */}
        <div className="absolute top-[164px] left-[528px] w-[168px] h-[176px] z-20 hover:scale-105 transition-transform">
          <div className="relative w-full h-full bg-gradient-to-br from-[#222325] to-[#151515] rounded-[10px] p-3 pt-4 flex flex-col items-center justify-start border border-stone-800 shadow-xl">
            <img src="/Allocation/images/v122_9457.png" alt="icon" className="w-[85px] h-[80px] object-contain mb-1" />
            <div className="text-white font-sans font-medium text-[15px] text-center leading-[18px]">
              Meme (Pepe)
            </div>
            <div className="text-[28px] font-bold text-[#E1F076] mt-1">{memeVal}%</div>
            <div className="absolute right-[-10px] top-[-10px] flex justify-center items-center w-[30px] h-[30px] rounded-[20px] bg-[#151515]">
              <span className="text-white text-[14px] font-medium leading-[14px]">02</span>
            </div>
          </div>
        </div>

        {/* Card 03: Rwa (Ondo) */}
        <div className="absolute top-[360px] left-[528px] w-[168px] h-[176px] z-20 blur-[3px] hover:blur-none transition-all duration-300">
          <div className="relative w-full h-full bg-gradient-to-br from-[#222325] to-[#151515] rounded-[10px] p-3 pt-4 flex flex-col items-center justify-start border border-stone-800 shadow-xl">
            <img src="/Allocation/images/v122_9427.png" alt="icon" className="w-[85px] h-[80px] object-contain mb-1" />
            <div className="text-white font-sans font-medium text-[15px] text-center leading-[18px]">
              Rwa (Ondo)
            </div>
            <div className="text-[28px] font-bold text-[#E1F076] mt-1">{rwaVal}%</div>
            <div className="absolute right-[-10px] top-[-10px] flex justify-center items-center w-[30px] h-[30px] rounded-[20px] bg-[#151515]">
              <span className="text-white text-[14px] font-medium leading-[14px]">03</span>
            </div>
          </div>
        </div>

        {/* Card 04: L2 (Arb) */}
        <div className="absolute top-[525px] left-[264px] w-[168px] h-[176px] z-20 hover:scale-105 transition-transform">
          <div className="relative w-full h-full bg-gradient-to-br from-[#222325] to-[#151515] rounded-[10px] p-3 pt-4 flex flex-col items-center justify-start border border-stone-800 shadow-xl">
            <img src="/Allocation/images/v122_9397.png" alt="icon" className="w-[85px] h-[80px] object-contain mb-1" />
            <div className="text-white font-sans font-medium text-[15px] text-center leading-[18px]">
              L2 (Arb)
            </div>
            <div className="text-[28px] font-bold text-[#E1F076] mt-1">{l2Val}%</div>
            <div className="absolute right-[-10px] top-[-10px] flex justify-center items-center w-[30px] h-[30px] rounded-[20px] bg-[#151515]">
              <span className="text-white text-[14px] font-medium leading-[14px]">04</span>
            </div>
          </div>
        </div>

        {/* Card 05: DeFi (Uni) */}
        <div className="absolute top-[360px] left-[0px] w-[168px] h-[176px] z-20 hover:scale-105 transition-transform">
          <div className="relative w-full h-full bg-gradient-to-br from-[#222325] to-[#151515] rounded-[10px] p-3 pt-4 flex flex-col items-center justify-start border border-stone-800 shadow-xl">
            <img src="/Allocation/images/v122_9412.png" alt="icon" className="w-[85px] h-[80px] object-contain mb-1" />
            <div className="text-white font-sans font-medium text-[15px] text-center leading-[18px]">
              DeFi (Uni)
            </div>
            <div className="text-[28px] font-bold text-[#E1F076] mt-1">{defiVal}%</div>
            <div className="absolute right-[-10px] top-[-10px] flex justify-center items-center w-[30px] h-[30px] rounded-[20px] bg-[#151515]">
              <span className="text-white text-[14px] font-medium leading-[14px]">05</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivePortfolio;
