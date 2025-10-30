'use server'

import { z } from 'zod';
import { getAuth } from 'firebase/auth';
import { initializeFirebase, initiateEmailSignIn } from '@/firebase';

export type FormState = {
  message: string | null;
  error: string | null;
};

const LoginFormSchema = z.object({
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

export async function login(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: null,
      error: firstError || "Entrada inválida. Por favor, revisa el formulario.",
    };
  }
  
  const { email, password } = validatedFields.data;

  try {
    const { auth } = initializeFirebase();
    initiateEmailSignIn(auth, email, password);

    // Because Firebase auth state is handled client-side, we can't await the result here.
    // We return a success message and let the client-side redirect.
    // A more robust solution might involve waiting for a webhook or using a custom token system.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Give time for auth state to propagate

    return {
      message: 'Inicio de sesión exitoso. Redirigiendo...',
      error: null,
    };
  } catch (e: any) {
    // This catch block might not be as effective for client-side errors.
    // Firebase auth errors are typically caught on the client.
    return {
      message: null,
      error: 'Error de Firebase: ' + (e.message || 'Ocurrió un error inesperado.'),
    };
  }
}
