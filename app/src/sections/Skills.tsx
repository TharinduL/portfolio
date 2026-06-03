import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML / CSS / Tailwind', value: 95 },
  { name: 'JavaScript / ES6+', value: 90 },
  { name: 'PHP / Laravel', value: 88 },
  { name: 'Node.js / Express', value: 85 },
  { name: 'MySQL / Database Design', value: 87 },
  { name: 'REST API Development', value: 90 },
  { name: 'UI/UX & Motion Design', value: 82 },
  { name: 'Git & DevOps', value: 80 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    skills.map(() => 0)
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate bar widths
      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll('.skill-bar-fill');

        bars.forEach((bar, i) => {
          const target = skills[i].value;
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${target}%`,
              duration: 1.2,
              delay: i * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: barsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // Counter animation
        ScrollTrigger.create({
          trigger: barsRef.current,
          start: 'top 75%',
          onEnter: () => {
            skills.forEach((skill, i) => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: skill.value,
                duration: 1.2,
                delay: i * 0.1,
                ease: 'power2.out',
                onUpdate: () => {
                  setAnimatedValues((prev) => {
                    const next = [...prev];
                    next[i] = Math.round(obj.val);
                    return next;
                  });
                },
              });
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-[1] glass-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16">
          {/* Left column */}
          <div>
            <span className="section-label block mb-4">SKILLS</span>
            <h2 className="section-heading mb-4">Technical Expertise</h2>
            <p className="section-body">
              A comprehensive overview of my technical proficiencies across
              frontend, backend, and tooling ecosystems.
            </p>
          </div>

          {/* Right column - skill bars */}
          <div ref={barsRef} className="space-y-6">
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-warm-white">{skill.name}</span>
                  <span className="skill-percent font-mono text-sm text-gold">
                    {animatedValues[i]}%
                  </span>
                </div>
                <div className="h-1.5 bg-warm-gray/15 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full"
                    style={{
                      width: '0%',
                      background:
                        'linear-gradient(90deg, #C9A96E, #D4B87A)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
