import Link from 'next/link';
import Image from 'next/image';

function CustomLogoIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* 
        OPCIÓN 1: Pega tu código SVG aquí dentro. (RECOMENDADO)
        Este método es más robusto y evita problemas de rutas.
        Asegúrate de que use `fill="currentColor"`.
      */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Smart Select Logo"
      >
        <path d="M14.28,5.45c-1.3-1.3-3.3-1.3-4.59,0-1.3,1.3-1.3,3.3,0,4.59,0.24,0.24,0.51,0.44,0.8,0.61v-2.3c0-1.3-1.04-2.34-2.34-2.34H6.51c-0.34,0-0.65,0.07-0.94,0.2C6.54,5,7.74,4.24,9.17,4.17c-0.11-0.31-0.17-0.64-0.17-0.98,0-1.3,1.04-2.34,2.34-2.34s2.34,1.04,2.34,2.34c0,0.41-0.1,0.8-0.28,1.15C13.63,4.64,13.98,5.01,14.28,5.45z M17.49,9.75c0.34,0,0.65-0.07,0.94-0.2C17.46,10.7,16.26,11.46,14.83,11.54c0.11,0.31,0.17,0.64,0.17,0.98,0,1.3-1.04,2.34-2.34,2.34s-2.34-1.04-2.34-2.34c0-0.41,0.1-0.8,0.28-1.15c-0.22-0.14-0.43-0.3-0.62-0.47c1.3,1.3,3.3,1.3,4.59,0c1.3-1.3,1.3-3.3,0-4.59c-0.24-0.24-0.51-0.44-0.8-0.61v2.3c0,1.3,1.04,2.34,2.34,2.34h1.64V9.75z" />
      </svg>

      {/* 
        OPCIÓN 2: Usa una imagen (si el SVG no es una opción).
        1. Coloca tu archivo de logo (ej: "milogo.png") en la carpeta `public/`.
        2. Descomenta el código de abajo y comenta o elimina el SVG de arriba.
        3. Reemplaza "/logo-ejemplo.png" con el nombre de tu archivo.
      
        <Image
          src="/milogo.png" // <-- Logo actualizado para usar tu archivo.
          alt="Logo de Smart Select"
          width={24}
          height={24}
          className="w-full h-full"
        />
      */}
    </div>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground p-1.5 rounded-md flex items-center justify-center w-10 h-10">
        <CustomLogoIcon className="w-6 h-6" />
      </div>
      <span className="text-xl font-headline font-semibold text-primary dark:text-primary-foreground">
        Smart Select
      </span>
    </Link>
  );
}
