import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Title letter stagger
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
        }
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );

    // CTAs
    tl.fromTo(
      ctaRef.current?.children || [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.3'
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '+=1.5'
    );
  }, []);

  const scrollTo = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(id, { offset: -64 });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'Tharindu Ranaweera';

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-end z-[1] px-6 md:px-12 pb-16 md:pb-24"
      style={{
        background:
          'linear-gradient(to top, rgba(10,9,8,0.9) 0%, rgba(10,9,8,0.4) 40%, transparent 100%)',
      }}
    >
      <div className="max-w-4xl">
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-warm-white tracking-[-0.02em] mb-4"
        >
          {titleText.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ opacity: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.1em] text-gold mb-6"
          style={{ opacity: 0 }}
        >
          Full Stack Web Application Developer
        </p>

        <p
          ref={taglineRef}
          className="text-base md:text-lg text-warm-gray max-w-[540px] leading-relaxed mb-8"
          style={{ opacity: 0 }}
        >
          Crafting Cinematic Digital Experiences with Modern Frontend & Powerful
          Backend Systems
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <button onClick={() => scrollTo('#projects')} className="btn-primary">
            View Projects
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-secondary">
            Contact Me
          </button>
          <a
            href="#"
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              alert('CV download coming soon!');
            }}
          >
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ opacity: 0 }}
      >
        <div className="relative w-px h-10 bg-warm-gray/50 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
