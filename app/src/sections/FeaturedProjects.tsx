import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    name: 'Vehicle Expense Tracker',
    description:
      'Comprehensive vehicle management and expense tracking system with insightful analytics.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/project-vehicle.jpg',
  },
  {
    name: 'Luxury Sri Lanka Travel Platform',
    description:
      'Immersive travel booking platform showcasing Sri Lanka\'s luxury destinations with cinematic visuals.',
    tags: ['Next.js', 'Tailwind', 'GSAP'],
    image: '/project-travel.jpg',
  },
  {
    name: 'Full Stack Admin Dashboard',
    description:
      'Modern admin dashboard with real-time data visualization, user management, and analytics.',
    tags: ['React', 'Laravel', 'MySQL'],
    image: '/project-dashboard.jpg',
  },
  {
    name: 'Car Community Platform',
    description:
      'Social platform for automotive enthusiasts to connect, share, and discover vehicles.',
    tags: ['Node.js', 'Socket.io', 'Express'],
    image: '/project-car.jpg',
  },
  {
    name: 'Real-time Chat Application',
    description:
      'Feature-rich messaging app with real-time communication, file sharing, and group chats.',
    tags: ['React', 'Socket.io', 'Node.js'],
    image: '/project-chat.jpg',
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, x: 80 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="projects"
      ref={sectionRef}
      className="relative z-[1] opaque-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="section-label block mb-4">FEATURED</span>
        <h2 className="section-heading mb-4">Personal Projects</h2>
        <p className="text-warm-gray max-w-xl mb-12">
          A selection of creative and technical projects built to explore modern
          web technologies.
        </p>

        <div
          ref={cardsRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory"
        >
          {featuredProjects.map((project) => (
            <div
              key={project.name}
              className="project-card flex-shrink-0 w-[320px] md:w-[400px] snap-start"
              style={{ opacity: 0 }}
            >
              <div className="h-[480px] rounded-xl overflow-hidden bg-dark-light/80 border border-gold/[0.15] group hover:border-gold/40 transition-all duration-300">
                {/* Image */}
                <div className="h-[55%] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="h-[45%] p-6 flex flex-col">
                  <h3 className="font-display text-lg font-medium text-warm-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-gold/10 text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all"
                    onClick={() => alert('Project details coming soon!')}
                  >
                    View Project <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
