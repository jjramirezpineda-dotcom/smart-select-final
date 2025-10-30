import {
  Briefcase,
  CloudCog,
  Cpu,
  ShieldCheck,
  Code,
  LineChart,
} from 'lucide-react';
import type { NavLink, Service, Project, Testimonial, TeamMember, BlogPost } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    return { src: 'https://picsum.photos/seed/error/600/400', width: 600, height: 400, hint: 'error' };
  }

  const url = new URL(image.imageUrl);
  const pathParts = url.pathname.split('/');
  const maybeHeightStr = pathParts[pathParts.length - 1];
  const maybeWidthStr = pathParts[pathParts.length - 2];
  
  let width = 600;
  let height = 400;

  if (maybeHeightStr && maybeWidthStr && /^\d+$/.test(maybeWidthStr) && /^\d+$/.test(maybeHeightStr)) {
    width = parseInt(maybeWidthStr, 10);
    height = parseInt(maybeHeightStr, 10);
  } else {
    const widthParam = url.searchParams.get('w');
    if (widthParam && !isNaN(parseInt(widthParam, 10))) {
        width = parseInt(widthParam, 10);
        height = Math.round(width / (16/9)); 
    }
  }

  return { src: image.imageUrl, width: width || 600, height: height || 400, hint: image.imageHint };
};

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Servicios', href: '/services' },
  { label: 'Recomendaciones', href: '/recommendations' },
  { label: 'Portafolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog'},
];

export const services: Service[] = [
  {
    icon: Cpu,
    title: 'Asesoramiento con IA',
    description: 'Obtén recomendaciones tecnológicas a medida utilizando nuestra IA avanzada para satisfacer tus necesidades únicas.',
  },
  {
    icon: Briefcase,
    title: 'Soluciones TI para Empresas',
    description: 'Ayudamos a las empresas a optimizar su stack tecnológico para lograr eficiencia, crecimiento y seguridad.',
  },
  {
    icon: CloudCog,
    title: 'Nube e Infraestructura',
    description: 'Moderniza tu infraestructura con soluciones en la nube escalables y seguras.',
  },
  {
    icon: Code,
    title: 'Desarrollo de Software a Medida',
    description: 'Soluciones de software personalizadas creadas desde cero para resolver tus desafíos específicos.',
  },
  {
    icon: ShieldCheck,
    title: 'Consultoría en Ciberseguridad',
    description: 'Protege tus activos digitales con nuestras evaluaciones y estrategias expertas en ciberseguridad.',
  },
  {
    icon: LineChart,
    title: 'Análisis de Datos e Insights',
    description: 'Convierte tus datos en información procesable con nuestros servicios de inteligencia de negocios y análisis.',
  },
];

