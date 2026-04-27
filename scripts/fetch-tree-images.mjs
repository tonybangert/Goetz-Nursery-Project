// Smart tree-image fetcher.
//
// For each tree slug, try a list of candidate Wikimedia Commons filenames
// (cultivar-specific first, then species fallbacks). HEAD-check each,
// download the first that returns image/*, validate file size > 8 KB
// (Wikimedia error pages are ~2 KB), save as public/trees/<slug>.jpg.
//
// Run: node scripts/fetch-tree-images.mjs
import { mkdirSync, writeFileSync, existsSync, statSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("public/trees");
mkdirSync(OUT, { recursive: true });

const WIDTH = 1000;
const BASE = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const UA = "GoetzNurseryApp/1.0 (https://github.com/tonybangert/Goetz-Nursery-Project; tony.bangert@gmail.com)";

// One entry per tree. Candidates tried in order — first valid image wins.
// Selected from known Wikimedia Commons filenames + species fallbacks.
const trees = {
  "autumn-blaze-maple": [
    "Acer_freemanii_Autumn_Blaze_3zz.jpg",
    "Acer_×_freemanii_'Jeffersred'_=_'Autumn_Blaze'_kz01.jpg",
    "Acer_rubrum_in_Autumn.jpg",
  ],
  "sienna-glen-maple": [
    "Acer_freemanii_'Sienna_Glen'.jpg",
    "Acer_×_freemanii_3zz.jpg",
    "Acer_rubrum_(summertime).JPG",
  ],
  "firefall-maple": [
    "Acer_×_freemanii_'Firefall'.jpg",
    "Acer_rubrum_'Sun_Valley'.jpg",
    "Acer_rubrum_in_Autumn.jpg",
  ],
  "autumn-fantasy-maple": [
    "Acer_×_freemanii_'Autumn_Fantasy'.jpg",
    "Acer_saccharinum_-_silver_maple_-_03.jpg",
    "Acer_saccharinum_001.jpg",
  ],
  "matador-maple": [
    "Acer_×_freemanii_'Matador'.jpg",
    "Acer_rubrum_red_maple_in_fall.jpg",
    "Acer_rubrum_in_Autumn.jpg",
  ],
  "celebration-maple": [
    "Acer_×_freemanii_'Celebration'.jpg",
    "Acer_×_freemanii_-_Cyril_Magnin_Park_-_DSC02523.JPG",
    "Acer_rubrum_(summertime).JPG",
  ],
  "armstrong-maple": [
    "Acer_×_freemanii_'Armstrong'.jpg",
    "Acer_rubrum_'Armstrong'.jpg",
    "Acer_rubrum_(summertime).JPG",
  ],
  "fall-fiesta-maple": [
    "Acer_saccharum_'Fall_Fiesta'.jpg",
    "Acer_saccharum_Rogów.JPG",
    "Acer_saccharum_-_Sugar_Maple.jpg",
  ],
  "red-sunset-maple": [
    "Acer_rubrum_'Red_Sunset'.jpg",
    "Acer_rubrum_2009.JPG",
    "Acer_rubrum_in_Autumn.jpg",
  ],
  "royal-red-maple": [
    "Acer_platanoides_'Royal_Red'.jpg",
    "Acer_platanoides_Crimson_King_kz01.jpg",
    "Acer_platanoides_Crimson_King_(2).JPG",
  ],
  "state-street-maple": [
    "Acer_miyabei_'State_Street'.jpg",
    "Miyabe_Maple_Acer_miyabei_(51-292-A)_Trunk_Bark_Closeup.JPG",
    "Acer_miyabei_kz01.jpg",
  ],
  "emerald-lustre-maple": [
    "Acer_platanoides_'Emerald_Lustre'.jpg",
    "Acer_platanoides_'Emerald_Queen'_kz01.jpg",
    "Acer-platanoides-blade.JPG",
  ],
  "tulip-tree": [
    "Liriodendron_tulipifera_002.JPG",
    "Liriodendron_tulipifera_-_tulip_tree_-_03.jpg",
    "Tulip_tree_in_blossom.jpg",
  ],
  "shademaster-honeylocust": [
    "Gleditsia_triacanthos_Shademaster_1zz.jpg",
    "Gleditsia_triacanthos_inermis_'Shademaster'.jpg",
    "Gleditsia_triacanthos_inermis_kz01.jpg",
  ],
  "princeton-elm": [
    "Ulmus_americana_'Princeton'_at_the_American_University,_Washington_D.C..jpg",
    "Ulmus_americana_'Princeton'_NA_57843.jpg",
    "American_Elm_at_Phillips_Academy,_Andover,_MA_-_May_2020.jpg",
  ],
  "new-horizon-elm": [
    "RN_Ulmus_New_Horizon_Groningen_2.JPG",
    "Ulmus_'New_Horizon'_kz01.jpg",
    "Ulmus_americana_'Princeton'_NA_57843.jpg",
  ],
  "autumn-blaze-pear": [
    "Pyrus_calleryana_'Autumn_Blaze'.jpg",
    "Pyrus_calleryana_aristocrat_2.JPG",
    "Zierbirne_=_Pyrus_calleryana_Chanticleer_(2020-03-22_Sp).JPG",
  ],
  "chanticleer-pear": [
    "Zierbirne_=_Pyrus_calleryana_Chanticleer_(2020-03-22_Sp).JPG",
    "Pyrus_calleryana_'Chanticleer'_in_Bratislava.jpg",
    "Pyrus_calleryana_kz01.jpg",
  ],
  "snow-dance-lilac": [
    "Syringa_reticulata_'Snowdance'.jpg",
    "Syringa_reticulata_2zz.jpg",
    "Syringa_reticulata_Ivory_Silk_1zz.jpg",
  ],
  "ivory-silk-lilac": [
    "Syringa_reticulata_Ivory_Silk_1zz.jpg",
    "Syringa_reticulata_'Ivory_Silk'_2.JPG",
    "Syringa_reticulata_kz01.jpg",
  ],
  "redbud-single": [
    "Redbud_-_Cercis_canadensis,_Leesylvania_State_Park,_Woodbridge,_Virginia,_March_27,_2023_(53167889295).jpg",
    "Cercis_canadensis_-_Eastern_Redbud_-_03.jpg",
    "Cercis_canadensis_2zz.jpg",
  ],
  "redbud-multi": [
    "Cercis_canadensis_at_Coker_Arboretum.jpg",
    "Cercis_canadensis_kz01.jpg",
    "Cercis-canadensis-flowers.jpg",
  ],
  "magnolia-leonard-messel": [
    "Magnolia_loebneri_'Leonard_Messel'_(1)_Meise_Nat._Plantentuin.jpg",
    "Magnolia_x_loebneri_Leonard_Messel_kz01.jpg",
    "Magnolia_loebneri_Merril1MTFL.jpg",
  ],
  "magnolia-merrill": [
    "Magnolia_loebneri_Merril1MTFL.jpg",
    "Magnolia_loebneri_'Merrill'.jpg",
    "Magnolia_×_loebneri_kz01.jpg",
  ],
  "magnolia-royal-star": [
    "Magnolia_stellata_2zz.jpg",
    "Magnolia_stellata_Royal_Star_3zz.jpg",
    "Magnolia_stellata_kz01.jpg",
    "Magnolia_stellata_001.jpg",
  ],
  "river-birch": [
    "Betula_nigra_2zz.jpg",
    "Betula_nigra_4zz.jpg",
    "Betula_nigra_Heritage_3zz.jpg",
    "Betula_nigra_001.jpg",
  ],
  "whitespire-birch": [
    "Betula_populifolia_'Whitespire'.jpg",
    "Betula_populifolia_kz01.jpg",
    "Betula_papyrifera_(paper_birch)_2_(48710167761).jpg",
  ],
  "royal-raindrop-crabapple": [
    "Malus_'Royal_Raindrops'.jpg",
    "Malus_Royal_Raindrops_kz01.jpg",
    "Crabapple_(Malus)_in_bloom.jpg",
  ],
  "pink-spire-crabapple": [
    "Malus_'Pink_Spires'.jpg",
    "Malus_'Pink_Spire'.jpg",
    "Malus_floribunda_kz01.jpg",
  ],
  "gladiator-crabapple": [
    "Malus_'Gladiator'.jpg",
    "Malus_×_adstringens_'Gladiator'.jpg",
    "Malus_purpurea_kz01.jpg",
  ],
  "dwarf-korean-lilac": [
    "Syringa_meyeri_2zz.jpg",
    "Syringa_meyeri_3zz.jpg",
    "Syringa_meyeri_Palibin_3zz.jpg",
    "Syringa_meyeri_kz01.jpg",
  ],
  "tinkerbell-lilac": [
    "Syringa_'Tinkerbelle'.jpg",
    "Syringa_meyeri_'Tinkerbelle'_kz01.jpg",
    "Syringa_meyeri_2zz.jpg",
  ],
  "bloomerang-lilac": [
    "Syringa_'Bloomerang'.jpg",
    "Syringa_'Bloomerang_Dark_Purple'.jpg",
    "Syringa_x_chinensis_kz01.jpg",
  ],
  "apple-tree": [
    "Apple_tree_with_red_apples.jpg",
    "Malus_domestica_-_apple_tree_-_07.jpg",
    "Apple_tree_2.jpg",
  ],
  "panicle-hydrangea": [
    "Hydrangea_paniculata_'Limelight'_2zz.jpg",
    "Hydrangea_paniculata_Limelight_4zz.jpg",
    "Hydrangea_paniculata_'Vanille_Fraise'_kz01.jpg",
  ],
  "white-spruce": [
    "Picea_glauca_2zz.jpg",
    "Picea_glauca_3zz.jpg",
    "White_Spruce,_Bow_Valley_Provincial_Park,_Alberta,_Canada_(36769088821).jpg",
  ],
  "norway-spruce": [
    "Picea_abies_2zz.jpg",
    "Picea_abies_3zz.jpg",
    "Picea_abies_in_Estonia.jpg",
  ],
  "white-pine": [
    "Pinus_strobus_2zz.jpg",
    "Pinus_strobus_3zz.jpg",
    "Eastern_White_Pine_Cape_Croker_Park.jpg",
  ],
  "techny-arborvitae": [
    "Thuja_occidentalis_2zz.jpg",
    "Thuja_occidentalis_'Techny'_kz01.jpg",
    "Thuja_occidentalis_3zz.jpg",
  ],
};

async function head(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    const len = parseInt(res.headers.get("content-length") || "0", 10);
    if (!ct.startsWith("image/")) return null;
    if (len > 0 && len < 8000) return null; // 2 KB error pages
    return { ct, len };
  } catch {
    return null;
  }
}

