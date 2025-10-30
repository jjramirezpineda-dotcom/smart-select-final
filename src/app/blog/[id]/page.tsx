import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts, team } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { PageHeader } from '@/components/PageHeader';
import { CtaSection } from '@/components/sections/CtaSection';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  const authorDetails = team.find(member => member.name === post.author);

  return (
    <>
      <PageHeader
        title={post.title}
        description={post.description}
      />
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-16">
            <article className="md:col-span-3">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-8">
                    <Image
                        src={post.image.src}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post.image.hint}
                    />
                </div>
                 <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            </article>
            <aside className="md:col-span-1 space-y-8">
                {authorDetails && (
                    <div className="border p-6 rounded-lg bg-secondary">
                        <h3 className="font-headline text-lg font-semibold mb-4">Sobre el Autor</h3>
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={authorDetails.avatar.src} alt={authorDetails.name} data-ai-hint={authorDetails.avatar.hint} />
                                <AvatarFallback>{authorDetails.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{authorDetails.name}</p>
                                <p className="text-xs text-muted-foreground">{authorDetails.role}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="border p-6 rounded-lg">
                    <h3 className="font-headline text-lg font-semibold">Detalles</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li>
                            <strong>Publicado:</strong> {formatDate(post.date, 'es')}
                        </li>
                         <li>
                            <strong>Autor:</strong> {post.author}
                        </li>
                    </ul>
                </div>
            </aside>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}

    