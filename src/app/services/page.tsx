import { services } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/PageHeader';
import { CtaSection } from '@/components/sections/CtaSection';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Nuestros Servicios"
        description="Un conjunto completo de servicios tecnológicos diseñados para proporcionar claridad e impulsar resultados para tu negocio o proyectos personales."
      />
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col text-center items-center p-6 hover:shadow-xl transition-shadow">
                 <div className="bg-accent text-accent-foreground rounded-full p-4 mb-4">
                    <service.icon className="h-8 w-8" />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base flex-grow">
                  {service.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