export const team: TeamMember[] = [
    { name: "Juan José Ramírez", role: "Socio Principal e Ideólogo", avatar: getImage("team-member-1") },
    { name: "Diego Alejandro Caicedo", role: "Socio Fundador y Desarrollador", avatar: getImage("team-member-2") },
    { name: "Laura Cuida", role: "Diseñadora y Estratega Creativa", avatar: getImage("team-member-3") },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Modernización de TI para RetailCo',
    category: 'Soluciones Empresariales',
    description: 'Reestructuramos por completo la infraestructura de TI de una corporación de retail, lo que resultó en un aumento del 40% en la eficiencia.',
    image: getImage('project-1'),
    content: `
      <p>RetailCo, una empresa de retail de tamaño mediano, se enfrentaba a cuellos de botella operativos debido a su infraestructura de TI anticuada. Los sistemas lentos y las interrupciones frecuentes estaban frenando su potencial de crecimiento y afectando la experiencia del cliente.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">El Reto</h3>
      <p>El objetivo era claro: modernizar toda la infraestructura de TI para mejorar la eficiencia, reducir costos y crear una plataforma escalable para el futuro. La transición debía realizarse con un tiempo de inactividad mínimo para no afectar las operaciones diarias de sus más de 50 tiendas.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Nuestra Solución</h3>
      <p>Tras una auditoría completa, Smart Select diseñó una estrategia de modernización por fases. Nuestra solución incluyó:</p>
      <ul class="list-disc list-inside space-y-2 mt-4">
        <li>Migración de servidores on-premise a una nube híbrida, combinando AWS y Azure para optimizar costos y rendimiento.</li>
        <li>Implementación de un sistema ERP de SAP para centralizar la gestión de inventario, ventas y finanzas.</li>
        <li>Renovación de la seguridad de la red con firewalls de última generación y soluciones de endpoint detection and response (EDR).</li>
        <li>Un programa de capacitación intensivo para el equipo de TI de RetailCo sobre las nuevas herramientas y plataformas.</li>
      </ul>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Resultados Cuantificables</h3>
      <p>La modernización se tradujo en una mejora del 40% en la eficiencia operativa general. Los costos de mantenimiento se redujeron en un 30% anual y la empresa ahora disfruta de una base tecnológica robusta y segura, preparada para soportar su expansión a nuevos mercados.</p>
    `
  },
  {
    id: 'p2',
    title: 'CRM a Medida para Equipo de Ventas Global',
    category: 'Desarrollo de Software',
    description: 'Construimos un CRM a medida que unificó los procesos de un equipo de ventas global, aumentando la productividad en un 25%.',
    image: getImage('project-2'),
    content: `
      <p>El equipo de ventas de nuestro cliente, una empresa B2B con presencia en tres continentes, luchaba por mantener la coherencia. Usaban una mezcla de hojas de cálculo y un CRM genérico que no se adaptaba a sus complejos ciclos de venta.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">El Reto</h3>
      <p>Necesitaban una solución centralizada que automatizara la asignación de leads, ofreciera una visión 360° de cada cliente y se integrara con sus herramientas de marketing automation. El objetivo principal era aumentar la productividad del equipo y mejorar la precisión de las previsiones de ventas trimestrales.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Nuestra Solución</h3>
      <p>Desarrollamos un CRM desde cero, centrado en los flujos de trabajo específicos del cliente. Las características clave incluyeron:</p>
      <ul class="list-disc list-inside space-y-2 mt-4">
        <li>Un pipeline de ventas visual e interactivo con etapas personalizadas.</li>
        <li>Motor de automatización para la calificación y asignación de leads basado en geografía y especialización del vendedor.</li>
        <li>Integración nativa con Marketo y LinkedIn Sales Navigator.</li>
        <li>Módulo de análisis predictivo para la previsión de ventas.</li>
      </ul>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Resultados Cuantificables</h3>
      <p>El nuevo CRM aumentó la productividad del equipo de ventas en un 25% en los primeros seis meses. Con una visión unificada de su pipeline, el equipo logró reducir el ciclo de ventas en un 18% y mejorar la precisión de sus previsiones en un 15%, lo que impactó directamente en la planificación financiera de la compañía.</p>
    `
  },
  {
    id: 'p3',
    title: 'Migración a la Nube para FinTech',
    category: 'Nube e Infraestructura',
    description: 'Migramos una FinTech de rápido crecimiento a una arquitectura de microservicios en AWS, garantizando un 99.99% de tiempo de actividad y cumplimiento normativo.',
    image: getImage('project-3'),
    content: `
      <p>Una prometedora startup FinTech estaba experimentando un crecimiento explosivo de usuarios, pero su infraestructura monolítica local no podía seguir el ritmo. La latencia y los fallos esporádicos amenazaban la confianza de sus clientes.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">El Reto</h3>
      <p>La startup necesitaba migrar a una infraestructura en la nube que fuera elástica, altamente disponible y que cumpliera con las estrictas regulaciones del sector financiero (PCI DSS). La migración debía ser impecable, sin afectar las transacciones en curso de los usuarios.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Nuestra Solución</h3>
      <p>Diseñamos e implementamos una estrategia de migración a Amazon Web Services (AWS), transformando la aplicación monolítica en una arquitectura de microservicios. El plan incluyó:</p>
      <ul class="list-disc list-inside space-y-2 mt-4">
        <li>Contenerización de la aplicación usando Docker y orquestación con Amazon EKS (Kubernetes).</li>
        <li>Configuración de Auto Scaling Groups para manejar picos de transacciones de forma eficiente.</li>
        <li>Implementación de Amazon Aurora para una base de datos relacional distribuida y de alto rendimiento.</li>
        <li>Una estrategia de despliegue "blue-green" para una transición sin tiempo de inactividad perceptible por el usuario.</li>
      </ul>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Resultados Cuantificables</h3>
      <p>La migración a AWS fue un éxito rotundo. La FinTech ahora opera con un 99.99% de tiempo de actividad, ha eliminado por completo los problemas de rendimiento y ha reducido sus costos de infraestructura en un 20% gracias a la elasticidad de la nube. Además, pasaron su auditoría PCI DSS sin inconvenientes.</p>
    `
  },
   {
    id: 'p4',
    title: 'Lanzamiento de Plataforma E-commerce',
    category: 'Desarrollo de Software',
    description: 'Construimos una plataforma de e-commerce de alto rendimiento que manejó más de 10,000 usuarios concurrentes el día del lanzamiento.',
    image: getImage('project-4'),
    content: `<p>Contenido detallado para el lanzamiento de la plataforma de comercio electrónico...</p>`
  },
  {
    id: 'p5',
    title: 'Auditoría de Seguridad para Firma Financiera',
    category: 'Ciberseguridad',
    description: 'Realizamos una auditoría de seguridad integral e implementamos robustos mecanismos de defensa para una firma de servicios financieros.',
    image: getImage('project-5'),
    content: `<p>Contenido detallado para la auditoría de seguridad de la firma financiera...</p>`
  },
  {
    id: 'p6',
    title: 'Dashboard de BI para Minorista',
    category: 'Análisis de Datos',
    description: 'Creamos un panel de inteligencia de negocios que proporciona información en tiempo real sobre ventas e inventario para un minorista nacional.',
    image: getImage('project-6'),
    content: `<p>Contenido detallado para el panel de BI del minorista...</p>`
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "La herramienta de recomendación de IA de Smart Select fue un cambio radical. Encontró el software perfecto para nuestra startup en minutos, no en semanas.",
    author: 'Juana Pérez',
    company: 'Innovate Inc.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    quote: "Su equipo no solo nos dio una solución; nos enseñaron a usarla. El soporte y la experiencia son insuperables.",
    author: 'Juan García',
    company: 'Solutions Co.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
  },
  {
    quote: 'El nivel de profesionalismo y profundo conocimiento técnico es inigualable. Son nuestro socio de referencia para todo lo relacionado con la tecnología.',
    author: 'Emily Rodriguez',
    company: 'Growth Ventures',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'El Futuro de la IA: Más Allá de la Automatización',
    description: 'Descubre cómo la inteligencia artificial está evolucionando de ser una herramienta de automatización a un socio estratégico indispensable en el mundo empresarial.',
    author: 'Juan José Ramírez',
    date: new Date('2024-05-20'),
    image: getImage('project-1'),
    content: `
      <p>Durante años, hemos visto la inteligencia artificial principalmente como una herramienta para automatizar tareas repetitivas. Sin embargo, su verdadero potencial apenas comienza a revelarse. La IA está trascendiendo sus funciones originales para convertirse en un colaborador estratégico esencial en la toma de decisiones, desde la planificación de alto nivel hasta las operaciones diarias.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Análisis Predictivo: De la Reacción a la Proacción</h3>
      <p>Los algoritmos modernos de IA pueden procesar y analizar enormes volúmenes de datos históricos y en tiempo real. Esto permite a las empresas anticipar tendencias del mercado, predecir el comportamiento del consumidor y detectar riesgos operativos con una precisión asombrosa. En lugar de reaccionar a los cambios, los líderes empresariales ahora pueden tomar decisiones proactivas, manteniéndose un paso por delante de la competencia.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Simulación de Escenarios y Planificación Estratégica</h3>
      <p>¿Qué impacto tendría una interrupción en la cadena de suministro en nuestra producción trimestral? ¿Cuál sería el ROI de expandirnos a un nuevo mercado en el sudeste asiático? La IA permite a las organizaciones ejecutar miles de simulaciones complejas, evaluando los posibles resultados de diversas estrategias sin arriesgar capital. Esto transforma la planificación estratégica de un ejercicio de intuición a una ciencia basada en datos.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">La Sinergia Humano-IA: El Verdadero Diferencial</h3>
      <p>A pesar de estos avances tecnológicos, el juicio y la experiencia humana siguen siendo insustituibles. La IA no está aquí para reemplazar a los líderes, sino para potenciar su inteligencia. La verdadera ventaja competitiva reside en la sinergia entre la intuición y la experiencia de un líder y los insights basados en datos que proporciona la IA. Las organizaciones que dominen esta colaboración serán las que lideren el futuro.</p>
    `
  },
  {
    id: 'b2',
    title: '5 Errores de Ciberseguridad que las Pymes No Pueden Ignorar',
    description: 'Descubre las vulnerabilidades críticas que podrían estar exponiendo tu negocio y aprende a fortalecer tus defensas digitales de manera efectiva.',
    author: 'Diego Alejandro Caicedo',
    date: new Date('2024-05-15'),
    image: getImage('project-5'),
    content: `
      <p>En el panorama digital actual, ninguna empresa es demasiado pequeña para ser un objetivo. De hecho, las pymes son a menudo vistas como blancos más fáciles. Ignorar la ciberseguridad es un riesgo que ninguna empresa puede permitirse. Aquí desglosamos cinco errores comunes y cómo puedes solucionarlos.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">1. Contraseñas Débiles y Reutilizadas</h3>
      <p>Es la puerta de entrada más común para los atacantes. Implementa una política de contraseñas robustas y, más importante aún, habilita la autenticación de dos factores (2FA) en todas las cuentas posibles. Es una de las medidas de seguridad más efectivas y fáciles de implementar.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">2. Falta de Capacitación para Empleados</h3>
      <p>Tu equipo es tu primera línea de defensa. Realiza capacitaciones regulares sobre cómo identificar correos electrónicos de phishing, la importancia de no descargar software no autorizado y las mejores prácticas de seguridad en general. Un empleado informado es un activo invaluable.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">3. No Realizar Copias de Seguridad (o no probarlas)</h3>
      <p>Imagina perder todos tus datos de la noche a la mañana debido a un ataque de ransomware. Es crucial tener un sistema de copias de seguridad automatizado y regular. Sigue la regla 3-2-1: tres copias de tus datos, en dos tipos de medios diferentes, con una copia fuera de la oficina (en la nube, por ejemplo). Y lo más importante: prueba periódicamente que puedes restaurar desde esas copias.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">4. Ignorar las Actualizaciones de Software</h3>
      <p>Esas molestas notificaciones de actualización a menudo contienen parches para vulnerabilidades de seguridad críticas. Mantener tu sistema operativo, navegador, y todo el software empresarial actualizado es una de las formas más sencillas de protegerte contra exploits conocidos.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">5. Ausencia de un Plan de Respuesta a Incidentes</h3>
      <p>No se trata de "si" sufrirás un incidente, sino de "cuándo". Tener un plan claro sobre qué hacer cuando ocurra un ataque puede marcar la diferencia entre una recuperación rápida y un desastre total. ¿A quién llamas? ¿Cómo aíslas los sistemas afectados? ¿Cómo te comunicas con tus clientes? Define estos pasos ahora, no en medio de una crisis.</p>
    `
  },
  {
    id: 'b3',
    title: '¿Está Tu Empresa Preparada para la Nube? Una Guía Práctica',
    description: 'La migración a la nube es más que un simple cambio tecnológico; es una transformación empresarial. Usa nuestra guía para evaluar si es el momento adecuado para tu organización.',
    author: 'Laura Cuida',
    date: new Date('2024-05-10'),
    image: getImage('project-3'),
    content: `
      <p>Migrar a la nube es una decisión estratégica importante con el potencial de transformar tu negocio. Pero, ¿cómo saber si tu empresa está realmente preparada para dar el salto? Antes de empezar, es fundamental realizar una autoevaluación honesta. Aquí tienes una lista de verificación práctica.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">1. Evaluación de Aplicaciones y Cargas de Trabajo</h3>
      <p>No todo está hecho para la nube. Realiza un inventario de tus aplicaciones actuales. ¿Cuáles son "nativas de la nube" o fáciles de migrar? ¿Cuáles son sistemas heredados (legacy) que podrían requerir ser rediseñados o reemplazados? Comprender tu portafolio de aplicaciones es el primer paso.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">2. Análisis de Costos y ROI</h3>
      <p>La nube no es automáticamente más barata. Realiza un Análisis de Costo Total de Propiedad (TCO) que compare tus gastos actuales con los costos proyectados en la nube (suscripciones, transferencia de datos, personal especializado, etc.). Define claramente qué esperas lograr: ¿agilidad, ahorro, escalabilidad? Esto te ayudará a medir el ROI.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">3. Habilidades y Cultura Organizacional</h3>
      <p>¿Tu equipo de TI tiene experiencia en la nube (AWS, Azure, GCP)? La gestión de la nube requiere un conjunto de habilidades diferente a la gestión de centros de datos tradicionales. Considera la necesidad de capacitación o de contratar nuevo talento. Además, la cultura de tu empresa debe estar preparada para adoptar la agilidad y los nuevos procesos que la nube permite, como DevOps.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">4. Seguridad y Cumplimiento Normativo</h3>
      <p>Comprende el modelo de responsabilidad compartida del proveedor de la nube. Ellos aseguran la nube, pero tú eres responsable de la seguridad *en* la nube. ¿Manejas datos sensibles (datos de clientes, información financiera)? Asegúrate de que la estrategia de migración y la configuración de la nube cumplan con todas las normativas de tu industria (GDPR, HIPAA, PCI, etc.).</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">5. Empieza con un Piloto</h3>
      <p>No intentes migrar todo de una vez. Elige una carga de trabajo no crítica pero representativa para un proyecto piloto. Esto te permitirá aprender, ajustar tu estrategia y demostrar el valor de la nube a las partes interesadas antes de una migración a gran escala. El éxito de un piloto puede ser el catalizador para toda la transformación.</p>
    `
  }
];

    