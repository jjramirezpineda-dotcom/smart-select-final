import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          ¿Listo para Encontrar tu Solución Tecnológica Perfecta?
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/80">
          Deja de adivinar. Empieza a saber. Nuestra IA está lista para ofrecerte una recomendación a medida solo para ti.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/recommendations">
              Obtén tu Recomendación de IA Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
