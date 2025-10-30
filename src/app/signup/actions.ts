'use server'

import { z } from 'zod';
import { initializeFirebase, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp } from 'firebase/firestore';

export type FormState = {
  message: string | null;
  error: string | null;
};

const SignUpFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

export async function signup(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
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
  
  const { name, email, password } = validatedFields.data;

  try {
    const { auth, firestore } = initializeFirebase();
    
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Update user's profile in Firebase Auth
    await updateProfile(user, {
      displayName: name,
    });

    // 3. Create user document in Firestore
    const userRef = doc(firestore, 'users', user.uid);
    setDocumentNonBlocking(userRef, {
      id: user.uid,
      displayName: name,
      email: user.email,
      registrationDate: serverTimestamp(),
    }, { merge: true });

    return {
      message: '¡Tu cuenta ha sido creada con éxito! Redirigiendo...',
      error: null,
    };
  } catch (e: any) {
     let errorMessage = 'Ocurrió un error inesperado.';
    if (e.code === 'auth/email-already-in-use') {
      errorMessage = 'Esta dirección de correo electrónico ya está en uso. Por favor, inicia sesión.';
    } else if (e.code === 'auth/weak-password') {
      errorMessage = 'La contraseña es demasiado débil. Por favor, elige una más segura.';
    }
    return {
      message: null,
      error: errorMessage,
    };
  }
}
