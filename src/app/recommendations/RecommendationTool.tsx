'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from '@/lib/utils';

import type { Recommendation } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles, ThumbsDown, ThumbsUp, TrendingUp, Laptop, Monitor, Tablet, Gamepad2, School, Briefcase, Camera, Music, Palette, Code, Film, Battery, Fingerprint, Keyboard, Webcam, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  deviceType: z.string().min(1, { message: "Por favor, selecciona un tipo de dispositivo." }),
  budget: z.string().min(1, { message: "Por favor, especifica un presupuesto." }),
  mainUses: z.array(z.string()).min(1, { message: "Selecciona al menos un uso principal." }),
  specialFeatures: z.array(z.string()).default([]),
  otherNeeds: z.string().max(500, { message: "El texto no debe exceder los 500 caracteres." }).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const deviceTypes = [
  { id: 'portatil', label: 'Portátil', icon: Laptop },
  { id: 'sobremesa', label: 'Sobremesa', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
];

const budgets = [
  { id: '<1.5M', label: 'Menos de $1.5M' },
  { id: '1.5M-3M', label: '$1.5M - $3M' },
  { id: '3M-5M', label: '$3M - $5M' },
  { id: '>5M', label: '$5M+' },
];

const mainUses = [
    { id: 'trabajo_oficina', label: 'Oficina/Navegación', icon: Briefcase },
    { id: 'estudios', label: 'Estudios', icon: School },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'diseno_grafico', label: 'Diseño Gráfico', icon: Palette },
    { id: 'edicion_video', label: 'Edición de Vídeo', icon: Film },
    { id: 'programacion', label: 'Programación', icon: Code },
];

const specialFeatures = [
  { id: 'bateria_larga_duracion', label: 'Batería de Larga Duración', icon: Battery },
  { id: 'buena_webcam', label: 'Webcam de Alta Calidad', icon: Webcam },
  { id: 'teclado_retroiluminado', label: 'Teclado Retroiluminado', icon: Keyboard },
  { id: 'lector_huellas', label: 'Lector de Huellas', icon: Fingerprint },
];

const TOTAL_STEPS = 5;

