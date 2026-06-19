"use client";

import React from 'react';

export interface ColumnItem {
  icon?: string;
  iconClass?: string;
  iconSize?: string;
  iconContainerClass?: string;
  title: string;
  subtitle: string;
  bullets?: string[];
}

export interface SectionData {
  title: string;
  subtitle: string;
  columns: ColumnItem[];
}

interface DetailsSectionProps {
  sections: SectionData[];
}

const DetailsSection = ({ sections }: DetailsSectionProps) => {
  return (
    <div className="flex flex-col gap-8 w-full font-sans">
      <div className="w-full flex flex-col relative">
        {sections.map((section, sIdx) => (
          <React.Fragment key={sIdx}>
            <div className="flex flex-col pt-8 md:pt-12 px-4 md:px-8">
              {/* Section Header */}
              <div className="flex flex-col gap-2 mb-10">
                <h2 className="text-white text-3xl font-medium">{section.title}</h2>
                <p className="text-[rgba(255,255,255,0.7)] text-xl">{section.subtitle}</p>
              </div>

              {/* Columns */}
              <div className="flex flex-col xl:flex-row w-full">
                {section.columns.map((col, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <div className="flex-1 flex flex-col relative group transition-colors duration-300 rounded-xl">
                      {/* Icon - Enlarged and without background shape */}
                      {col.icon && (
                        <div className={`mb-10 flex items-center justify-center ${col.iconContainerClass || 'h-[150px]'}`}>
                          <img 
                            src={col.icon} 
                            alt={col.title} 
                            className={`${col.iconSize || 'w-[150px] h-[150px]'} group-hover:scale-105 transition-transform duration-300 drop-shadow-2xl ${col.iconClass || 'object-contain'}`} 
                          />
                        </div>
                      )}

                      {/* Title & Subtitle */}
                      <div className="flex flex-col gap-3 min-h-[80px]">
                        <h3 className="text-white text-2xl font-semibold leading-tight">{col.title}</h3>
                        <p className="text-[rgba(255,255,255,0.75)] text-xl font-normal leading-relaxed break-all">{col.subtitle}</p>
                      </div>

                      {/* Divider */}
                      {col.bullets && col.bullets.length > 0 && (
                        <div className="w-full h-px bg-[rgba(255,255,255,0.15)] my-6"></div>
                      )}

                      {/* Bullets */}
                      {col.bullets && col.bullets.length > 0 && (
                        <div className="flex flex-col gap-5 flex-1">
                          {col.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#D6F966] mt-2.5 shrink-0 shadow-[0_0_10px_rgba(214,249,102,0.5)]"></div>
                              <p className="text-white text-xl leading-relaxed break-words">{bullet}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vertical Divider for Desktop, Horizontal for Mobile */}
                    {cIdx < section.columns.length - 1 && (
                      <>
                        <div className="hidden xl:block w-px bg-[rgba(255,255,255,0.15)] mx-8 shrink-0"></div>
                        <div className="block xl:hidden w-full h-px bg-[rgba(255,255,255,0.15)] my-8 shrink-0"></div>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Horizontal Divider between Sections */}
            {sIdx < sections.length - 1 && (
              <div className="w-full h-px bg-[rgba(255,255,255,0.15)]"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DetailsSection;
