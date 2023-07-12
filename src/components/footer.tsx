import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useStage } from "@/components/stage-provider";
import { cn } from "@/lib/utils";

export function Footer() {
  const {
    isFirstStage,
    isFinalStage,
    toNextStage,
    toPrevStage,
    currentStage,
    furthestStage,
    finalStage,
  } = useStage();

  return (
    <footer
      className={cn(
        "fixed bottom-0 z-40 flex w-full bg-background p-2",
        isFirstStage ? "justify-end" : "justify-between",
      )}
    >
      {!isFirstStage && (
        <button
          className="flex items-center gap-1 rounded-lg px-6 py-1 font-bold"
          onClick={toPrevStage}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      )}
      {!isFinalStage && (
        <button
          className="flex items-center gap-1 rounded-lg bg-primary px-6 py-1 font-bold text-primary-foreground disabled:bg-foreground/20 disabled:text-background"
          onClick={toNextStage}
          disabled={currentStage.id === furthestStage.id}
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
      {isFinalStage && (
        <button
          className="flex items-center gap-1 rounded-lg bg-primary px-6 py-1 font-bold text-primary-foreground disabled:bg-foreground/20 disabled:text-background"
          disabled={furthestStage.id !== finalStage.id}
        >
          <span>Submit</span>
          <Check className="h-4 w-4" />
        </button>
      )}
    </footer>
  );
}
