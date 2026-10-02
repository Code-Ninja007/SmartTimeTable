import { TimetableTabs } from '@/components/timetable-tabs';
import { BookOpenCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold font-headline text-foreground">
              ClassSync
            </h1>
          </div>
          <a
            href="https://erp.kit.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open IERP - Kanpur Institute of Technology | AKTU Code: 165"
            title="IERP - Kanpur Institute of Technology | AKTU Code: 165"
            className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src="/kit-erp-logo.png"
              alt="IERP - Kanpur Institute of Technology | AKTU Code: 165"
              width="1045"
              height="318"
              className="h-9 w-auto max-w-[132px] object-contain"
            />
          </a>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <TimetableTabs />
      </main>
      <footer className="py-6 md:px-8 md:py-0 bg-background/80 backdrop-blur-sm border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built by{' '}
            <a
              href="https://github.com/Code-Ninja007"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Harsh Bhatt
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
