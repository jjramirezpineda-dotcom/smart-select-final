import Link from 'next/link';
import { Logo } from '../Logo';
import { navLinks } from '@/lib/data';
import { Button } from '../ui/button';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const legalLinks = [
    { label: 'Política de Privacidad', href: '/legal#privacy-policy' },
    { label: 'Términos de Servicio', href: '/legal#terms-of-service' },
  ];
  
  const socialLinks = [
    { icon: Twitter, href: '#', 'aria-label': 'Perfil de Twitter' },
    { icon: Github, href: 'https://github.com/jjramirezpineda-dotcom/Smart-Select', 'aria-label': 'Perfil de GitHub' },
    { icon: Linkedin, href: '#', 'aria-label': 'Perfil de LinkedIn' },
  ];

  return (
    <footer className="bg-secondary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Asesoramiento tecnológico impulsado por IA para problemas modernos.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
            <div>
              <h3 className="font-headline font-semibold text-foreground">Mapa del Sitio</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h3 className="font-headline font-semibold text-foreground">Contacto</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>contacto@smartselect.com</li>
                <li>(555) 123-4567</li>
                <li>123 Tech Avenue, Silicon Valley, CA</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Smart Select. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <Button key={link['aria-label']} variant="ghost" size="icon" asChild>
                <Link href={link.href} aria-label={link['aria-label']}>
                  <link.icon className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
