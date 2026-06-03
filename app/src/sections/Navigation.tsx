import { useEffect, useState, useCallback } from 'react';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      setMenuOpen(false);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(id, { offset: -64 });
      } else {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [lenisRef]
  );

  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Projects', target: '#projects' },
    { label: 'Tech Stack', target: '#techstack' },
    { label: 'Contact', target: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,9,8,0.8)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <button
          onClick={() => scrollTo('#hero')}
          className="font-display text-sm font-medium uppercase tracking-[0.08em] text-warm-white hover:text-gold transition-colors"
        >
          Tharindu Ranaweera
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="text-sm text-warm-gray hover:text-warm-white transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-warm-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-warm-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-warm-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(10,9,8,0.95)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="font-display text-3xl text-warm-white hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
