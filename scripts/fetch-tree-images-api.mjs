// Fallback: use Wikimedia Commons search API to find images for failed trees.
// Run after fetch-tree-images.mjs catches what it can. This handles the rest.
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("public/trees");
mkdirSync(OUT, { recursive: true });

const WIDTH = 1000;
const BASE = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "GoetzNurseryApp/1.0 (https://github.com/tonybangert/Goetz-Nursery-Project; tony.bangert@gmail.com)";

// Slug → search query (scientific name + cultivar where useful)
const queries = {
  "autumn-blaze-maple":      "Acer freemanii Autumn Blaze",
  "firefall-maple":          "Acer rubrum red maple autumn",
  "matador-maple":           "Acer rubrum tree fall color",
  "red-sunset-maple":        "Acer rubrum Red Sunset",
  "royal-red-maple":         "Acer platanoides Royal Red",
  "redbud-multi":            "Cercis canadensis flowering tree",
  "whitespire-birch":        "Betula populifolia tree",
  "royal-raindrop-crabapple":"Malus crabapple flowering tree pink",
  "gladiator-crabapple":     "Malus purpurea flowering crabapple",
  "bloomerang-lilac":        "Syringa lilac flowers purple",
  "norway-spruce":           "Picea abies Norway spruce tree",
  "techny-arborvitae":       "Thuja occidentalis tree foliage hedge",
};

async function search(query) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srnamespace: "6",
    srlimit: "20",
    srsearch: `${query} filetype:bitmap`,
    origin: "*",
  });
  const res = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const data = await res.json();
  const hits = data?.query?.search ?? [];
  return hits
    .map(h => h.title.replace(/^File:/, ""))
    .filter(t => /\.(jpg|jpeg|png|webp)$/i.test(t));
}

async function tryDownload(file, dest) {
  const url = `${BASE}${encodeURIComponent(file)}?width=${WIDTH}`;
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } });
  if (!res.ok) return false;
  const ct = res.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) return false;
  writeFileSync(dest, buf);
  return buf.length;
}

let ok = 0, fail = 0;
for (const [slug, query] of Object.entries(queries)) {
  const dest = resolve(OUT, `${slug}.jpg`);
  if (existsSync(dest) && statSync(dest).size > 8000) {
    console.log(`  ↻ ${slug.padEnd(28)} cached`);
    continue;
  }

  const candidates = await search(query);
  let success = null;
  for (const file of candidates) {
    try {
      const size = await tryDownload(file, dest);
      if (size) {
        success = { file, size };
        break;
      }
    } catch { continue; }
  }

  if (success) {
    ok++;
    console.log(`  ✓ ${slug.padEnd(28)} ${(success.size / 1024).toFixed(0).padStart(4)} KB  ←  ${success.file}`);
  } else {
    fail++;
    console.log(`  ✗ ${slug.padEnd(28)} no usable result for "${query}"`);
  }
}

console.log(`\nDone — ${ok} downloaded, ${fail} failed.`);
process.exit(fail ? 1 : 0);
