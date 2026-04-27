// One-time script: rewrite Wikimedia image URLs in src/App.jsx to local /trees/ paths.
// Run after download-tree-images.mjs so the local files exist.
import { readFileSync, writeFileSync } from "node:fs";

const map = {
  "Acer_freemanii_Autumn_Blaze_3zz.jpg": "autumn-blaze-maple",
  "Acer_rubrum_(summertime).JPG": "red-maple-summer",
  "Acer_rubrum_in_Autumn.jpg": "red-maple-autumn",
  "Acer_saccharum_Rogów.JPG": "sugar-maple",
  "Acer_platanoides_Crimson_King_kz01.jpg": "norway-maple-purple",
  "Miyabe_Maple_Acer_miyabei_(51-292-A)_Trunk_Bark_Closeup.JPG": "miyabe-maple-bark",
  "Acer-platanoides-blade.JPG": "norway-maple-leaf",
  "Liriodendron_tulipifera_002.JPG": "tulip-tree",
  "Gleditsia_triacanthos_Shademaster_1zz.jpg": "shademaster-honeylocust",
  "American_Elm_at_Phillips_Academy,_Andover,_MA_-_May_2020.jpg": "american-elm",
  "RN_Ulmus_New_Horizon_Groningen_2.JPG": "new-horizon-elm",
  "Zierbirne_=_Pyrus_calleryana_Chanticleer_(2020-03-22_Sp).JPG": "callery-pear",
  "Syringa_reticulata_Ivory_Silk_1zz.jpg": "japanese-tree-lilac",
  "Redbud_-_Cercis_canadensis,_Leesylvania_State_Park,_Woodbridge,_Virginia,_March_27,_2023_(53167889295).jpg": "redbud",
  "Magnolia_loebneri_'Leonard_Messel'_(1)_Meise_Nat._Plantentuin.jpg": "magnolia-leonard-messel",
  "Magnolia_loebneri_Merril1MTFL.jpg": "magnolia-merrill",
  "Magnolia_stellata_'Royal_Star'_Meise_Nat._Plantentuin.jpg": "magnolia-royal-star",
  "River_Birch_Betula_nigra.JPG": "river-birch",
  "Betula_populifolia_-_Sheffield_Park_and_Garden_-_East_Sussex,_England_-_DSC05428.jpg": "gray-birch",
  "Purple_prince_crabapple_tree.JPG": "purple-crabapple",
  "Syringa_meyeri_Palibin_2zz.jpg": "dwarf-korean-lilac",
  "Apple_tree_with_red_apples.jpg": "apple-tree",
  "Hydrangea_paniculata_'Limelight'.JPG": "panicle-hydrangea",
  "White_Spruce,_Bow_Valley_Provincial_Park,_Alberta,_Canada_(36769088821).jpg": "white-spruce",
  "Picea_abies_(Norway_spruce)_1_(24573491097).jpg": "norway-spruce",
  "Big_white_pine_(Pinus_strobus)_in_the_Estivant_Pines_Sanctuary.jpg": "white-pine",
  "Thuja_occidentalis_004.JPG": "arborvitae",
};

const PATH = "src/App.jsx";
const BASE = "https://commons.wikimedia.org/wiki/Special:FilePath/";

let src = readFileSync(PATH, "utf8");
let total = 0;

for (const [file, slug] of Object.entries(map)) {
  const url = BASE + file;
  const local = `/trees/${slug}.jpg`;
  const parts = src.split(url);
  const count = parts.length - 1;
  if (count > 0) {
    src = parts.join(local);
    total += count;
    console.log(`  ${slug.padEnd(28)} ← ${count} replacement${count > 1 ? "s" : ""}`);
  } else {
    console.log(`  ! ${slug.padEnd(26)} NO MATCH for ${file}`);
  }
}

writeFileSync(PATH, src);

const remaining = (src.match(/https:\/\/commons\.wikimedia\.org\/wiki\/Special:FilePath\//g) || []).length;
console.log(`\nTotal replacements: ${total}`);
console.log(`Remaining Wikimedia URLs in ${PATH}: ${remaining}`);
