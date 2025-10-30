
'use client'

import { useFormStatus } from "react-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useActionState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

import { signup, type FormState } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
})

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando Cuenta...</> : 'Crear Cuenta'}
    </Button>
  )
}

export function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const initialState: FormState = { message: null, error: null };
  const [state, dispatch] = useActionState(signup, initialState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (state.message) {
      toast({
        title: "¡Cuenta Creada!",
        description: state.message,
      });
      router.push('/profile');
    }
    if (state.error) {
       toast({
        title: "Error de Registro",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Empecemos</CardTitle>
        <CardDescription>Crea tu cuenta para empezar a recibir recomendaciones personalizadas.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={dispatch} className="space-y-8">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="juan.perez@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
