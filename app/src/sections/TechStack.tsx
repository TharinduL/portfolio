import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: 'Frontend',
    items: [
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'JavaScript',
      'GSAP',
      'Responsive Design',
      'Modern UI/UX',
      'Motion UI Systems',
    ],
  },
  {
    title: 'Backend',
    items: [
      'PHP',
      'Laravel',
      'Node.js',
      'Express.js',
      'MySQL',
      'REST APIs',
      'Authentication Systems',
      'Backend Architecture',
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      'GitHub',
      'Postman',
      'cPanel',
      'Vercel',
      'Netlify',
      'Figma',
    ],
  },
];

const floatingTech = [
  'React', 'Vue', 'TypeScript', 'Python', 'Docker', 'AWS',
  'GraphQL', 'Redis', 'Nginx', 'Webpack', 'Sass', 'Git',
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Individual tech items
        cardsRef.current.querySelectorAll('.tech-item').forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3 + i * 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="relative z-[1] glass-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="section-label block mb-4">TECH STACK</span>
        <h2 className="section-heading mb-12">Technologies I Work With</h2>

        {/* Three category cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {techCategories.map((cat) => (
            <div
              key={cat.title}
              className="glass-card rounded-2xl p-6 md:p-8"
              style={{ opacity: 0 }}
            >
              <h3 className="font-display text-xl font-medium text-warm-white mb-6">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating tech particles */}
        <div
          ref={floatingRef}
          className="relative h-[300px] overflow-hidden rounded-xl border border-gold/10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark/80" />
          {floatingTech.map((tech, i) => (
            <div
              key={tech}
              className="absolute flex items-center justify-center w-16 h-16 rounded-full border border-gold/20 bg-gold/5"
              style={{
                left: `${(i % 4) * 25 + 10 + Math.random() * 10}%`,
                animation: `float-up ${8 + Math.random() * 7}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <span className="font-mono text-[9px] text-gold/80">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
