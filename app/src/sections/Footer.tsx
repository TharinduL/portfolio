export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Projects', target: '#projects' },
    { label: 'Tech Stack', target: '#techstack' },
    { label: 'Contact', target: '#contact' },
  ];

  return (
    <footer className="relative z-[1] bg-[rgba(10,9,8,0.95)] border-t border-warm-gray/10 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="font-display text-sm font-medium text-warm-white">
              Tharindu Ranaweera
            </p>
            <p className="text-xs text-warm-gray mt-1">
              Full Stack Web Developer
            </p>
          </div>

          {/* Center nav */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="text-[13px] text-warm-gray hover:text-warm-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <p className="font-mono text-xs text-warm-gray">
            2026 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
