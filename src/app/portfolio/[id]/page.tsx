import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/PageHeader';
import { CtaSection } from '@/components/sections/CtaSection';

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={project.title}
        description={project.description}
      />
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
                    <Image
                        src={project.image.src}
                        alt={project.title}
                        fill
                        className="object-cover"
                        data-ai-hint={project.image.hint}
                    />
                </div>
                 <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.content || '' }} />
            </div>
            <aside className="md:col-span-1 space-y-8">
                <div className="border p-6 rounded-lg">
                    <h3 className="font-headline text-xl font-semibold">Detalles del Proyecto</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li>
                            <strong className="text-foreground">Categoría:</strong> <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">{project.category}</Badge>
                        </li>
                    </ul>
                </div>
            </aside>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
