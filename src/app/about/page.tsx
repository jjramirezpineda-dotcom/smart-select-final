import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { team, services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CtaSection } from '@/components/sections/CtaSection';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  const stats = [
    { value: '2024', label: 'Fundada' },
    { value: '500+', label: 'Recomendaciones Generadas' },
    { value: '3', label: 'Socios Apasionados' },
    { value: '85%', label: 'Satisfacción Usuario-Piloto' },
  ];

  return (
    <>
      <PageHeader
        title="Sobre Smart Select"
        description="Somos un equipo de tecnólogos apasionados dedicados a hacer que la tecnología sea accesible y efectiva para todos."
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold font-headline text-primary dark:text-primary-foreground">Nuestra Historia</h2>
              <p className="mt-4 text-muted-foreground">
                Smart Select nació como un proyecto para nuestra institución educativa, a partir de una idea que tuvimos durante nuestra formación con el SENA. Al principio, era solo un concepto vago sobre cómo asesorar a las personas en sus decisiones tecnológicas. Con el tiempo, esa idea inicial tomó fuerza y evolucionó hasta convertirse en el proyecto sólido y definido que hoy se conoce como Smart Select.
              </p>
              <p className="mt-4 text-muted-foreground">
                Nos propusimos crear un servicio que combina una profunda experiencia humana con el poder de la inteligencia artificial. Nuestro objetivo es simple: proporcionar un asesoramiento tecnológico claro, imparcial y personalizado que empodere a nuestros clientes para tomar decisiones seguras. Hoy, hemos ayudado a cientos de personas y empresas a navegar por las complejidades del panorama digital.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
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

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-4xl md:text-5xl font-bold text-accent font-headline">{stat.value}</p>
                        <p className="mt-2 text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Conoce al Equipo</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Los arquitectos de tu éxito tecnológico. Nuestro equipo combina décadas de experiencia con una pasión por la innovación.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar.src} alt={member.name} data-ai-hint={member.avatar.hint} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                  <p className="text-accent font-semibold">{member.role}</p>
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
