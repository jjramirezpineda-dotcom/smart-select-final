'use client'

import { useFormStatus } from "react-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useActionState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

import { login, type FormState } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  password: z.string().min(1, { message: "La contraseña es obligatoria." }),
})

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Iniciando Sesión...</> : 'Iniciar Sesión'}
    </Button>
  )
}

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const initialState: FormState = { message: null, error: null };
  const [state, dispatch] = useActionState(login, initialState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (state.message) {
      toast({
        title: "¡Éxito!",
        description: state.message,
      });
      router.push('/profile');
    }
    if (state.error) {
       toast({
        title: "Error de Inicio de Sesión",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Bienvenido de Nuevo</CardTitle>
        <CardDescription>Introduce tus credenciales para acceder a tu cuenta.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={dispatch} className="space-y-8">
            <CardContent className="space-y-4">
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
