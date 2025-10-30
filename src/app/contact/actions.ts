'use server'

import { z } from 'zod';
import { collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { initializeFirebase, addDocumentNonBlocking } from '@/firebase';

export type FormState = {
  message: string | null;
  error: string | null;
};

const ContactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce una dirección de correo electrónico válida."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: null,
      error: firstError || "Entrada inválida. Por favor, revisa el formulario.",
    };
  }
  
  const { name, email, message } = validatedFields.data;
  const submissionDate = new Date();

  try {
    const { firestore } = initializeFirebase();
    const contactMessagesCol = collection(firestore, 'contact_messages');
    
    addDocumentNonBlocking(contactMessagesCol, {
      name,
      email,
      message,
      submissionDate,
    });
    
    return {
      message: '¡Gracias por tu mensaje! Lo hemos recibido correctamente.',
      error: null,
    };
  } catch (e) {
    console.error("Error saving contact message:", e);
    return {
      message: null,
      error: 'Ocurrió un error al guardar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
    };
  }
}
