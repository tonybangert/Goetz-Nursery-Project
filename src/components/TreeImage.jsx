import { useState } from "react";
import { cn } from "../lib/cn";

// Image with blur-up loading and a graceful fallback if the file is missing.
export function TreeImage({ tree, className, eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest-800 to-forest-600 text-forest-300",
          className
        )}
        role="img"
        aria-label={`${tree.name} (image unavailable)`}
      >
        <span className="text-4xl" aria-hidden>🌳</span>
        <span className="px-4 text-center text-xs font-medium text-cream">{tree.name}</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-forest-50", className)}>
      <img
        src={`/trees/${tree.slug}.jpg`}
        alt={tree.name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out will-change-transform",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Subtle bottom-edge gradient so dark text/badges read on light photos */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
}
