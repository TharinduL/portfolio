import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import TunnelScene from './three/TunnelScene';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import FeaturedProjects from './sections/FeaturedProjects';
import TechStack from './sections/TechStack';
import Services from './sections/Services';
import Skills from './sections/Skills';
import CurrentlyBuilding from './sections/CurrentlyBuilding';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      // Initialize Lenis smooth scroll
      const lenis = new Lenis({
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Three.js tunnel background - fixed behind everything */}
      <TunnelScene />

      {/* Navigation */}
      <Navigation lenisRef={lenisRef} />

      {/* Main content */}
      <main className="relative z-[1]">
        <Hero lenisRef={lenisRef} />
        <About />
        <Experience />
        <FeaturedProjects />
        <TechStack />
        <Services />
        <Skills />
        <CurrentlyBuilding />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
