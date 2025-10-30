import { PageHeader } from "@/components/PageHeader";
import { LoginForm } from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <PageHeader
        title="Iniciar Sesión"
        description="Accede a tu cuenta para gestionar tus recomendaciones."
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-lg mx-auto">
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
