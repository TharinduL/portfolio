import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Instagram, Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-[1] opaque-section py-24 md:py-32 border-t border-gold/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <span className="section-label block mb-4">CONTACT</span>
            <h2 className="section-heading mb-6">Let's Work Together</h2>
            <p className="section-body mb-8">
              Have a project in mind? Let's create something extraordinary
              together. I'm always open to discussing new opportunities and
              creative collaborations.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <Mail size={18} className="text-gold" />
              <a
                href="mailto:tharindulakshan.work@gmail.com"
                className="text-warm-white hover:text-gold transition-colors"
              >
                tharindulakshan.work@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-105 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right column - form */}
          <div
            ref={rightRef}
            className="glass-card rounded-2xl p-8 md:p-10"
            style={{ opacity: 0 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                  <Send size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-xl text-warm-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-warm-gray text-sm">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-dark/50 border border-warm-gray/20 rounded-lg px-4 py-3.5 text-sm text-warm-white placeholder:text-warm-gray focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-dark/50 border border-warm-gray/20 rounded-lg px-4 py-3.5 text-sm text-warm-white placeholder:text-warm-gray focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-dark/50 border border-warm-gray/20 rounded-lg px-4 py-3.5 text-sm text-warm-white placeholder:text-warm-gray focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-dark/50 border border-warm-gray/20 rounded-lg px-4 py-3.5 text-sm text-warm-white placeholder:text-warm-gray focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)] focus:outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary py-4"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
