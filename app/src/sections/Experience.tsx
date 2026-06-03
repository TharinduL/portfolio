import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'M.D. Gunasena iRead Management System (iRMS)',
    description:
      'Management platform for handling digital reading systems and internal workflows.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
  },
  {
    name: 'ODTF Main Website',
    description:
      'Official responsive website for Organ Donation and Transplantation Foundation focused on accessibility.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
  },
  {
    name: 'Oasis International School Student Payment System',
    description:
      'Student payment and financial management platform with secure transaction processing.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Payment Integration'],
  },
  {
    name: 'Evoucher.lk',
    description:
      'Digital voucher and online payment platform for seamless e-commerce experiences.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
  },
  {
    name: 'M.D. Gunasena Staff Management System',
    description:
      'Internal employee and workflow management system with role-based access control.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Admin Dashboard'],
  },
  {
    name: 'M.D. Gunasena Customer Survey System',
    description:
      'Customer feedback and survey management platform with analytics dashboard.',
    tags: ['Laravel', 'PHP', 'Chart.js', 'MySQL'],
  },
  {
    name: 'M.D. Gunasena Malalasekara Dictionary Web App',
    description:
      'Web-based digital dictionary application with optimized search functionality.',
    tags: ['Laravel', 'PHP', 'Elasticsearch', 'MySQL'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline center line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards stagger in alternately
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-[1] glass-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="section-label block mb-4">EXPERIENCE</span>
        <h2 className="section-heading mb-16">Professional Work</h2>

        <div className="relative">
          {/* Timeline center line - desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2"
            style={{ transformOrigin: 'top' }}
          />

          {/* Project cards */}
          <div className="space-y-8 md:space-y-12">
            {projects.map((project, i) => (
              <div
                key={project.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative md:w-[calc(50%-32px)] ${
                  i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}
                style={{ opacity: 0 }}
              >
                {/* Timeline dot - desktop only */}
                <div
                  className={`hidden md:block absolute top-6 w-3 h-3 rounded-full bg-gold/60 border-2 border-gold ${
                    i % 2 === 0 ? '-right-[38px]' : '-left-[38px]'
                  }`}
                />

                <div className="group bg-dark-light/70 border border-gold/[0.15] rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,169,110,0.08)]">
                  <h3 className="font-display text-lg md:text-xl font-medium text-warm-white mb-3">
                    {project.name}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded bg-gold/10 text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
