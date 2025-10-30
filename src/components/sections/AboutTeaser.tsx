import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function AboutTeaser() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');
  const highlights = [
    "Enfoque centrado en la misión y en el cliente.",
    "Décadas de experiencia combinada en tecnología.",
    "Compromiso con la claridad y la transparencia."
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              La Inteligencia Humana Detrás de la IA
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Smart Select fue fundada en 2015 con una misión simple: desmitificar la tecnología. Combinamos IA de vanguardia con experiencia del mundo real para ofrecer un asesoramiento que no solo es inteligente, sino sabio.
            </p>
            <ul className="mt-6 space-y-4">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8">
              <Link href="/about">
                Conoce a Nuestro Equipo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
