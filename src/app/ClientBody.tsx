"use client";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
      {children}
    </body>
  );
}
