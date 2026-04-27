import { motion, useReducedMotion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

// Eight photos hand-picked from the catalog to evoke seasonal range —
// fall color, spring bloom, evergreen, ornamental fruit, dramatic bark.
const MOSAIC_SLUGS = [
  "autumn-blaze-maple",
  "magnolia-leonard-messel",
  "redbud-single",
  "ivory-silk-lilac",
  "tulip-tree",
  "river-birch",
  "norway-spruce",
  "royal-raindrop-crabapple",
];

function MosaicBackdrop() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-px" aria-hidden>
      {MOSAIC_SLUGS.map((slug) => (
        <div key={slug} className="relative overflow-hidden">
          <img
            src={`/trees/${slug}.jpg`}
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-55 saturate-[0.85] [filter:hue-rotate(-8deg)]"
          />
        </div>
      ))}
    </div>
  );
}

// A single drifting leaf glyph. Path is a stylized leaf silhouette.
function DriftingLeaf({ from, to, size, duration, delay }) {
  const reduce = useReducedMotion();
  const animate = reduce
    ? { opacity: 0.32 }
    : {
        x: [from.x, to.x],
        y: [from.y, to.y],
        rotate: [from.rotate ?? 0, (to.rotate ?? 0) + 360],
        opacity: [0, 0.42, 0.42, 0],
      };
  return (
    <motion.svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="pointer-events-none absolute text-forest-300"
      initial={{ x: from.x, y: from.y, opacity: 0 }}
      animate={animate}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.15, 0.85, 1],
      }}
    >
      {/* Stylized leaf */}
      <path
        d="M12 2.5c-4.4 1-8.5 4.6-8.5 9.6 0 5.2 4.3 9.4 9.5 9.4 5.2 0 9.5-4.2 9.5-9.4C22.5 6 16.5 2 12 2.5Zm-.4 3.7v11.2M9 9c1 2 1.6 5.4 2.6 8.4M14.4 9c-1 2-1.6 5.4-2.6 8.4"
        fill="currentColor"
        fillOpacity="0.55"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export function Header() {
  return (
    <header className="relative isolate overflow-hidden text-cream">
      {/* Layer 1 — base gradient mesh */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-600"
      />

      {/* Layer 2 — photo mosaic of catalog trees */}
      <MosaicBackdrop />

      {/* Layer 3 — darkening radial overlay (concentrated where text sits) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_85%_at_30%_55%,rgba(13,37,21,0.85)_0%,rgba(13,37,21,0.55)_45%,rgba(13,37,21,0.95)_100%)]"
      />

      {/* Layer 4 — animated ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-forest-400/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-amber-warm/15 blur-3xl"
      />

      {/* Layer 5 — drifting leaves (2 on mobile, 4 on tablet+ to reduce clutter on small screens) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <DriftingLeaf
          from={{ x: -40, y: 20, rotate: 0 }}
          to={{ x: "110vw", y: 200, rotate: 720 }}
          size={32}
          duration={28}
          delay={0}
        />
        <DriftingLeaf
          from={{ x: -60, y: 240, rotate: -20 }}
          to={{ x: "120vw", y: 80, rotate: 540 }}
          size={42}
          duration={42}
          delay={9}
        />
        <div className="hidden sm:block">
          <DriftingLeaf
            from={{ x: -20, y: 160, rotate: 30 }}
            to={{ x: "115vw", y: 60, rotate: 410 }}
            size={28}
            duration={36}
            delay={6}
          />
          <DriftingLeaf
            from={{ x: -30, y: 80, rotate: 45 }}
            to={{ x: "105vw", y: 320, rotate: 700 }}
            size={22}
            duration={32}
            delay={18}
          />
        </div>
      </div>

      {/* Layer 6 — content */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-5 px-5 pb-12 pt-8 sm:gap-7 sm:px-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-14">
        <div className="flex items-center gap-3.5 sm:gap-6">
          <div className="flex shrink-0 items-center justify-center rounded-2xl bg-cream p-2 shadow-2xl shadow-forest-950/50 ring-1 ring-forest-200/40 sm:rounded-3xl sm:p-3">
            <img
              src="/logo.webp"
              alt="Goetz's Nursery logo"
              className="h-14 w-14 object-contain sm:h-24 sm:w-24"
              width={96}
              height={96}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-forest-950/40 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-forest-300 ring-1 ring-forest-400/30 backdrop-blur-md sm:px-3 sm:text-[0.7rem] sm:tracking-[0.22em]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest-400" />
              </span>
              <span className="hidden sm:inline">2026 Catalog · </span>39 Trees Available
            </p>
            <h1 className="font-display mt-2.5 text-[clamp(1.85rem,8vw,3.6rem)] font-semibold leading-[1.02] tracking-tight text-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.3)] sm:mt-3">
              Goetz's Nursery
            </h1>
            <p className="mt-1 max-w-xl font-display text-[clamp(0.95rem,3.5vw,1.25rem)] italic font-medium leading-snug text-forest-100/95 sm:mt-1.5">
              Your Tree Expert in Southeastern Wisconsin
            </p>
          </div>
        </div>

        {/* Contact strip — frosted card; stacks on narrow phones */}
        <div className="flex flex-col gap-1 rounded-2xl border border-forest-400/25 bg-forest-950/30 px-3.5 py-2.5 backdrop-blur-md sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:px-5 sm:py-3.5">
          <a
            href="tel:+12626280502"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full text-cream transition-colors hover:text-forest-300"
          >
            <Phone className="h-4 w-4 shrink-0 text-forest-300" aria-hidden />
            <span className="font-bold tracking-tight">(262) 628-0502</span>
          </a>
          <span className="hidden text-forest-400/60 sm:inline" aria-hidden>·</span>
          <a
            href="https://maps.google.com/?q=1765+Co+Rd+CC,+Hartford,+WI+53027"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-cream/85 transition-colors hover:text-forest-300"
          >
            <MapPin className="h-4 w-4 shrink-0 text-forest-300" aria-hidden />
            <span>1765 Co Rd CC, Hartford, WI 53027</span>
          </a>
        </div>
      </div>

      {/* Bottom soft fade into the cream page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-cream"
      />
    </header>
  );
}
