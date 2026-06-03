import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
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
      id="about"
      ref={sectionRef}
      className="relative z-[1] opaque-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <span className="section-label block mb-4">ABOUT</span>
            <h2 className="section-heading mb-6">
              Building Digital Experiences That Inspire
            </h2>
            <p className="section-body">
              I'm Tharindu Lakshan Ranaweera, a passionate Full Stack Web
              Application Developer focused on building modern, cinematic, and
              high-performance digital experiences. I specialize in creating
              immersive frontend interfaces using modern technologies while
              developing powerful backend architectures. My approach combines
              clean engineering with creative visual storytelling — blending
              smooth UI interactions, responsive design, scalable backend
              systems, and premium user experiences into every project I build.
            </p>
          </div>

          {/* Right column */}
          <div ref={rightRef} className="relative" style={{ opacity: 0 }}>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/about-portrait.jpg"
                alt="Tharindu Ranaweera"
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Glass stat card */}
            <div
              ref={statsRef}
              className="absolute -bottom-6 -left-6 glass-card rounded-lg p-6"
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Completed' },
                { value: '20+', label: 'Happy Clients' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-3 mb-3 last:mb-0">
                  <span className="font-display text-2xl md:text-3xl font-bold text-warm-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-warm-gray">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
