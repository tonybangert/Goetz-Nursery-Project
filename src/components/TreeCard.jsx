import { motion } from "framer-motion";
import { Sun, CloudSun, ArrowUpRight } from "lucide-react";
import { TreeImage } from "./TreeImage";

const SunIcon = ({ sun }) =>
  sun === "Full Sun" ? <Sun className="h-3 w-3" aria-hidden /> : <CloudSun className="h-3 w-3" aria-hidden />;

export function TreeCard({ tree, index, onSelect }) {
  const priceRange =
    tree.prices.length > 1
      ? `${tree.prices[0]} – ${tree.prices[tree.prices.length - 1]}`
      : tree.prices[0];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(tree)}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.025, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      whileTap={{ y: -1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm shadow-forest-950/5 ring-1 ring-forest-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-forest-900/10 hover:ring-forest-200 active:ring-forest-300 focus-visible:ring-2 focus-visible:ring-forest-500"
      aria-label={`${tree.name}, ${priceRange}, mature height ${tree.height}, ${tree.sun}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <TreeImage
          tree={tree}
          eager={index < 6}
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Top-left category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-forest-900/85 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-cream backdrop-blur-md">
          {tree.category}
        </span>
        {/* Top-right hover affordance */}
        <span className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-forest-700 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-4 pt-3.5 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-forest-800">
            {tree.name}
          </h3>
          <span className="shrink-0 rounded-md bg-forest-50 px-2 py-0.5 text-sm font-bold text-forest-700">
            {priceRange}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-[0.7rem]">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-700 ring-1 ring-amber-100">
            <SunIcon sun={tree.sun} />
            {tree.sun.replace("Full Sun to Partial Shade", "Sun/Part")}
          </span>
          <span
            className="inline-flex items-center rounded-full bg-forest-50 px-2 py-0.5 font-medium text-forest-700"
            title="Height at maturity"
          >
            <span className="mr-1 text-[0.55rem] font-bold uppercase tracking-wider text-forest-500">
              Mature
            </span>
            {tree.height}
          </span>
        </div>

        <p className="line-clamp-2 text-[0.825rem] leading-relaxed text-ink/65 sm:text-[0.78rem]">
          {tree.baysideNotes}
        </p>

        <div className="mt-auto flex flex-wrap gap-1 pt-1">
          {tree.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-forest-100/70 px-2 py-0.5 text-[0.62rem] font-semibold text-forest-700"
            >
              {tag}
            </span>
          ))}
          {tree.tags.length > 3 && (
            <span className="px-1 text-[0.62rem] font-medium text-forest-400">
              +{tree.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
