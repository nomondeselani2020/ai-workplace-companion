import { ReactNode } from "react";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="px-6 py-8 md:px-10 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {children}
      <p className="mt-8 text-xs text-muted-foreground">
        AI-generated. Review and edit before sharing. Don&apos;t enter confidential information.
      </p>
    </div>
  );
}