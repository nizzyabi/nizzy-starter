import { Sparkles } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--card))] p-6 md:py-12 w-full dark:bg-[hsl(var(--card))]">
      <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Sparkles className="h-6 w-6 text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]" />
          <span className="text-lg font-semibold text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">Nizzy-Starter</span>
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]">
          <p>&copy; 2024 Nizzy-Starter. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
