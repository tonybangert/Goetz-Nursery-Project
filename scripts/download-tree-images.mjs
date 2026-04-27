// One-time script: download Wikimedia tree images to public/trees/.
// Run with: node scripts/download-tree-images.mjs
import { execSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve("public/trees");
mkdirSync(OUT, { recursive: true });

const WIDTH = 800;
const BASE = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const images = [
  ["autumn-blaze-maple",     "Acer_freemanii_Autumn_Blaze_3zz.jpg"],
  ["red-maple-summer",       "Acer_rubrum_(summertime).JPG"],
  ["red-maple-autumn",       "Acer_rubrum_in_Autumn.jpg"],
  ["sugar-maple",            "Acer_saccharum_Rogów.JPG"],
  ["norway-maple-purple",    "Acer_platanoides_Crimson_King_kz01.jpg"],
  ["miyabe-maple-bark",      "Miyabe_Maple_Acer_miyabei_(51-292-A)_Trunk_Bark_Closeup.JPG"],
  ["norway-maple-leaf",      "Acer-platanoides-blade.JPG"],
  ["tulip-tree",             "Liriodendron_tulipifera_002.JPG"],
  ["shademaster-honeylocust","Gleditsia_triacanthos_Shademaster_1zz.jpg"],
  ["american-elm",           "American_Elm_at_Phillips_Academy,_Andover,_MA_-_May_2020.jpg"],
  ["new-horizon-elm",        "RN_Ulmus_New_Horizon_Groningen_2.JPG"],
  ["callery-pear",           "Zierbirne_=_Pyrus_calleryana_Chanticleer_(2020-03-22_Sp).JPG"],
  ["japanese-tree-lilac",    "Syringa_reticulata_Ivory_Silk_1zz.jpg"],
  ["redbud",                 "Redbud_-_Cercis_canadensis,_Leesylvania_State_Park,_Woodbridge,_Virginia,_March_27,_2023_(53167889295).jpg"],
  ["magnolia-leonard-messel","Magnolia_loebneri_'Leonard_Messel'_(1)_Meise_Nat._Plantentuin.jpg"],
  ["magnolia-merrill",       "Magnolia_loebneri_Merril1MTFL.jpg"],
  ["magnolia-royal-star",    "Magnolia_stellata_'Royal_Star'_Meise_Nat._Plantentuin.jpg"],
  ["river-birch",            "River_Birch_Betula_nigra.JPG"],
  ["gray-birch",             "Betula_populifolia_-_Sheffield_Park_and_Garden_-_East_Sussex,_England_-_DSC05428.jpg"],
  ["purple-crabapple",       "Purple_prince_crabapple_tree.JPG"],
  ["dwarf-korean-lilac",     "Syringa_meyeri_Palibin_2zz.jpg"],
  ["apple-tree",             "Apple_tree_with_red_apples.jpg"],
  ["panicle-hydrangea",      "Hydrangea_paniculata_'Limelight'.JPG"],
  ["white-spruce",           "White_Spruce,_Bow_Valley_Provincial_Park,_Alberta,_Canada_(36769088821).jpg"],
  ["norway-spruce",          "Picea_abies_(Norway_spruce)_1_(24573491097).jpg"],
  ["white-pine",             "Big_white_pine_(Pinus_strobus)_in_the_Estivant_Pines_Sanctuary.jpg"],
  ["arborvitae",             "Thuja_occidentalis_004.JPG"],
];

let ok = 0, skipped = 0, failed = 0;
for (const [slug, file] of images) {
  const dest = resolve(OUT, `${slug}.jpg`);
  if (existsSync(dest)) { skipped++; continue; }
  const url = `${BASE}${encodeURIComponent(file)}?width=${WIDTH}`;
  try {
    execSync(
      `curl -sSL -A "GoetzNurseryApp/1.0 (tony.bangert@gmail.com)" -o "${dest}" "${url}"`,
      { stdio: "inherit" }
    );
    ok++;
    console.log(`✓ ${slug}.jpg`);
  } catch (e) {
    failed++;
    console.error(`✗ ${slug}: ${e.message}`);
  }
}
console.log(`\nDone — ${ok} downloaded, ${skipped} already present, ${failed} failed.`);
