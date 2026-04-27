import { Search, X, ArrowUpDown, Sun, CloudSun } from "lucide-react";
import { cn } from "../lib/cn";

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200",
        active
          ? "border-forest-700 bg-forest-700 text-cream shadow-sm shadow-forest-900/20"
          : "border-forest-200 bg-white text-forest-700 hover:border-forest-300 hover:bg-forest-50 active:bg-forest-100"
      )}
    >
      {children}
    </button>
  );
}

export function FilterBar({
  search, setSearch,
  category, setCategory, categories,
  sunFilter, setSunFilter, sunFilters,
  sortBy, setSortBy,
  resultCount, totalCount,
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-forest-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-8 sm:py-4">
        {/* Row 1 — Search + Sort */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trees…"
              className="w-full rounded-full border border-forest-200 bg-forest-50/60 py-2.5 pl-10 pr-10 text-base text-ink outline-none transition-colors placeholder:text-forest-400 focus:border-forest-400 focus:bg-white sm:text-sm"
              aria-label="Search trees"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              enterKeyHint="search"
              inputMode="search"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-forest-500 transition-colors hover:bg-forest-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <label className="relative inline-flex shrink-0 items-center">
            <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-forest-500" aria-hidden />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort trees"
              className="appearance-none rounded-full border border-forest-200 bg-white py-2.5 pl-8 pr-7 text-sm font-semibold text-forest-700 outline-none transition-colors hover:border-forest-300 focus:border-forest-400"
            >
              <option value="name">A–Z</option>
              <option value="price">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
          </label>
        </div>

        {/* Row 2 — Pills (horizontally scrollable on mobile, wraps on tablet+) */}
        <div
          className="scrollbar-none mt-2.5 -mx-4 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-4 pb-0.5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          role="group"
          aria-label="Filter trees"
        >
          {categories.map((c) => (
            <Pill key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Pill>
          ))}
          <span className="mx-0.5 h-5 w-px shrink-0 bg-forest-200 sm:mx-1.5" aria-hidden />
          {sunFilters.map((s) => (
            <Pill key={s} active={sunFilter === s} onClick={() => setSunFilter(s)}>
              {s === "All Sun" ? (
                <>All Light</>
              ) : s === "Full Sun" ? (
                <>
                  <Sun className="h-3.5 w-3.5" aria-hidden /> Full Sun
                </>
              ) : (
                <>
                  <CloudSun className="h-3.5 w-3.5" aria-hidden /> Part Shade
                </>
              )}
            </Pill>
          ))}
        </div>

        <p className="mt-2.5 text-[0.7rem] font-medium tracking-wide text-forest-600/80">
          <span className="font-bold text-forest-800">{resultCount}</span>
          <span className="text-forest-500"> / {totalCount} trees</span>
          <span className="hidden text-forest-500 sm:inline"> · tap any tree for details</span>
        </p>
      </div>
    </div>
  );
}
