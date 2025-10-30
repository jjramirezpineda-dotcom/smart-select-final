import { PageHeader } from "@/components/PageHeader";
import { SignUpForm } from "./SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <PageHeader
        title="Crear una Cuenta"
        description="Únete a Smart Select y obtén recomendaciones de tecnología personalizadas."
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-lg mx-auto">
          <SignUpForm />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
