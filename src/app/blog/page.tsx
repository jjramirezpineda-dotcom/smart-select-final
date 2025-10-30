import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Nuestro Blog"
        description="Perspectivas, noticias y artículos sobre tecnología, IA e innovación empresarial del equipo de Smart Select."
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden group flex flex-col">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image.src}
                      alt={post.title}
                      width={post.image.width}
                      height={post.image.height}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={post.image.hint}
                    />
                  </div>
                </Link>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="mb-2 text-sm text-muted-foreground">
                    <span>Por {post.author}</span> &bull; <span>{formatDate(post.date, 'es')}</span>
                  </div>
                  <h3 className="text-xl font-headline font-semibold">
                     <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm flex-grow">{post.description}</p>
                   <Button variant="link" asChild className="p-0 mt-4 self-start">
                    <Link href={`/blog/${post.id}`}>
                        Leer Más <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

    