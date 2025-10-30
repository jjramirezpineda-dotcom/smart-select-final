import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';
import { CtaSection } from '@/components/sections/CtaSection';
import { ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Nuestro Trabajo"
        description="Nos enorgullecemos de nuestro trabajo. Explora una selección de nuestros proyectos que muestran nuestro compromiso con la calidad, la innovación y el éxito del cliente."
      />
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                   <Link href={`/portfolio/${project.id}`} className="block">
                    <Image
                      src={project.image.src}
                      alt={project.title}
                      width={project.image.width}
                      height={project.image.height}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.image.hint}
                    />
                  </Link>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Badge variant="secondary" className="mb-2 bg-accent/20 text-accent-foreground self-start">{project.category}</Badge>
                  <h3 className="text-xl font-headline font-semibold">
                     <Link href={`/portfolio/${project.id}`} className="hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm flex-grow">{project.description}</p>
                   <Button variant="link" asChild className="p-0 mt-4 self-start">
                    <Link href={`/portfolio/${project.id}`}>
                        Leer Caso de Estudio <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
