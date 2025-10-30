import { services } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Nuestra Experiencia, Tu Ventaja
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Desde insights impulsados por IA hasta ciberseguridad robusta, ofrecemos un conjunto completo de servicios tecnológicos para potenciar tus decisiones.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <Card key={service.title} className="flex flex-col text-center items-center p-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-accent text-accent-foreground rounded-full p-4 mb-4">
                <service.icon className="h-8 w-8" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="mt-2 text-base flex-grow">
                {service.description}
              </CardDescription>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/services">
                    Ver Todos los Servicios <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
