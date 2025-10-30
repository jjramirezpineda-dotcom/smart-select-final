'use client'

import { useFormStatus } from "react-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useActionState } from "react"
import { useToast } from "@/hooks/use-toast"

import { submitContactForm, type FormState } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
})

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : 'Enviar Mensaje'}
    </Button>
  )
}

export function ContactForm() {
  const { toast } = useToast();
  const initialState: FormState = { message: null, error: null };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  useEffect(() => {
    if (state.message) {
      toast({
        title: "¡Mensaje Enviado!",
        description: state.message,
      });
      form.reset();
    }
    if (state.error) {
       toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Envíanos un mensaje</CardTitle>
        <CardDescription>Nos pondremos en contacto contigo lo antes posible.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={dispatch} className="space-y-8">
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                 <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tu Mensaje</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Cuéntanos cómo podemos ayudarte..." {...field} rows={6} />
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
