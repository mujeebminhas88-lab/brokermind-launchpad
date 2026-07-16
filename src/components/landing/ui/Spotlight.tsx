import { useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: number;
  color?: string;
}

export function Spotlight({ children, className, size = 500, color = "46,204,129", ...props }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: hovering ? 1 : 0.6,
          background: hovering
            ? `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(${color},0.22), transparent 70%)`
            : `radial-gradient(${size}px circle at 50% 0%, rgba(${color},0.22), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
