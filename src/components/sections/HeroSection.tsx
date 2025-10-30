'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Code, ShieldCheck, CloudCog, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import './HeroSection.css';

const constellations = [
  {
    id: 'ai',
    name: 'Inteligencia Artificial',
    description: 'Recomendaciones y análisis predictivo.',
    icon: Cpu,
    href: '/services',
    position: { top: '20%', left: '15%' },
    lines: [
      { from: { x: 0, y: 0 }, to: { x: 50, y: 30 } },
      { from: { x: 50, y: 30 }, to: { x: 30, y: 80 } },
      { from: { x: 50, y: 30 }, to: { x: 100, y: 10 } },
    ],
  },
  {
    id: 'dev',
    name: 'Desarrollo de Software',
    description: 'Soluciones a medida para tus necesidades.',
    icon: Code,
    href: '/services',
    position: { top: '30%', left: '70%' },
    lines: [
      { from: { x: 0, y: 50 }, to: { x: 40, y: 0 } },
      { from: { x: 40, y: 0 }, to: { x: 80, y: 50 } },
      { from: { x: 80, y: 50 }, to: { x: 40, y: 100 } },
      { from: { x: 40, y: 100 }, to: { x: 0, y: 50 } },
    ],
  },
  {
    id: 'security',
    name: 'Ciberseguridad',
    description: 'Protección robusta para tus activos.',
    icon: ShieldCheck,
    href: '/services',
    position: { top: '70%', left: '10%' },
    lines: [
      { from: { x: 10, y: 0 }, to: { x: 70, y: 0 } },
      { from: { x: 40, y: 0 }, to: { x: 40, y: 100 } },
      { from: { x: 0, y: 50 }, to: { x: 80, y: 50 } },
    ],
  },
  {
    id: 'cloud',
    name: 'Infraestructura Cloud',
    description: 'Escalabilidad y eficiencia en la nube.',
    icon: CloudCog,
    href: '/services',
    position: { top: '65%', left: '80%' },
    lines: [
        { from: { x: 0, y: 20 }, to: { x: 40, y: 0 } },
        { from: { x: 40, y: 0 }, to: { x: 80, y: 20 } },
        { from: { x: 40, y: 0 }, to: { x: 40, y: 60 } },
        { from: { x: 0, y: 80 }, to: { x: 80, y: 80 } },
    ],
  },
];

const Star = ({ style }: { style: React.CSSProperties }) => (
  <div className="star" style={style}></div>
);

type StarStyle = {
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
};

export function HeroSection() {
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);
  const [stars, setStars] = useState<StarStyle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const generateStars = () => {
        const newStars = Array.from({ length: 100 }, () => ({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 5 + 5}s`,
        }));
        setStars(newStars);
      };
      generateStars();
    }
  }, [isClient]);


  return (
    <section className="hero-container">
      <div className="stars-bg">
        {stars.map((style, i) => (
          <Star key={i} style={style} />
        ))}
      </div>
      <div className={cn('constellation-group', activeConstellation && 'zoomed-out')}>
        {constellations.map((constellation) => (
          <motion.div
            key={constellation.id}
            className="constellation"
            style={{ top: constellation.position.top, left: constellation.position.left }}
            onClick={() => setActiveConstellation(constellation.id)}
            whileHover={{ scale: 1.1 }}
          >
            <svg
              className="constellation-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {constellation.lines.map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.from.x}
                  y1={line.from.y}
                  x2={line.to.x}
                  y2={line.to.y}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                />
              ))}
            </svg>
            <constellation.icon className="constellation-icon" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeConstellation && (
          <motion.div
            className="zoomed-view"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <button onClick={() => setActiveConstellation(null)} className="close-button">
              &times;
            </button>
            {constellations
              .filter((c) => c.id === activeConstellation)
              .map((constellation) => (
                <div key={constellation.id} className="zoomed-content">
                  <constellation.icon className="zoomed-icon" />
                  <div className="zoomed-text">
                    <h2 className="zoomed-title">{constellation.name}</h2>
                    <p className="zoomed-description">{constellation.description}</p>
                     <Button asChild variant="link" className="mt-4 p-0 text-white hover:text-white/80">
                        <Link href={constellation.href}>
                            Saber Más <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className={cn("hero-text-content", activeConstellation && "hidden-text")}
        initial={{ opacity: 1, y: 0}}
        animate={{ opacity: activeConstellation ? 0 : 1, y: activeConstellation ? 20 : 0}}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
          Decisiones Tecnológicas, Simplificadas con IA
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-lg text-white/90">
          Explora las constelaciones para descubrir cómo te ayudamos a navegar el universo tecnológico.
        </p>
      </motion.div>
    </section>
  );
}
