import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CurrentlyBuilding() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="building"
      ref={sectionRef}
      className="relative z-[1] opaque-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <span className="section-label block mb-8 text-center">NOW</span>

        <div
          ref={cardRef}
          className="relative rounded-[20px] p-10 md:p-16 text-center overflow-hidden"
          style={{
            background: 'rgba(28, 26, 23, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(201, 169, 110, 0.2)',
            opacity: 0,
          }}
        >
          {/* Animated rotating border effect */}
          <div
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{
              background:
                'conic-gradient(from var(--angle, 0deg), transparent 0%, #C9A96E 10%, transparent 20%)',
              opacity: 0.15,
              animation: 'border-rotate 4s linear infinite',
            }}
          />

          <blockquote className="relative z-10">
            <p className="font-display text-xl md:text-[28px] font-light text-warm-white leading-relaxed italic">
              "Currently building immersive cinematic web applications inspired
              by modern luxury interfaces, automotive culture, and scalable
              backend systems."
            </p>
            <footer className="mt-6">
              <cite className="font-mono text-xs text-warm-gray not-italic">
                — Tharindu Lakshan Ranaweera
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
