import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RippleState {
  x: number;
  y: number;
  id: number;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  loading?: boolean;
}

const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(46,204,129,0.4),0_8px_24px_-8px_rgba(46,204,129,0.55)] hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgba(46,204,129,0.55),0_18px_40px_-12px_rgba(46,204,129,0.75)] hover:-translate-y-0.5",
  secondary:
    "bg-surface text-foreground border border-border hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.25)]",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  loading,
  children,
  className,
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!disabled && !loading) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    }
    onClick?.(e);
  }

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none",
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-accent-foreground/40 animate-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <span>{children}</span>
          {icon && (
            <span className="inline-flex transition-transform duration-200 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
