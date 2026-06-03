import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Server,
  Plug,
  Palette,
  Monitor,
  LayoutDashboard,
  Zap,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: 'Full Stack Web Development',
    description:
      'End-to-end web application development with modern frontend and robust backend architecture.',
  },
  {
    icon: Server,
    title: 'Backend System Development',
    description:
      'Scalable server-side solutions with secure APIs and efficient database management.',
  },
  {
    icon: Plug,
    title: 'API Development',
    description:
      'RESTful API design and implementation with comprehensive documentation and testing.',
  },
  {
    icon: Palette,
    title: 'Modern UI/UX Development',
    description:
      'Cinematic user interfaces with smooth animations and intuitive user experiences.',
  },
  {
    icon: Monitor,
    title: 'Responsive Website Development',
    description:
      'Pixel-perfect websites that look stunning on every device and screen size.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Systems',
    description:
      'Data-driven admin panels and analytics dashboards with real-time visualization.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Speed and efficiency improvements for faster load times and better user retention.',
  },
  {
    icon: Layers,
    title: 'Web Application Architecture',
    description:
      'Scalable system design with clean code patterns and maintainable structure.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="services"
      ref={sectionRef}
      className="relative z-[1] opaque-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="section-label block mb-4">SERVICES</span>
        <h2 className="section-heading mb-12">What I Can Do For You</h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="service-card group bg-dark-light/50 border border-warm-gray/10 rounded-xl p-8 transition-all duration-300 hover:border-gold/30 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
                style={{ opacity: 0 }}
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-medium text-warm-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
