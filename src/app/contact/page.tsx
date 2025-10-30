import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Correo Electrónico",
      value: "contacto@smartselect.com",
      href: "mailto:contacto@smartselect.com"
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: "(555) 123-4567",
      href: "tel:+1-555-123-4567"
    },
    {
      icon: MapPin,
      title: "Dirección",
      value: "123 Tech Avenue, Silicon Valley, CA",
      href: "#"
    },
  ]
  return (
    <>
      <PageHeader
        title="Ponte en Contacto"
        description="¿Tienes alguna pregunta o un proyecto en mente? Nos encantaría saber de ti. Rellena el formulario a continuación o contáctanos directamente."
      />
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
                <ContactForm />
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold font-headline">Información de Contacto</h2>
              {contactDetails.map(detail => (
                <div key={detail.title} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <detail.icon className="h-6 w-6 text-accent"/>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{detail.title}</h3>
                    <a href={detail.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {detail.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
