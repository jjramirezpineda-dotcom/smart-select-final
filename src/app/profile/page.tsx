'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
  const { user, isUserLoading, userError } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <>
        <PageHeader
          title="Mi Perfil"
          description="Gestiona la información de tu cuenta."
        />
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }
  
  if (userError) {
      return (
          <div className="container py-16">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error de Autenticación</AlertTitle>
                <AlertDescription>
                    {userError.message || "No se pudo cargar la información del usuario."}
                </AlertDescription>
              </Alert>
          </div>
      )
  }

  return (
    <>
      <PageHeader
        title="Mi Perfil"
        description="Gestiona la información de tu cuenta."
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                  <AvatarFallback className="text-3xl">
                    {user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-3xl">{user.displayName || 'Usuario'}</CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
               <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ID de Usuario</h3>
                  <p className="text-sm font-mono bg-secondary p-2 rounded-md mt-1">{user.uid}</p>
              </div>
               <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Fecha de Creación de la Cuenta</h3>
                  <p className="text-sm">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric'}) : 'No disponible'}</p>
              </div>
               <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Último Inicio de Sesión</h3>
                  <p className="text-sm">{user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString('es', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'No disponible'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
