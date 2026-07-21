import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-3xl",
} as const;

export function Logo({
  size = "md",
  className,
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex font-display font-extrabold leading-none tracking-tight",
        sizeClasses[size],
        className,
      )}
    >
      Pipe<span className="text-primary">Flow</span>
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-[2px] w-full animate-pulse rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </span>
  );
}
