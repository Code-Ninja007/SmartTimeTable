import { cn } from "@/lib/utils";
import type { FC } from "react";

const LoadingAnimation: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <div className="h-4 w-4 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 rounded-full bg-primary animate-bounce"></div>
    </div>
  );
};

export { LoadingAnimation };