async function download(url, dest) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) throw new Error(`Not an image: ${ct}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`Too small: ${buf.length} bytes`);
  writeFileSync(dest, buf);
  return buf.length;
}

const results = [];
const slugs = Object.keys(trees);

for (const slug of slugs) {
  const dest = resolve(OUT, `${slug}.jpg`);
  if (existsSync(dest) && statSync(dest).size > 8000) {
    results.push({ slug, status: "skip", size: statSync(dest).size });
    continue;
  }

  let success = null;
  for (const file of trees[slug]) {
    const url = `${BASE}${encodeURIComponent(file)}?width=${WIDTH}`;
    const probe = await head(url);
    if (!probe) continue;
    try {
      const size = await download(url, dest);
      success = { file, size };
      break;
    } catch (e) {
      continue;
    }
  }

  if (success) {
    console.log(`  ✓ ${slug.padEnd(28)} ${(success.size / 1024).toFixed(0).padStart(4)} KB  ←  ${success.file}`);
    results.push({ slug, status: "ok", file: success.file, size: success.size });
  } else {
    console.log(`  ✗ ${slug.padEnd(28)} FAILED — all candidates returned non-image`);
    results.push({ slug, status: "fail" });
    if (existsSync(dest)) unlinkSync(dest);
  }
}

const ok = results.filter(r => r.status === "ok").length;
const fail = results.filter(r => r.status === "fail").length;
const skip = results.filter(r => r.status === "skip").length;
console.log(`\nDone — ${ok} downloaded, ${skip} cached, ${fail} failed.`);
if (fail) {
  console.log(`\nFailed slugs (need manual fix):`);
  results.filter(r => r.status === "fail").forEach(r => console.log(`  - ${r.slug}`));
  process.exit(1);
}
