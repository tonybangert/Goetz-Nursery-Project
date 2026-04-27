import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-forest-400 bg-forest-900 pb-safe text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream p-1.5">
            <img src="/logo.webp" alt="" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold leading-none">Goetz's Nursery</div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-cream/70">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">1765 Co Rd CC · Hartford, WI 53027</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <a
            href="tel:+12626280502"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-700 px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-forest-600 sm:min-h-0 sm:py-2"
          >
            <Phone className="h-3.5 w-3.5" />
            (262) 628-0502
          </a>
          <span className="text-center text-[0.65rem] text-cream/55 sm:text-right">
            2026 prices · valid while supplies last
          </span>
        </div>
      </div>

      <div className="border-t border-forest-700/60 px-5 py-3 sm:px-8">
        <p className="mx-auto max-w-6xl text-[0.65rem] leading-relaxed text-cream/50">
          Tree photos courtesy of Wikimedia Commons contributors. Used under their respective Creative Commons licenses for illustrative purposes.
        </p>
      </div>
    </footer>
  );
}
