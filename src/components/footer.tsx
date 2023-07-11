import { ArrowLeft, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 z-40 flex w-full justify-between bg-background p-2">
      <button className="flex items-center gap-1 rounded-lg px-6 py-1 font-bold">
        <ArrowLeft className="h-4 w-4" />
        <span>Back: ...</span>
      </button>
      <button className="flex items-center gap-1 rounded-lg bg-primary px-6 py-1 font-bold text-primary-foreground">
        <span>Next: ...</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </footer>
  );
}
