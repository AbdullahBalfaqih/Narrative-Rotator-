"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animations: Record<string, gsap.TweenVars> = {
  fadeInUp: {
    opacity: 0,
    y: 80,
    scale: 0.97,
    duration: 1,
    ease: "power3.out",
  },
  fadeInLeft: {
    opacity: 0,
    x: -80,
    duration: 1.1,
    ease: "power2.out",
  },
  fadeInRight: {
    opacity: 0,
    x: 80,
    duration: 1.1,
    ease: "power2.out",
  },
  zoomIn: {
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: "back.out(1.7)",
  },
  blurIn: {
    opacity: 0,
    filter: "blur(8px)",
    y: 40,
    duration: 1,
    ease: "power3.out",
  },
  staggerItems: {
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power2.out",
  },
};

export default function GsapSectionAnimation({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sections = el.querySelectorAll<HTMLElement>("[data-gsap]");

    sections.forEach((section) => {
      const type = section.dataset.gsap || "fadeInUp";

      if (type === "staggerItems") {
        const items = section.querySelectorAll<HTMLElement>("[data-gsap-item]");
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play reverse play reverse",
                scrub: 1,
              },
            }
          );
          return;
        }
      }

      const vars = animations[type] || animations.fadeInUp;
      gsap.fromTo(
        section,
        vars,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 30%",
            toggleActions: "play reverse play reverse",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
