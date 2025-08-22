import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background dark">
      <h1 className="text-9xl font-bold text-foreground">404</h1>
      <h2 className="text-3xl font-semibold mt-6 mb-2">Page not found</h2>
      <p className="text-xl text-muted-foreground max-w-lg mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