export function RecommendationTool() {
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      deviceType: "",
      budget: "",
      mainUses: [],
      specialFeatures: [],
      otherNeeds: "",
    },
  });

  const nextStep = async () => {
    let fieldToValidate: keyof FormValues | (keyof FormValues)[] | undefined;

    switch (currentStep) {
        case 1: fieldToValidate = 'deviceType'; break;
        case 2: fieldToValidate = 'budget'; break;
        case 3: fieldToValidate = 'mainUses'; break;
        default: break;
    }

    if (fieldToValidate) {
        const isValid = await form.trigger(fieldToValidate);
        if (!isValid) return;
    }

    if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;
  
  const handleFormSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocurrió un error en el servidor.');
      }

      const result = await response.json();
      setRecommendations(result.recommendations);

    } catch (e: any) {
      setError(e.message || 'No se pudo conectar con el servicio de IA. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      {!recommendations && !error && (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <CardHeader>
                <Progress value={progress} className="mb-4" />
                <CardTitle className="font-headline text-2xl">Paso {currentStep} de {TOTAL_STEPS}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 min-h-[350px]">
                <div className={cn(currentStep !== 1 && "hidden")}>
                   <FormField
                    control={form.control}
                    name="deviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">¿Qué tipo de dispositivo buscas?</FormLabel>
                        <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                            {deviceTypes.map((item) => (
                                <Card key={item.id} onClick={() => field.onChange(item.id)} className={cn("cursor-pointer transition-all", field.value === item.id && "border-primary ring-2 ring-primary")}>
                                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                                    <item.icon className="h-8 w-8 text-accent"/>
                                    <span className="text-sm font-medium text-center">{item.label}</span>
                                    </CardContent>
                                </Card>
                            ))}
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={cn(currentStep !== 2 && "hidden")}>
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">¿Cuál es tu presupuesto? (COP)</FormLabel>
                         <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            {budgets.map((item) => (
                                <Card key={item.id} onClick={() => field.onChange(item.id)} className={cn("cursor-pointer transition-all", field.value === item.id && "border-primary ring-2 ring-primary")}>
                                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                                    <DollarSign className="h-8 w-8 text-accent"/>
                                    <span className="text-sm font-medium">{item.label}</span>
                                    </CardContent>
                                </Card>
                            ))}
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={cn(currentStep !== 3 && "hidden")}>
                   <FormField
                    control={form.control}
                    name="mainUses"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel className="text-lg font-semibold">¿Para qué lo usarás principalmente?</FormLabel>
                          <FormDescription>Selecciona todas las que apliquen.</FormDescription>
                          <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                {mainUses.map((item) => {
                                    const isSelected = field.value.includes(item.id);
                                    return (
                                    <Card key={item.id} onClick={() => {
                                        const newValue = isSelected ? field.value.filter(v => v !== item.id) : [...field.value, item.id];
                                        field.onChange(newValue);
                                    }} className={cn("cursor-pointer transition-all", isSelected && "border-primary ring-2 ring-primary")}>
                                        <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                                        <item.icon className="h-8 w-8 text-accent"/>
                                        <span className="text-sm font-medium text-center">{item.label}</span>
                                        </CardContent>
                                    </Card>
                                    )
                                })}
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className={cn(currentStep !== 4 && "hidden")}>
                  <FormField
                    control={form.control}
                    name="specialFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">¿Alguna característica especial que necesites?</FormLabel>
                        <FormDescription>Selecciona las que te interesen (opcional).</FormDescription>
                        <FormControl>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            {specialFeatures.map((item) => {
                                const isSelected = field.value.includes(item.id);
                                return (
                                    <Card key={item.id} onClick={() => {
                                        const newValue = isSelected ? field.value.filter(v => v !== item.id) : [...field.value, item.id];
                                        field.onChange(newValue);
                                    }} className={cn("cursor-pointer transition-all", isSelected && "border-primary ring-2 ring-primary")}>
                                        <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                                        <item.icon className="h-8 w-8 text-accent"/>
                                        <span className="text-sm font-medium text-center">{item.label}</span>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={cn(currentStep !== 5 && "hidden")}>
                  <FormField
                    control={form.control}
                    name="otherNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">¿Algo más que debamos saber?</FormLabel>
                        <FormDescription>Menciona marcas preferidas, importancia del peso, colores, etc. (opcional).</FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Ej: 'Prefiero la marca Dell', 'Viajo mucho, así que el peso es clave', 'Me gustaría que fuera de color azul'..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                
                {currentStep < TOTAL_STEPS && (
                  <Button type="button" onClick={nextStep}>
                    Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {currentStep === TOTAL_STEPS && (
                  <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full md:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Obtener Recomendación
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </form>
        </Form>
      )}
      
      {error && (
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTitle className="font-headline">Ocurrió un Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
           <Button onClick={() => {setError(null); setCurrentStep(1); form.reset();}} className="mt-4">
              Intentar de Nuevo
            </Button>
        </CardContent>
      )}

      {recommendations && (
        <CardContent className="p-6 space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold font-headline">Nuestras Mejores Recomendaciones</h3>
            {recommendations.map((rec, index) => (
                <Card key={index} className={rec.isTopPick ? "border-accent ring-2 ring-accent" : ""}>
                    <CardHeader className="flex-row items-start justify-between gap-4">
                        <CardTitle className="font-headline text-xl">{rec.name}</CardTitle>
                         {rec.isTopPick && (
                            <div className="bg-accent text-accent-foreground text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 flex-shrink-0">
                               <TrendingUp className="h-4 w-4"/> Mejor Opción
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{rec.justification}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-green-500"/> Pros</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {rec.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold flex items-center gap-2"><ThumbsDown className="h-4 w-4 text-red-500"/> Contras</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {rec.cons.map((con, i) => <li key={i}>{con}</li>)}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
             <Button onClick={() => {setRecommendations(null); setCurrentStep(1); form.reset();}} className="mt-4">
              Empezar de Nuevo
            </Button>
        </CardContent>
      )}
    </Card>
  );
}
