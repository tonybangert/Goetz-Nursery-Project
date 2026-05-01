import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Sun, CloudSun, Ruler, MoveHorizontal, Sprout, Leaf, Droplets, Calendar, Check, AlertTriangle } from "lucide-react";
import { TreeImage } from "./TreeImage";

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-forest-50/80 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden />
      <div className="min-w-0">
        <div className="text-[0.6rem] font-bold uppercase tracking-wider text-forest-500">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-semibold leading-snug text-forest-800">
          {value}
        </div>
      </div>
    </div>
  );
}

export function TreeDialog({ tree, onClose }) {
  const open = Boolean(tree);
  const SunIcon = tree?.sun === "Full Sun" ? Sun : CloudSun;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-forest-950/55 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-area fixed left-1/2 top-1/2 z-50 max-h-[94dvh] w-[min(48rem,calc(100vw-1rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl shadow-forest-950/40 ring-1 ring-forest-100"
              >
                <Dialog.Title className="sr-only">{tree.name}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  {tree.type} · {tree.baysideNotes}
                </Dialog.Description>

                {/* Hero image — 4:3 on phones (shows more of portrait trees), 16:9 on tablets+ */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl sm:aspect-[16/9]">
                  <TreeImage
                    tree={tree}
                    eager
                    className="absolute inset-0"
                  />
                  {/* Tablet+ only: gradient + title overlay (mobile shows the title in a clean header below the image) */}
                  <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-forest-950/75 via-forest-950/15 to-transparent sm:block" />
                  <div className="absolute inset-x-0 bottom-0 hidden px-6 pb-5 sm:block">
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-forest-300">
                      {tree.category} · {tree.type}
                    </div>
                    <h2 className="font-display mt-1 text-3xl font-semibold leading-tight text-cream drop-shadow-md">
                      {tree.name}
                    </h2>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-forest-800 shadow-md backdrop-blur-md transition-colors hover:bg-white sm:right-4 sm:top-4"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Mobile-only title header — full readable contrast against the white card */}
                <div className="border-b border-forest-100 px-5 pb-4 pt-5 sm:hidden">
                  <div className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-forest-500">
                    {tree.category} · {tree.type}
                  </div>
                  <h2 className="font-display mt-1 text-[1.6rem] font-semibold leading-[1.15] text-forest-900">
                    {tree.name}
                  </h2>
                </div>

                <div className="space-y-5 px-5 py-5 pb-safe sm:px-8 sm:py-6">
                  {/* Price + sizes */}
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-2xl font-semibold text-forest-800">
                      {tree.prices.join(" / ")}
                    </span>
                    <span className="text-sm text-forest-600">
                      {tree.sizes.join(", ")}
                    </span>
                  </div>

                  {/* Spec grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    <Spec icon={Ruler} label="Height at Maturity" value={tree.height} />
                    <Spec icon={MoveHorizontal} label="Mature Spread" value={tree.spread} />
                    <Spec icon={SunIcon} label="Sun" value={tree.sun} />
                    <Spec icon={Sprout} label="Growth" value={tree.growthRate} />
                    <Spec icon={Leaf} label="Fall Color" value={tree.fallColor} />
                    <Spec icon={Droplets} label="Soil" value={tree.soil} />
                    <Spec icon={Calendar} label="Bloom" value={tree.tags.find((t) => t.toLowerCase().includes("bloom")) || tree.type} />
                    <Spec icon={Leaf} label="Foliage" value={tree.leafStructure.split(",")[0]} />
                  </div>

                  {/* Pros / Cons */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-forest-100 bg-forest-50/60 p-4">
                      <div className="mb-2 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-forest-700">
                        <Check className="h-3.5 w-3.5" aria-hidden /> Pros
                      </div>
                      <ul className="space-y-1.5 text-sm leading-relaxed text-forest-900">
                        {tree.pros.map((p, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-forest-500" aria-hidden />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                      <div className="mb-2 flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-amber-700">
                        <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> Trade-offs
                      </div>
                      <ul className="space-y-1.5 text-sm leading-relaxed text-amber-900">
                        {tree.cons.map((c, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Siting notes */}
                  <div className="rounded-xl border-l-4 border-forest-500 bg-forest-50/40 p-4">
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest text-forest-600">
                      Siting Notes
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest-900">
                      {tree.baysideNotes}
                    </p>
                  </div>

                  {/* Leaf detail */}
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest text-forest-500">
                      Leaf Structure
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink/75">
                      {tree.leafStructure}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tree.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-forest-800 px-2.5 py-1 text-[0.7rem] font-semibold text-forest-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA — full-width tap target on mobile */}
                  <div className="flex flex-col items-stretch gap-3 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-600 p-4 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-forest-300">
                        Ready to plant?
                      </div>
                      <div className="mt-0.5 text-base font-semibold">Talk to Goetz's Nursery</div>
                      <div className="mt-0.5 text-xs opacity-85">Delivery & installation available</div>
                    </div>
                    <a
                      href="tel:+12626280502"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-forest-300 px-5 py-3 text-base font-bold text-forest-900 shadow-md transition-colors hover:bg-cream sm:w-auto sm:py-2.5 sm:text-sm"
                    >
                      <Phone className="h-4 w-4" />
                      (262) 628-0502
                    </a>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
