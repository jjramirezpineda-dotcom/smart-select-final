import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function PortfolioSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Éxito Demostrado, Resultados Tangibles
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No solo hablamos. Explora nuestros casos de estudio para ver cómo hemos ayudado a clientes como tú a tener éxito.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden group">
              <Link href={`/portfolio/${project.id}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image.src}
                    alt={project.title}
                    width={project.image.width}
                    height={project.image.height}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={project.image.hint}
                  />
                </div>
              </Link>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2 bg-accent/20 text-accent-foreground">{project.category}</Badge>
                <h3 className="text-xl font-headline font-semibold">
                   <Link href={`/portfolio/${project.id}`} className="hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                </h3>
                <p className="mt-2 text-muted-foreground text-sm">{project.description}</p>
                <Button variant="link" asChild className="p-0 mt-4">
                    <Link href={`/portfolio/${project.id}`}>
                        Leer Caso de Estudio <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">
                    Ver Todos los Proyectos
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
