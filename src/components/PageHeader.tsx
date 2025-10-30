import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-secondary", className)}>
      <div className="container text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary dark:text-primary-foreground">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
