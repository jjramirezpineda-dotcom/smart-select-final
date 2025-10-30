'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function RecommendationsChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, history: messages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Hubo un problema al contactar a la IA.');
      }

      const { response: aiResponse } = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      const errorMessage: Message = { role: 'assistant', content: `Lo siento, ocurrió un error: ${error.message}` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Asistente de Chat IA"
        description="Conversa con nuestro experto en tecnología para encontrar la recomendación perfecta para ti."
      />
      <div className="container py-16 md:py-24 max-w-4xl mx-auto">
        <Card className="h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline">Chat de Recomendaciones</CardTitle>
            <CardDescription>
              Describe lo que buscas. Por ejemplo: "Necesito un portátil para la universidad, con un presupuesto de $3.000.000 COP".
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto p-6 space-y-6">
            {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    <p>Aún no hay mensajes. ¡Empieza la conversación!</p>
                </div>
            ) : (
                messages.map((msg, index) => (
                <div key={index} className={cn('flex items-start gap-4', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.role === 'assistant' && (
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Bot className="h-6 w-6" />
                    </div>
                    )}
                    <div className={cn(
                        'rounded-lg px-4 py-3 max-w-[80%]',
                        msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    )}>
                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    </div>
                     {msg.role === 'user' && (
                    <div className="bg-secondary text-secondary-foreground rounded-full p-2">
                        <User className="h-6 w-6" />
                    </div>
                    )}
                </div>
                ))
            )}
            {isLoading && (
              <div className="flex items-start gap-4 justify-start">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="bg-secondary rounded-lg px-4 py-3 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                    <span className="ml-2 text-sm">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}