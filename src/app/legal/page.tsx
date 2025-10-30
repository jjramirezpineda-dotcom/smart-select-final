
'use client';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function FormattedDate() {
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(new Date().toLocaleDateString('es'));
    }, []);
    return <>{date}</>;
}

export default function LegalPage() {
  return (
    <>
      <PageHeader
        title="Información Legal"
        description="Nuestro compromiso con la transparencia y tus derechos."
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto space-y-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline" id="privacy-policy">Política de Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Última actualización: <FormattedDate /></p>
              <p>
                Bienvenido a Smart Select. Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio web (independientemente de dónde lo visites) y te informará sobre tus derechos de privacidad y cómo la ley te protege.
              </p>
              <h3 className="font-headline">1. Información que Recopilamos</h3>
              <p>
                Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos agrupado de la siguiente manera:
              </p>
              <ul>
                <li><strong>Datos de Identidad</strong> incluye nombre, apellido, nombre de usuario o identificador similar.</li>
                <li><strong>Datos de Contacto</strong> incluye dirección de facturación, dirección de entrega, dirección de correo electrónico y números de teléfono.</li>
                <li><strong>Datos Técnicos</strong> incluye la dirección del protocolo de Internet (IP), tus datos de inicio de sesión, tipo y versión del navegador, configuración y ubicación de la zona horaria, tipos y versiones de los complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que utilizas para acceder a este sitio web.</li>
              </ul>
              <p>...contenido de marcador de posición...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline" id="terms-of-service">Términos de Servicio</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3 className="font-headline">1. Aceptación de los Términos</h3>
              <p>
                Al utilizar nuestros Servicios, aceptas estar sujeto a estos Términos. Si no estás de acuerdo con estar sujeto a estos Términos, no utilices los Servicios.
              </p>
              <h3 className="font-headline">2. Recomendaciones de IA</h3>
              <p>
                Las recomendaciones proporcionadas por nuestra herramienta de IA son solo para fines informativos y no constituyen una garantía de rendimiento. Eres responsable de tomar la decisión final.
              </p>
              <p>...contenido de marcador de posición...</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
