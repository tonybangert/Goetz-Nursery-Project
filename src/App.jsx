import { useState } from "react";

const LOGO = "data:image/webp;base64,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";

const trees = [
  { name: "Autumn Blaze Maple", sizes: ["2-3\"", "3-3½\""], prices: ["$250", "$325"], category: "Deciduous", type: "Shade Tree", height: "40-55 ft", spread: "30-40 ft", leafStructure: "Opposite, deeply 5-lobed, silver-green underside", fallColor: "Brilliant scarlet-orange", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable; tolerates clay and wet soils", growthRate: "Fast (3-5 ft/yr)", baysideNotes: "Excellent for WI Zone 4b. Handles Lake Michigan wind corridors. Spectacular fall color. Great lawn specimen or boulevard tree.", tags: ["Fast-growing", "Fall Color", "Shade", "Wind Tolerant"], image: "/trees/autumn-blaze-maple.jpg", imageCaption: "Autumn Blaze Freeman maple foliage",
    pros: ["Fast growth—shade in 5-7 years", "Spectacular consistent scarlet fall color", "Tolerates clay and wet soils", "Wind-tolerant for Lake Michigan exposure"],
    cons: ["Brittle wood—storm damage risk in mature trees", "Co-dominant leaders need pruning when young", "Aggressive surface roots can heave nearby pavement", "Overplanted—loses some uniqueness factor"] },
  { name: "Sienna Glen Maple", sizes: ["2-3\""], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "40-50 ft", spread: "30-35 ft", leafStructure: "5-lobed, slightly smaller than Autumn Blaze, dark green", fallColor: "Orange-red to burgundy", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable; better drainage than Autumn Blaze", growthRate: "Moderate-Fast", baysideNotes: "Narrower canopy than Autumn Blaze—good for smaller Bayside lots near structures. More uniform branching.", tags: ["Fall Color", "Shade", "Compact Form"], image: "/trees/red-maple-summer.jpg", imageCaption: "Freeman maple parent species (Acer rubrum)",
    pros: ["Better branch structure than Autumn Blaze", "More uniform pyramidal habit", "Reliable burgundy-orange fall color", "Less prone to storm damage"],
    cons: ["Slower than Autumn Blaze to fill in", "Less wet-soil tolerant than parent species", "Less widely available at nurseries", "Fall color slightly less brilliant than Autumn Blaze"] },
  { name: "Firefall Maple", sizes: ["2-3\""], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "35-40 ft", spread: "20-25 ft", leafStructure: "3-5 lobed, red tint in spring, medium green summer", fallColor: "Deep scarlet-red", sun: "Full Sun", sunIcon: "☀️", soil: "Moist, well-drained preferred", growthRate: "Moderate", baysideNotes: "Upright columnar habit—ideal for narrow side yards on Bay Point. Very hardy for Zone 4. Consistent red fall display.", tags: ["Fall Color", "Columnar", "Shade"], image: "/trees/red-maple-autumn.jpg", imageCaption: "Red maple in fall (parent species)",
    pros: ["Very cold-hardy (Zone 3)—safe for severe WI winters", "Seedless—no messy samaras to clean up", "Compact upright form fits tight spaces", "Reliable deep red fall color"],
    cons: ["Slower growth than other Freeman maples", "Smaller mature size limits shade coverage", "Less drought tolerant than Autumn Blaze", "Narrower canopy = less shade per tree"] },
  { name: "Autumn Fantasy Maple", sizes: ["2-2½\""], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "40-45 ft", spread: "30-35 ft", leafStructure: "Classic silver maple leaf shape, bright green", fallColor: "Deep red", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, tolerates periodic flooding", growthRate: "Fast", baysideNotes: "Hybrid silver maple—great near the shoreline or lower areas prone to wet feet. Deep red fall color is exceptional.", tags: ["Fall Color", "Fast-growing", "Shade", "Flood Tolerant"], image: "/trees/red-maple-summer.jpg", imageCaption: "Freeman maple summer canopy",
    pros: ["Fast growth provides quick shade", "Outstanding deep red fall color", "Tolerates wet/poorly drained spots", "Good for low areas near the lake"],
    cons: ["Inherits silver maple weak wood tendency", "Storm damage risk at maturity", "Surface roots can be invasive", "Can develop chlorosis in alkaline soil"] },
  { name: "Matador Maple", sizes: ["2-3\""], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "40-50 ft", spread: "30-40 ft", leafStructure: "5-lobed, glossy dark green, clean branching structure", fallColor: "Fiery red-orange", sun: "Full Sun", sunIcon: "☀️", soil: "Moist, well-drained; adaptable", growthRate: "Moderate-Fast", baysideNotes: "Newer hybrid with improved branch structure. Great specimen for open lawn areas. Reliable WI performer.", tags: ["Fall Color", "Shade", "Specimen"], image: "/trees/red-maple-autumn.jpg", imageCaption: "Red maple fall foliage (parent species)",
    pros: ["Stronger branch attachment than Autumn Blaze", "Glossy summer foliage looks premium", "Brilliant fiery red-orange fall display", "Improved structural integrity over older Freemans"],
    cons: ["Less proven long-term than older cultivars", "Premium pricing at most nurseries", "Limited availability—newer introduction", "Still inherits some silver maple weaknesses"] },
  { name: "Celebration Maple", sizes: ["2-2½\""], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "35-45 ft", spread: "15-25 ft", leafStructure: "Small to medium 5-lobed, bright green, clean", fallColor: "Yellow to orange", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, handles urban conditions", growthRate: "Moderate", baysideNotes: "Narrow upright—excellent street or driveway tree. Very storm-resistant branching angles. Good near driveways.", tags: ["Street Tree", "Columnar", "Storm Resistant"], image: "/trees/red-maple-summer.jpg", imageCaption: "Freeman hybrid maple tree (parent species)",
    pros: ["Strong wide branch angles—storm resistant", "Seedless—no cleanup required", "Narrow form ideal for driveways/streets", "Tolerates urban pollution and salt"],
    cons: ["Fall color less dramatic than red Freemans (yellow-orange)", "Narrow shade footprint", "Slower growth than Autumn Blaze", "Less cold-hardy than Firefall"] },
  { name: "Armstrong Maple", sizes: ["2-3\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "40-50 ft", spread: "15-20 ft", leafStructure: "5-lobed, slender, bright green", fallColor: "Orange-red", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, tolerates clay", growthRate: "Moderate-Fast", baysideNotes: "Classic columnar form. Ideal where horizontal space is tight. Works well along property lines or fencing.", tags: ["Columnar", "Street Tree", "Fall Color"], image: "/trees/red-maple-summer.jpg", imageCaption: "Upright Freeman maple (parent species)",
    pros: ["Very narrow columnar profile—tight spaces", "Lower price point than other Freemans", "Good fall color in cooler WI climates", "Tolerates clay soils"],
    cons: ["Tight crotch angles can split in ice storms", "Less wind-tolerant than rounded forms", "Shape can look stiff/formal in naturalistic settings", "Limited shade coverage from narrow canopy"] },
  { name: "Fall Fiesta Maple", sizes: ["2-2½\""], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "50-75 ft", spread: "35-50 ft", leafStructure: "Large 5-lobed sugar maple leaf, thick, leathery", fallColor: "Yellow, orange, red—multi-toned simultaneously", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Well-drained, moist; not tolerant of wet feet", growthRate: "Slow-Moderate", baysideNotes: "True sugar maple heritage. Long-lived specimen for Bayside properties. Exceptional multi-color fall display. Perfect where you want a 100-year tree.", tags: ["Fall Color", "Long-lived", "Shade", "Specimen"], image: "/trees/sugar-maple.jpg", imageCaption: "Sugar maple in autumn color",
    pros: ["Long-lived (100+ years)—legacy tree", "Stunning multi-color simultaneous fall display", "Strong wood—storm resistant", "Tap for maple syrup once mature"],
    cons: ["Slow growth—takes years to establish", "Intolerant of wet/compacted soil", "Sensitive to road salt", "Expensive long-term investment"] },
  { name: "Red Sunset Maple", sizes: ["2-2½\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "40-50 ft", spread: "30-35 ft", leafStructure: "5-lobed, glossy dark green with reddish petioles", fallColor: "Early, brilliant red—often first to turn", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, tolerates wet soils", growthRate: "Fast", baysideNotes: "One of the most reliable red fall maples in WI. Very adaptable to North Shore conditions. First to turn in your neighborhood.", tags: ["Fall Color", "Fast-growing", "Shade"], image: "/trees/red-maple-autumn.jpg", imageCaption: "Red maple brilliant fall color",
    pros: ["Most reliable red fall color of any maple", "First to turn—extends fall color season", "Fast growth + good structure", "Tolerates wet soils"],
    cons: ["Can develop chlorosis in alkaline/clay soils", "Surface roots in lawns", "Susceptible to leafhoppers and gall mites", "Bark can be thin—sunscald risk on south side"] },
  { name: "Royal Red Maple", sizes: ["2\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "35-45 ft", spread: "25-30 ft", leafStructure: "5-lobed, deep burgundy-purple all season", fallColor: "Scarlet-red", sun: "Full Sun", sunIcon: "☀️", soil: "Moist, well-drained preferred", growthRate: "Moderate", baysideNotes: "Purple-leaf variety—year-round color interest. Strong focal point in the landscape. Pair with silver/green foliage plants for contrast.", tags: ["Purple Foliage", "Specimen", "Fall Color"], image: "/trees/norway-maple-purple.jpg", imageCaption: "Purple-leaf Norway maple (similar cultivar)",
    pros: ["Deep purple foliage all season—dramatic focal point", "Stronger color than Crimson King", "Dense shade canopy", "Holds color well in WI summers"],
    cons: ["Norway maple = invasive species concerns", "Heavy shade kills grass beneath", "Shallow aggressive roots compete with everything", "Susceptible to verticillium wilt"] },
  { name: "State Street Maple", sizes: ["2\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "40-50 ft", spread: "20-25 ft", leafStructure: "5-lobed, dark green, clean", fallColor: "Yellow to orange", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable", growthRate: "Moderate-Fast", baysideNotes: "Narrower habit than Freeman Maple. Good as a boulevard or entry tree. Consistent performer in WI winters.", tags: ["Street Tree", "Shade", "Columnar"], image: "/trees/miyabe-maple-bark.jpg", imageCaption: "Miyabe maple bark, Morris Arboretum",
    pros: ["Pest and disease resistant—Miyabe parentage", "Tolerates road salt better than most maples", "Cold-hardy to Zone 4", "Distinctive corky bark adds interest"],
    cons: ["Yellow fall color less dramatic than red maples", "Limited nursery availability", "Slower establishment than Freemans", "Lesser-known—harder to find specimens"] },
  { name: "Emerald Lustre Maple", sizes: ["2-2½\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "40-50 ft", spread: "30-40 ft", leafStructure: "5-lobed, exceptionally glossy, dark green", fallColor: "Yellow-orange", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained; adapts to clay", growthRate: "Moderate", baysideNotes: "Glossy summer foliage catches afternoon light beautifully near water. More shade tolerant than most maples—good under a canopy edge.", tags: ["Shade Tolerant", "Shade", "Glossy Foliage"], image: "/trees/norway-maple-leaf.jpg", imageCaption: "Norway maple leaves (parent species)",
    pros: ["Exceptionally glossy foliage—premium look", "Tolerates partial shade under canopy edges", "Resistant to leaf scorch", "Strong central leader—good structure"],
    cons: ["Norway maple = potentially invasive in WI", "Heavy shade prevents grass growth", "Aggressive surface roots", "Hybridizes with native species"] },
  { name: "Tulip Tree", sizes: ["2-2½\""], prices: ["$250"], category: "Deciduous", type: "Specimen Tree", height: "60-90 ft", spread: "30-50 ft", leafStructure: "Distinctive 4-lobed, tulip-shaped leaf, bright green, smooth", fallColor: "Clear golden yellow", sun: "Full Sun", sunIcon: "☀️", soil: "Deep, moist, well-drained; dislikes standing water", growthRate: "Fast", baysideNotes: "Spectacular scale tree—best for larger Bayside properties with room to grow. Tulip-shaped yellow-orange flowers in June. Native to Eastern US.", tags: ["Flowering", "Specimen", "Native", "Large Scale"], image: "/trees/tulip-tree.jpg", imageCaption: "Mature tulip tree trunk and form",
    pros: ["Unique tulip-shaped flowers and leaves", "Native species—wildlife value (pollinators)", "Fast growth + golden yellow fall color", "Pyramidal stately form at maturity"],
    cons: ["Requires large property—massive at maturity", "Brittle wood—storm damage risk", "Dislikes wet feet and drought equally", "Aphid drip can stain cars/patios beneath"] },
  { name: "Shademaster Honeylocust", sizes: ["2-2½\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "35-45 ft", spread: "25-35 ft", leafStructure: "Bipinnate compound, feathery, small leaflets, filters light", fallColor: "Bright yellow", sun: "Full Sun", sunIcon: "☀️", soil: "Very adaptable—sand, clay, salt, drought tolerant", growthRate: "Fast", baysideNotes: "Excellent North Shore tree—tolerates salt spray from lake winds. Dappled shade allows grass to grow beneath. Thornless and podless variety.", tags: ["Salt Tolerant", "Shade", "Fast-growing", "Wind Tolerant"], image: "/trees/shademaster-honeylocust.jpg", imageCaption: "Shademaster honeylocust foliage",
    pros: ["Filtered shade—grass grows beneath easily", "Thornless and podless—no maintenance", "Salt and drought tolerant", "Tiny leaflets self-mulch in fall (no raking)"],
    cons: ["Susceptible to honeylocust borer and plant bugs", "Mimosa webworm can defoliate", "Late to leaf out in spring", "Overplanted in Midwest—loses individuality"] },
  { name: "Princeton Elm", sizes: ["2-2½\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "50-70 ft", spread: "30-50 ft", leafStructure: "Oval, toothed, asymmetric base, classic elm shape", fallColor: "Yellow", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, tolerates wet soils", growthRate: "Moderate-Fast", baysideNotes: "DED-resistant elm—restoring the iconic vase shape to WI streets. Classic North Shore canopy tree. Very long-lived.", tags: ["Disease Resistant", "Shade", "Long-lived", "Classic"], image: "/trees/american-elm.jpg", imageCaption: "Mature American elm vase shape",
    pros: ["Iconic American elm vase shape", "Strong DED resistance—proven cultivar", "Long-lived legacy tree (100+ years)", "Tolerates wet and salty soils"],
    cons: ["DED resistant, not immune—still possible", "Susceptible to elm yellows and elm leaf beetle", "Massive at maturity—needs space", "Premium price for true Princeton stock"] },
  { name: "New Horizon Elm", sizes: ["2-2½\""], prices: ["$225"], category: "Deciduous", type: "Shade Tree", height: "50-70 ft", spread: "30-50 ft", leafStructure: "Oval, strongly toothed, dark glossy green", fallColor: "Yellow", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable; excellent wet soil tolerance", growthRate: "Moderate-Fast", baysideNotes: "Asian hybrid elm with outstanding DED resistance. Handles wet lake-effect areas. Broader spreading habit than Princeton.", tags: ["Disease Resistant", "Shade", "Flood Tolerant"], image: "/trees/new-horizon-elm.jpg", imageCaption: "New Horizon elm street tree, Groningen",
    pros: ["Highest DED resistance among elms", "Excellent wet soil tolerance", "Broader canopy = more shade", "Less prone to phloem necrosis"],
    cons: ["Less classic vase shape than Princeton", "Asian hybrid—less native value", "Can have weaker branch attachments", "Newer cultivar—less long-term track record"] },
  { name: "Autumn Blaze Pear", sizes: ["2-3\""], prices: ["$210"], category: "Deciduous", type: "Ornamental Tree", height: "25-30 ft", spread: "15-20 ft", leafStructure: "Oval, glossy, fine-toothed, clean dark green", fallColor: "Deep red-purple", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, tolerates clay", growthRate: "Moderate", baysideNotes: "White spring blooms + vivid fall color. Oval upright habit—ideal entry trees or flanking the house. More fire blight resistant than Bradford.", tags: ["Flowering", "Fall Color", "Ornamental", "Entry Tree"], image: "/trees/callery-pear.jpg", imageCaption: "Callery pear in spring bloom",
    pros: ["Showy white spring bloom + red-purple fall", "Better fire blight resistance than Bradford", "Stronger branching than older Callery cultivars", "Tolerates urban/clay conditions"],
    cons: ["Callery pears are invasive in many states", "Flowers smell unpleasant up close", "Storm damage risk (less than Bradford)", "Can produce viable fruit that spreads"] },
  { name: "Chanticleer Pear", sizes: ["2-2½\""], prices: ["$210"], category: "Deciduous", type: "Ornamental Tree", height: "25-30 ft", spread: "12-15 ft", leafStructure: "Oval, glossy, very fine teeth—slightly narrower than Autumn Blaze", fallColor: "Red to purple", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable", growthRate: "Moderate", baysideNotes: "The gold standard ornamental pear. Narrowest habit—best for tight entries or flanking driveways. Prolific white spring bloom.", tags: ["Flowering", "Columnar", "Ornamental", "Entry Tree"], image: "/trees/callery-pear.jpg", imageCaption: "Chanticleer pear in full white bloom",
    pros: ["Narrowest habit—perfect for tight entries", "Profuse white spring bloom", "Strongest branch structure of Callery pears", "Reliable red-purple fall color"],
    cons: ["Invasive species concern in some regions", "Fishy flower scent up close", "Short-lived (15-25 years typical)", "Banned/restricted in some Midwest states—check WI rules"] },
  { name: "Snow Dance Lilac Tree", sizes: ["2-2½\""], prices: ["$210"], category: "Deciduous", type: "Ornamental Tree", height: "15-20 ft", spread: "10-15 ft", leafStructure: "Heart-shaped, smooth, medium green", fallColor: "Yellow-green, subtle", sun: "Full Sun", sunIcon: "☀️", soil: "Well-drained; dislikes wet feet", growthRate: "Moderate", baysideNotes: "Late-blooming white lilac tree—extends season beyond common lilac. Japanese tree lilac. Very cold-hardy for WI. Fragrant early summer flowers.", tags: ["Flowering", "Fragrant", "Late Blooming", "Cold Hardy"], image: "/trees/japanese-tree-lilac.jpg", imageCaption: "Japanese tree lilac in bloom",
    pros: ["Late June bloom extends lilac season", "More compact than Ivory Silk", "Very cold-hardy (Zone 3)", "Resistant to powdery mildew"],
    cons: ["Less profuse blooms than Ivory Silk", "Newer cultivar—less proven", "Subtle fall color (mostly yellow-green)", "Honey-scent isn't traditional lilac fragrance"] },
  { name: "Ivory Silk Lilac Tree", sizes: ["2-2½\""], prices: ["$225"], category: "Deciduous", type: "Ornamental Tree", height: "20-25 ft", spread: "15-20 ft", leafStructure: "Heart-shaped, glossy, medium-dark green", fallColor: "Yellow-green", sun: "Full Sun", sunIcon: "☀️", soil: "Well-drained preferred", growthRate: "Moderate", baysideNotes: "Japanese tree lilac—creamy white plumes in June when other lilacs are done. Strong rounded habit. Excellent specimen in lawn or near patio.", tags: ["Flowering", "Fragrant", "Specimen", "Cold Hardy"], image: "/trees/japanese-tree-lilac.jpg", imageCaption: "Ivory Silk Japanese tree lilac flowering",
    pros: ["Massive creamy-white flower plumes in June", "Cold-hardy to Zone 3", "Pest and disease resistant", "Cinnamon-brown bark adds winter interest"],
    cons: ["Heavy seed pods need cleanup if displeasing", "Subtle fall color", "Honey-scented flowers not classic lilac smell", "Can be slow to establish in first 2 years"] },
  { name: "Redbud Single Stem", sizes: ["2\""], prices: ["$210"], category: "Deciduous", type: "Ornamental Tree", height: "20-30 ft", spread: "25-35 ft", leafStructure: "Heart-shaped, smooth, reddish when emerging, medium green", fallColor: "Yellow", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained; avoid heavy clay", growthRate: "Moderate", baysideNotes: "Magenta-pink spring bloom directly on branches before leaves emerge—stunning. Zone 5 marginal in severe WI winters—plant in sheltered south/east exposure on your property.", tags: ["Flowering", "Spring Interest", "Shade Tolerant", "Protected Site"], image: "/trees/redbud.jpg", imageCaption: "Eastern redbud covered in pink spring flowers",
    pros: ["Stunning pink-magenta spring bloom on bare branches", "Heart-shaped leaves are charming", "Native—wildlife and pollinator value", "Tolerates partial shade"],
    cons: ["Marginal hardiness in Bayside (Zone 4b/5a)", "Short-lived (20-30 years)", "Susceptible to verticillium wilt and canker", "Late freeze can ruin bloom"] },
  { name: "Redbud Multi Stem", sizes: ["6'"], prices: ["$210"], category: "Deciduous", type: "Ornamental Tree", height: "15-20 ft", spread: "20-25 ft", leafStructure: "Heart-shaped, smooth, multi-stem creates layered canopy", fallColor: "Yellow", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained; avoid heavy clay", growthRate: "Moderate", baysideNotes: "Multi-stem habit creates a more naturalistic, woodland edge look. Beautiful winter silhouette. Same cold hardiness caution as single stem.", tags: ["Flowering", "Multi-stem", "Naturalistic", "Protected Site"], image: "/trees/redbud.jpg", imageCaption: "Eastern redbud spring bloom",
    pros: ["More naturalistic woodland-edge look", "Multiple trunks = more bloom surface", "Beautiful winter silhouette", "Better recovery if one stem dies"],
    cons: ["Same Zone 4b/5a marginal hardiness", "Multi-stem form can be messier looking", "Harder to mow under than single stem", "Can develop weak crotch angles"] },
  { name: "Leonard Messel Magnolia", sizes: ["6'"], prices: ["$165"], category: "Deciduous", type: "Ornamental Tree", height: "15-20 ft", spread: "12-15 ft", leafStructure: "Elliptical, smooth, medium-large, dark green above / silvery below", fallColor: "Yellow-brown, subtle", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained, slightly acidic", growthRate: "Slow-Moderate", baysideNotes: "Pink star-shaped blooms in April before leaves. More cold-hardy than saucer magnolia. Plant in sheltered east-facing spot to delay bloom and avoid late frost damage.", tags: ["Flowering", "Specimen", "Cold Hardy", "Protected Site"], image: "/trees/magnolia-leonard-messel.jpg", imageCaption: "Leonard Messel magnolia in bloom",
    pros: ["Stunning pink star-shaped April blooms", "Hardier than saucer magnolia", "Compact size suits smaller gardens", "Buds are more frost-resistant than other magnolias"],
    cons: ["Late freeze can still ruin annual bloom", "Slow growing—patience required", "Needs slightly acidic soil (test first)", "Limited fall color"] },
  { name: "Merrill Magnolia", sizes: ["6'"], prices: ["$165"], category: "Deciduous", type: "Ornamental Tree", height: "20-25 ft", spread: "15-20 ft", leafStructure: "Oblong-elliptical, large, smooth, medium green", fallColor: "Yellow-brown, subtle", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained, slightly acidic", growthRate: "Moderate", baysideNotes: "Prolific white blooms. One of the hardiest deciduous magnolias—rated Zone 4. More reliable in WI than Leonard Messel.", tags: ["Flowering", "Cold Hardy", "Specimen", "White Blooms"], image: "/trees/magnolia-merrill.jpg", imageCaption: "Merrill Loebner magnolia in spring bloom",
    pros: ["One of hardiest magnolias for WI (Zone 4)", "Profuse fragrant white blooms", "More vigorous than Leonard Messel", "Reliable bloomer in cold climates"],
    cons: ["Bloom can still be lost to late frost", "Needs acidic soil for best performance", "Medium-large size needs space", "Subtle fall color"] },
  { name: "Royal Star Magnolia", sizes: ["6'"], prices: ["$165"], category: "Deciduous", type: "Ornamental Tree", height: "10-15 ft", spread: "10-15 ft", leafStructure: "Obovate, medium, smooth, dark green", fallColor: "Yellow, subtle", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained, slightly acidic", growthRate: "Slow", baysideNotes: "Star-shaped white flowers—very early spring. Compact size suits smaller garden areas near the house. Most reliable magnolia for WI Zone 4b/5a.", tags: ["Flowering", "Compact", "Cold Hardy", "Foundation Planting"], image: "/trees/magnolia-royal-star.jpg", imageCaption: "Royal Star magnolia with white star flowers",
    pros: ["Most reliable magnolia bloom for WI", "Compact—fits foundation plantings", "Profuse fragrant white star flowers", "Slow growth = easy to manage"],
    cons: ["Very early bloom highly vulnerable to late frost", "Slow growth = patient investment", "Needs acidic soil", "Brown petals after frost = ugly cleanup"] },
  { name: "River Birch Multi Stem", sizes: ["12'"], prices: ["$250"], category: "Deciduous", type: "Shade Tree", height: "40-70 ft", spread: "40-60 ft", leafStructure: "Triangular-ovate, doubly toothed, bright green", fallColor: "Yellow", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Excellent wet soil tolerance; loves stream banks and lakeside areas", growthRate: "Fast", baysideNotes: "Ideal for low/wet areas of your Bayside property near the lake. Peeling cinnamon-salmon bark is stunning year-round. Very hardy. Resistant to bronze birch borer.", tags: ["Water Tolerant", "Multi-stem", "Year-round Interest", "Native", "Borer Resistant"], image: "/trees/river-birch.jpg", imageCaption: "River birch with peeling bark",
    pros: ["Stunning peeling cinnamon-salmon bark year-round", "Highly resistant to bronze birch borer", "Thrives in wet/low spots", "Native—wildlife value"],
    cons: ["Drops twigs and small branches constantly", "Chlorosis (yellowing) common in alkaline soil", "Large mature size—needs space", "Aphid drip stains cars/decks beneath"] },
  { name: "Whitespire Birch Multi Stem", sizes: ["12'"], prices: ["$210"], category: "Deciduous", type: "Ornamental Tree", height: "30-40 ft", spread: "15-20 ft", leafStructure: "Triangular-ovate, sharply toothed, dark green, glossy", fallColor: "Yellow", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained; adapts to sandy soils", growthRate: "Moderate", baysideNotes: "White bark but with better bronze birch borer resistance than European/Paper Birch. Multi-stem clusters make dramatic focal points. Avoid dry south-facing exposures.", tags: ["White Bark", "Multi-stem", "Ornamental", "Borer Resistant"], image: "/trees/gray-birch.jpg", imageCaption: "Gray birch with white bark",
    pros: ["Classic white bark = striking specimen", "Better borer resistance than paper birch", "Smaller scale than river birch", "Multi-stem cluster is dramatic focal point"],
    cons: ["Still vulnerable to borer in stressed conditions", "Avoid dry south-facing spots", "Shorter-lived than other birches (30-40 yrs)", "Can drop branches in heavy snow"] },
  { name: "Royal Raindrop Crabapple", sizes: ["2-2½\""], prices: ["$175"], category: "Deciduous", type: "Ornamental Tree", height: "15-20 ft", spread: "15-20 ft", leafStructure: "Ovate, slightly lobed, purple-red emerging, dark green at maturity", fallColor: "Orange-red foliage", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, well-drained preferred", growthRate: "Moderate", baysideNotes: "Deep pink-purple spring flowers + purple foliage + tiny red fruit for birds. Four-season interest. Disease resistant. Outstanding Bayside specimen near the entry or patio.", tags: ["Flowering", "Four-season", "Wildlife", "Disease Resistant"], image: "/trees/purple-crabapple.jpg", imageCaption: "Purple-leaf flowering crabapple",
    pros: ["True four-season interest (bloom/foliage/fruit/winter)", "Excellent disease resistance (apple scab, fire blight)", "Tiny persistent fruit feeds birds", "Purple foliage is dramatic"],
    cons: ["Persistent fruit can stain pavement/cars", "Susceptible to Japanese beetles", "Suckers from rootstock need pruning", "Fruit drop creates lawn cleanup"] },
  { name: "Pink Spire Crabapple", sizes: ["2-2½\""], prices: ["$165"], category: "Deciduous", type: "Ornamental Tree", height: "18-20 ft", spread: "10-12 ft", leafStructure: "Ovate, reddish-purple, narrow upright habit", fallColor: "Purple-red", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable", growthRate: "Moderate", baysideNotes: "Columnar—great for narrow spaces. Pink-rose spring flowers. Narrow profile works well flanking entries or along fencing.", tags: ["Flowering", "Columnar", "Disease Resistant", "Entry Tree"], image: "/trees/purple-crabapple.jpg", imageCaption: "Pink-flowering ornamental crabapple",
    pros: ["Narrow columnar habit—tight spaces", "Pink-rose blooms + purple foliage", "Good disease resistance", "Affordable price point"],
    cons: ["Less disease resistant than Royal Raindrop", "Older cultivar—newer options outperform", "Can be susceptible to apple scab in wet years", "Smaller bloom display than rounder forms"] },
  { name: "Gladiator Crabapple", sizes: ["2-2½\""], prices: ["$165"], category: "Deciduous", type: "Ornamental Tree", height: "18-20 ft", spread: "8-10 ft", leafStructure: "Ovate, dark purple-green, narrow columnar form", fallColor: "Purple-red", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable, well-drained preferred", growthRate: "Moderate", baysideNotes: "Very narrow columnar—one of the tightest footprint crabapples. Deep pink blooms, tiny dark fruit. Perfect for a formal entry or space-constrained spots.", tags: ["Flowering", "Narrowest Form", "Entry Tree", "Formal"], image: "/trees/purple-crabapple.jpg", imageCaption: "Upright purple-leaf crabapple",
    pros: ["Tightest columnar footprint of any crabapple", "Perfect for formal symmetrical plantings", "Strong disease resistance", "Persistent tiny fruit"],
    cons: ["Very formal look may not suit naturalistic landscapes", "Limited shade due to narrow form", "Premium pricing for newer cultivar", "Can outgrow tight pruning needs"] },
  { name: "Dwarf Korean Lilac on Standard", sizes: ["30\" Head"], prices: ["$190"], category: "Deciduous", type: "Ornamental Tree", height: "5-7 ft (grafted)", spread: "4-6 ft", leafStructure: "Small, oval, medium green, very dense", fallColor: "Yellow-green, minimal", sun: "Full Sun", sunIcon: "☀️", soil: "Well-drained; drought tolerant once established", growthRate: "Slow", baysideNotes: "Grafted lollipop form—elegant in formal settings or as accent flanking a path or door. Fragrant pink-purple flowers in May. Cold-hardy and low maintenance.", tags: ["Flowering", "Fragrant", "Formal", "Accent"], image: "/trees/dwarf-korean-lilac.jpg", imageCaption: "Dwarf Korean lilac 'Palibin' in flower",
    pros: ["Elegant lollipop form—formal accent piece", "Highly fragrant traditional lilac scent", "Drought-tolerant once established", "Minimal maintenance pruning"],
    cons: ["Graft union vulnerable to winter damage", "Suckers from rootstock need vigilant removal", "Short-lived compared to non-grafted lilacs (15-25 yrs)", "Top can split off graft in heavy snow"] },
  { name: "Tinkerbell Lilac on Standard", sizes: ["30\" Head"], prices: ["$190"], category: "Deciduous", type: "Ornamental Tree", height: "5-7 ft (grafted)", spread: "4-5 ft", leafStructure: "Very small, dark green, dense mounded head", fallColor: "Yellow-green, minimal", sun: "Full Sun", sunIcon: "☀️", soil: "Well-drained preferred", growthRate: "Slow", baysideNotes: "Smaller head than Korean Lilac standard—delicate and charming. Pink buds open to pale pink. Ideal for patio containers or formal entry pairs.", tags: ["Flowering", "Fragrant", "Formal", "Patio"], image: "/trees/dwarf-korean-lilac.jpg", imageCaption: "Pink lilac panicle blooms",
    pros: ["Delicate scale—charming patio specimen", "Pink buds open pale pink (gradient effect)", "Very fragrant in May", "Container-friendly"],
    cons: ["Same graft vulnerabilities as Korean standard", "Less impactful bloom than larger lilacs", "Requires more frequent watering than Korean", "Newer cultivar—less long-term proof"] },
  { name: "Bloomerang Lilac on Standard", sizes: ["2\""], prices: ["$190"], category: "Deciduous", type: "Ornamental Tree", height: "5-7 ft (grafted)", spread: "4-6 ft", leafStructure: "Medium, oval, medium green", fallColor: "Yellow-green", sun: "Full Sun", sunIcon: "☀️", soil: "Well-drained preferred", growthRate: "Slow-Moderate", baysideNotes: "The star: blooms in spring AND again late summer through fall. Reblooming is genuinely reliable in WI. Purple flowers. Best grafted lilac for extended season color.", tags: ["Flowering", "Reblooming", "Fragrant", "Seasonal Interest"], image: "/trees/dwarf-korean-lilac.jpg", imageCaption: "Reblooming purple lilac flowers",
    pros: ["Reblooms summer-fall—rare for lilacs", "Strong purple color and classic fragrance", "Disease and mildew resistant", "Compact—fits tight spaces"],
    cons: ["Rebloom less prolific than spring flush", "Graft union risks in harsh winters", "Requires deadheading after first bloom", "Pricier than non-reblooming lilacs"] },
  { name: "Apple Tree (Fuji, Gala, Red Delicious)", sizes: ["2\""], prices: ["$150"], category: "Deciduous", type: "Fruit Tree", height: "12-20 ft", spread: "12-20 ft", leafStructure: "Oval, finely toothed, medium green", fallColor: "Yellow-orange", sun: "Full Sun", sunIcon: "☀️", soil: "Well-drained, loamy preferred", growthRate: "Moderate", baysideNotes: "Plant 2+ varieties for cross-pollination. Need spray program for best fruit production. Great addition to Bayside property—fruit plus spring bloom plus wildlife value.", tags: ["Fruit", "Flowering", "Wildlife", "Edible"], image: "/trees/apple-tree.jpg", imageCaption: "Apple tree laden with red fruit",
    pros: ["Fresh fruit harvest from your own property", "Beautiful spring bloom (white-pink)", "Wildlife value (pollinators, birds, deer)", "Edible landscape integration"],
    cons: ["Requires spray program for clean fruit", "Need 2+ varieties for pollination", "Apple maggot, scab, fire blight all common", "Fallen fruit attracts wasps and rodents"] },
  { name: "Panicle Hydrangea Tree", sizes: ["5'"], prices: ["$125"], category: "Deciduous", type: "Ornamental Tree", height: "6-10 ft", spread: "6-8 ft", leafStructure: "Ovate, coarsely toothed, medium green, matte", fallColor: "Burgundy-red (dried heads persist into winter)", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained; adaptable to clay", growthRate: "Moderate-Fast", baysideNotes: "Panicle hydrangeas (Quickfire/Limelight/Vanilla Strawberry)—very cold-hardy Zone 3. Bloom on new wood so late freeze won't ruin them. Long bloom window. Quickfire starts earliest; Vanilla Strawberry turns pink-red late season.", tags: ["Flowering", "Long Bloom", "Cold Hardy", "Shade Tolerant"], image: "/trees/panicle-hydrangea.jpg", imageCaption: "Limelight hydrangea conical blooms",
    pros: ["Reblooming from July through frost", "Bloom on new wood—immune to spring frost loss", "Very cold-hardy (Zone 3)", "Most affordable specimen at $125"],
    cons: ["Heavy bloom heads can split graft in storms", "Annual hard pruning required for best bloom", "Tree-form less stable than shrub form", "Persistent dried heads can look messy in spring"] },
  { name: "White Spruce", sizes: ["6-7'"], prices: ["$250"], category: "Evergreen", type: "Evergreen Tree", height: "40-60 ft", spread: "15-25 ft", leafStructure: "Short blue-green needles, dense pyramidal form", fallColor: "N/A - Evergreen", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable—tolerates clay and exposed sites", growthRate: "Moderate", baysideNotes: "Native WI species. Excellent windbreak for Lake Michigan exposure. Very cold-hardy. Dense screening. Tolerates dry conditions better than Norway Spruce.", tags: ["Native", "Windbreak", "Screening", "Cold Hardy"], image: "/trees/white-spruce.jpg", imageCaption: "Mature white spruce in Alberta forest",
    pros: ["Native to WI—wildlife and ecological value", "More drought-tolerant than Norway Spruce", "Excellent dense year-round screening", "Tolerates exposed/windy lakefront sites"],
    cons: ["Crushed needles smell unpleasant ('cat urine')", "Susceptible to spruce gall adelgid", "Slower growth than Norway", "Lower branches can die out in shade"] },
  { name: "Norway Spruce", sizes: ["6-7'"], prices: ["$250"], category: "Evergreen", type: "Evergreen Tree", height: "40-60 ft", spread: "20-30 ft", leafStructure: "Dark green needles, pendulous branchlets, pyramidal", fallColor: "N/A - Evergreen", sun: "Full Sun", sunIcon: "☀️", soil: "Adaptable; excellent drainage preferred", growthRate: "Fast", baysideNotes: "Fast-growing privacy screen or windbreak. Pendulous branchlets give graceful, distinctive look. Best large evergreen for quick coverage on Bay Point.", tags: ["Fast-growing", "Windbreak", "Screening", "Distinctive Form"], image: "/trees/norway-spruce.jpg", imageCaption: "Norway spruce with cones",
    pros: ["Fastest-growing large evergreen for screening", "Distinctive graceful pendulous branches", "Largest cones of any spruce—decorative", "Long-lived (100+ years possible)"],
    cons: ["Non-native—lower wildlife value", "Susceptible to needlecast diseases", "Lower branches die out in shade as it ages", "Massive at maturity—plan space carefully"] },
  { name: "White Pine", sizes: ["6-7'"], prices: ["$250"], category: "Evergreen", type: "Evergreen Tree", height: "50-80 ft", spread: "20-40 ft", leafStructure: "Soft blue-green needles in bundles of 5, feathery texture", fallColor: "N/A - Evergreen", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, well-drained; sensitive to road salt", growthRate: "Fast", baysideNotes: "Softest, most graceful large evergreen. Avoid salt spray exposure. Beautiful backdrop tree. Native to WI. Avoid planting near road salt runoff zones.", tags: ["Native", "Fast-growing", "Shade Tolerant", "Graceful"], image: "/trees/white-pine.jpg", imageCaption: "Large eastern white pine in old-growth sanctuary",
    pros: ["Softest, most graceful large evergreen", "Native—high wildlife and ecological value", "Fast growth—shade quickly", "Tolerates partial shade"],
    cons: ["Highly sensitive to road/de-icing salt", "Susceptible to white pine blister rust", "Branch breakage in heavy snow/ice", "Drops needles annually—cleanup required"] },
  { name: "Techny Arborvitae", sizes: ["6'"], prices: ["$100"], category: "Evergreen", type: "Evergreen Shrub/Tree", height: "10-15 ft", spread: "5-8 ft", leafStructure: "Scale-like, flat fan-shaped sprays, dark green, holds color in winter", fallColor: "N/A - Evergreen (stays green, no winter bronzing)", sun: "Full Sun to Partial Shade", sunIcon: "⛅", soil: "Moist, adaptable; tolerates clay", growthRate: "Slow-Moderate", baysideNotes: "Best arborvitae for WI—holds green color all winter without bronzing. Dense privacy hedge or screen. Developed at Techny IL monastery. Deer resistant compared to other arbs.", tags: ["Privacy", "Screening", "Cold Hardy", "Winter Color", "Deer Resistant"], image: "/trees/arborvitae.jpg", imageCaption: "Northern white-cedar arborvitae foliage",
    pros: ["Holds green color all winter (no bronzing)", "More deer-resistant than other arborvitae", "Affordable at $100—best value on price list", "Tolerates clay soils"],
    cons: ["Deer still browse in harsh winters despite resistance", "Slow to establish—patience needed", "Bagworm susceptibility in WI", "Snow load can split mature plants"] },
];

// === GOETZ'S BRAND PALETTE (extracted from logo) ===
const BRAND = {
  forestDark: "#1f4d2c",     // deep logo green - primary
  forest: "#2e6e3f",          // mid logo green - secondary
  leaf: "#5fa15a",            // light leaf green - accent
  cream: "#fafaf6",           // warm off-white background
  paper: "#ffffff",           // card surface
  ink: "#1a2e1f",             // near-black for body text
  muted: "#6b7d6e",           // sage gray
  border: "#e2ebe2",          // light green-gray border
  amber: "#d97706",           // warm autumn accent (for fall color highlights)
};

const categories = ["All", "Deciduous", "Evergreen"];
const sunFilters = ["All Sun", "Full Sun", "Full Sun to Partial Shade"];

function TreeImage({ tree, height = 200 }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div style={{
        width: "100%", height, borderRadius: 12, marginBottom: "0.5rem",
        background: `linear-gradient(135deg, ${BRAND.forestDark} 0%, ${BRAND.forest} 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        color: BRAND.leaf, gap: "0.4rem"
      }}>
        <span style={{ fontSize: "2.5rem" }}>🌳</span>
        <span style={{ fontSize: "0.75rem", color: BRAND.cream, textAlign: "center", padding: "0 1rem" }}>{tree.name}</span>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <img
        src={tree.image}
        alt={tree.imageCaption || tree.name}
        loading="lazy"
        onError={() => setErrored(true)}
        style={{
          width: "100%", height, objectFit: "cover",
          borderRadius: 12, display: "block",
          border: `1px solid ${BRAND.border}`,
          background: BRAND.cream
        }}
      />
      {tree.imageCaption && (
        <div style={{ fontSize: "0.67rem", color: BRAND.muted, marginTop: "0.3rem", fontStyle: "italic" }}>
          {tree.imageCaption} · via Wikimedia Commons
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sunFilter, setSunFilter] = useState("All Sun");
  const [selected, setSelected] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [showThumbnails, setShowThumbnails] = useState(true);

  const filtered = trees
    .filter(t => {
      const q = search.toLowerCase();
      return (t.name.toLowerCase().includes(q) || t.baysideNotes.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q))) &&
        (category === "All" || t.category === category) &&
        (sunFilter === "All Sun" || t.sun === sunFilter);
    })
    .sort((a, b) => {
      if (sortBy === "price") return parseInt(a.prices[0].replace("$","")) - parseInt(b.prices[0].replace("$",""));
      if (sortBy === "price-desc") return parseInt(b.prices[0].replace("$","")) - parseInt(a.prices[0].replace("$",""));
      return a.name.localeCompare(b.name);
    });

  const select = (tree) => setSelected(prev => prev?.name === tree.name ? null : tree);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: BRAND.cream, minHeight: "100vh", color: BRAND.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER with logo */}
      <div style={{
        background: `linear-gradient(180deg, ${BRAND.forestDark} 0%, ${BRAND.forest} 100%)`,
        color: BRAND.cream, padding: "1.5rem 1.25rem 1.75rem",
        borderBottom: `4px solid ${BRAND.leaf}`,
        position: "relative", overflow: "hidden"
      }}>
        {/* Subtle leaf pattern overlay */}
        <div style={{
          position: "absolute", top: 0, right: -40, width: 200, height: 200,
          background: `radial-gradient(circle, ${BRAND.leaf}33 0%, transparent 70%)`,
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
            <div style={{
              background: BRAND.cream, borderRadius: 16, padding: "0.4rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0
            }}>
              <img src={LOGO} alt="Goetz's Nursery" style={{ width: 72, height: 72, objectFit: "contain", display: "block" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: BRAND.leaf, marginBottom: "0.15rem" }}>
                2026 Price List · Tree Planner
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.5rem, 5vw, 2.4rem)", margin: 0, lineHeight: 1.05,
                fontWeight: 600, letterSpacing: "-0.01em"
              }}>
                Goetz's Nursery
              </h1>
              <div style={{ fontSize: "0.78rem", color: BRAND.cream, opacity: 0.9, marginTop: "0.15rem", lineHeight: 1.3 }}>
                Bayside Property Tree Selector
              </div>
            </div>
          </div>

          {/* Contact strip */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "0.4rem 1rem",
            paddingTop: "0.85rem",
            borderTop: `1px solid ${BRAND.leaf}55`,
            fontSize: "0.78rem"
          }}>
            <a href="tel:+12626280502" style={{
              color: BRAND.cream, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem",
              opacity: 0.95
            }}>
              <span style={{ fontSize: "0.95rem" }}>📞</span>
              <span style={{ fontWeight: 600 }}>(262) 628-0502</span>
            </a>
            <a href="https://maps.google.com/?q=1765+Co+Rd+CC,+Hartford,+WI+53027" target="_blank" rel="noreferrer" style={{
              color: BRAND.cream, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem",
              opacity: 0.95
            }}>
              <span style={{ fontSize: "0.95rem" }}>📍</span>
              <span>1765 Co Rd CC, Hartford, WI 53027</span>
            </a>
          </div>

          <div style={{
            marginTop: "0.85rem", padding: "0.5rem 0.75rem",
            background: `${BRAND.forestDark}aa`, borderRadius: 8,
            fontSize: "0.7rem", color: BRAND.cream, opacity: 0.9,
            display: "flex", alignItems: "center", gap: "0.35rem",
            border: `1px solid ${BRAND.leaf}44`
          }}>
            <span>🏡</span>
            <span>Curated for: 1459 E Bay Point Rd · USDA Zone 5a / 4b · Lake Michigan corridor</span>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{
        background: BRAND.paper, borderBottom: `1px solid ${BRAND.border}`,
        padding: "0.85rem 1.25rem", position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 2px 8px rgba(31,77,44,0.04)"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search trees, traits, tags..."
            style={{
              flex: "1 1 180px", padding: "0.55rem 0.85rem",
              border: `1.5px solid ${BRAND.border}`, borderRadius: 10,
              fontSize: "0.875rem", background: BRAND.cream,
              outline: "none", color: BRAND.ink,
              fontFamily: "inherit"
            }}
          />
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: "0.45rem 0.9rem", borderRadius: 22, fontSize: "0.78rem", fontWeight: 600,
              border: "1.5px solid", cursor: "pointer", transition: "all 0.15s",
              background: category === c ? BRAND.forestDark : "transparent",
              borderColor: category === c ? BRAND.forestDark : BRAND.border,
              color: category === c ? BRAND.cream : BRAND.muted,
              fontFamily: "inherit"
            }}>{c}</button>
          ))}
          {sunFilters.map(s => (
            <button key={s} onClick={() => setSunFilter(s)} style={{
              padding: "0.45rem 0.9rem", borderRadius: 22, fontSize: "0.78rem", fontWeight: 600,
              border: "1.5px solid", cursor: "pointer", transition: "all 0.15s",
              background: sunFilter === s ? BRAND.leaf : "transparent",
              borderColor: sunFilter === s ? BRAND.leaf : BRAND.border,
              color: sunFilter === s ? BRAND.cream : BRAND.muted,
              fontFamily: "inherit"
            }}>{s === "All Sun" ? "☀️ All" : s === "Full Sun" ? "☀️ Full" : "⛅ Part Shade"}</button>
          ))}
          <button onClick={() => setShowThumbnails(t => !t)} style={{
            padding: "0.45rem 0.9rem", borderRadius: 22, fontSize: "0.78rem", fontWeight: 600,
            border: `1.5px solid ${BRAND.border}`, cursor: "pointer", background: "transparent", color: BRAND.muted,
            fontFamily: "inherit"
          }}>{showThumbnails ? "🖼️ Hide thumbs" : "🖼️ Show thumbs"}</button>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            padding: "0.5rem 0.75rem", border: `1.5px solid ${BRAND.border}`, borderRadius: 10,
            fontSize: "0.78rem", background: BRAND.cream, color: BRAND.muted, cursor: "pointer",
            fontFamily: "inherit"
          }}>
            <option value="name">Sort: A–Z</option>
            <option value="price">Sort: Price ↑</option>
            <option value="price-desc">Sort: Price ↓</option>
          </select>
        </div>
        <div style={{ maxWidth: 900, margin: "0.4rem auto 0", fontSize: "0.72rem", color: BRAND.muted }}>
          {filtered.length} of {trees.length} trees · Tap any card for full details + pros/cons
        </div>
      </div>

      {/* TREE GRID */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.25rem 1rem", paddingBottom: selected ? "70vh" : "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {filtered.map(tree => (
            <div
              key={tree.name}
              onClick={() => select(tree)}
              style={{
                background: BRAND.paper, borderRadius: 16, cursor: "pointer", overflow: "hidden",
                border: selected?.name === tree.name ? `2px solid ${BRAND.leaf}` : `1.5px solid ${BRAND.border}`,
                transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: selected?.name === tree.name
                  ? `0 10px 32px ${BRAND.leaf}33`
                  : "0 1px 4px rgba(31,77,44,0.06)",
                transform: selected?.name === tree.name ? "translateY(-2px)" : "none"
              }}
            >
              {showThumbnails && (
                <div style={{ width: "100%", height: 130, overflow: "hidden", background: BRAND.cream, position: "relative" }}>
                  <img
                    src={tree.image}
                    alt={tree.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = `linear-gradient(135deg, ${BRAND.forestDark} 0%, ${BRAND.forest} 100%)`;
                      e.target.parentElement.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:${BRAND.leaf};font-size:2rem">🌳</div>`;
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Category badge */}
                  <div style={{
                    position: "absolute", top: 8, left: 8,
                    background: `${BRAND.forestDark}dd`, color: BRAND.cream,
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em",
                    padding: "0.2rem 0.55rem", borderRadius: 20, textTransform: "uppercase",
                    backdropFilter: "blur(4px)"
                  }}>{tree.category}</div>
                </div>
              )}
              <div style={{ padding: "0.85rem 1rem 1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", gap: "0.5rem" }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.1rem", color: BRAND.forestDark, lineHeight: 1.15, flex: 1,
                    fontWeight: 600
                  }}>
                    {tree.name}
                  </div>
                  <div style={{
                    fontSize: "0.85rem", fontWeight: 700, color: BRAND.forest, whiteSpace: "nowrap",
                    fontFamily: "'DM Sans', sans-serif"
                  }}>
                    {tree.prices[0]}{tree.prices.length > 1 && <span style={{ color: BRAND.muted, fontWeight: 500 }}>–{tree.prices[tree.prices.length-1]}</span>}
                  </div>
                </div>
                <div style={{ fontSize: "0.7rem", marginBottom: "0.5rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  <span style={{
                    padding: "0.18rem 0.55rem", borderRadius: 20, fontWeight: 600,
                    background: tree.sun === "Full Sun" ? "#fef3c7" : "#dcfce7",
                    color: tree.sun === "Full Sun" ? "#92400e" : BRAND.forestDark
                  }}>
                    {tree.sunIcon} {tree.sun}
                  </span>
                  <span style={{ color: BRAND.muted, padding: "0.18rem 0", fontWeight: 500 }}>{tree.height}</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: BRAND.ink, opacity: 0.75, margin: "0 0 0.6rem", lineHeight: 1.5 }}>
                  {tree.baysideNotes.length > 95 ? tree.baysideNotes.slice(0,95)+"..." : tree.baysideNotes}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                  {tree.tags.slice(0,3).map(tag => (
                    <span key={tag} style={{
                      padding: "0.12rem 0.5rem", borderRadius: 20, fontSize: "0.65rem", fontWeight: 600,
                      background: `${BRAND.leaf}22`, color: BRAND.forestDark
                    }}>{tag}</span>
                  ))}
                  {tree.tags.length > 3 && <span style={{ fontSize: "0.65rem", color: BRAND.muted }}>+{tree.tags.length-3}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAIL PANEL */}
      {selected && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: BRAND.paper, borderTop: `3px solid ${BRAND.leaf}`,
          boxShadow: `0 -10px 50px ${BRAND.forestDark}33`,
          maxHeight: "70vh", overflowY: "auto",
          borderRadius: "20px 20px 0 0", padding: "1.25rem 1.5rem 2rem"
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND.leaf, marginBottom: "0.25rem" }}>
                  {selected.category} · {selected.type}
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.65rem", color: BRAND.forestDark, margin: 0, lineHeight: 1.1,
                  fontWeight: 600
                }}>
                  {selected.name}
                </h2>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background: BRAND.cream, border: `1.5px solid ${BRAND.border}`, borderRadius: "50%", width: 34, height: 34,
                cursor: "pointer", fontSize: "1rem", color: BRAND.muted, flexShrink: 0
              }}>✕</button>
            </div>

            <TreeImage tree={selected} height={220} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "0.6rem", marginBottom: "1rem" }}>
              {[
                ["📏 Size", selected.sizes.join(", ")],
                ["💵 Price", selected.prices.join(" / ")],
                ["📐 Height", selected.height],
                ["↔️ Spread", selected.spread],
                ["☀️ Sun", selected.sun],
                ["🌱 Growth", selected.growthRate],
                ["🍂 Fall Color", selected.fallColor],
                ["💧 Soil", selected.soil],
              ].map(([label, val]) => (
                <div key={label} style={{
                  background: BRAND.cream, borderRadius: 10,
                  padding: "0.55rem 0.75rem",
                  border: `1px solid ${BRAND.border}`
                }}>
                  <div style={{ fontSize: "0.6rem", fontWeight: 700, color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>{label}</div>
                  <div style={{ fontSize: "0.82rem", color: BRAND.forestDark, fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Pros & Cons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.75rem", marginBottom: "0.85rem" }}>
              <div style={{
                background: `${BRAND.leaf}15`, borderLeft: `4px solid ${BRAND.forest}`,
                borderRadius: "0 12px 12px 0", padding: "0.85rem 1rem"
              }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: BRAND.forestDark, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.95rem" }}>✓</span> Pros
                </div>
                <ul style={{ margin: 0, paddingLeft: "1.15rem", fontSize: "0.82rem", color: BRAND.ink, lineHeight: 1.55 }}>
                  {selected.pros.map((pro, i) => (
                    <li key={i} style={{ marginBottom: "0.3rem" }}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div style={{
                background: "#fef2f2", borderLeft: "4px solid #dc2626",
                borderRadius: "0 12px 12px 0", padding: "0.85rem 1rem"
              }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ fontSize: "0.95rem" }}>⚠</span> Cons
                </div>
                <ul style={{ margin: 0, paddingLeft: "1.15rem", fontSize: "0.82rem", color: "#991b1b", lineHeight: 1.55 }}>
                  {selected.cons.map((con, i) => (
                    <li key={i} style={{ marginBottom: "0.3rem" }}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bayside Notes */}
            <div style={{
              background: `${BRAND.amber}11`,
              borderLeft: `4px solid ${BRAND.amber}`,
              borderRadius: "0 12px 12px 0", padding: "0.85rem 1rem", marginBottom: "0.85rem"
            }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: BRAND.amber, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>
                🏡 Bayside Notes
              </div>
              <p style={{ margin: 0, fontSize: "0.875rem", color: BRAND.ink, lineHeight: 1.6 }}>{selected.baysideNotes}</p>
            </div>

            {/* Leaf Structure */}
            <div style={{ marginBottom: "0.85rem" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: BRAND.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>🍃 Leaf Structure</div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: BRAND.ink, opacity: 0.8 }}>{selected.leafStructure}</p>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
              {selected.tags.map(tag => (
                <span key={tag} style={{
                  padding: "0.28rem 0.7rem", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600,
                  background: BRAND.forestDark, color: BRAND.leaf
                }}>{tag}</span>
              ))}
            </div>

            {/* Goetz CTA footer */}
            <div style={{
              background: `linear-gradient(135deg, ${BRAND.forestDark} 0%, ${BRAND.forest} 100%)`,
              borderRadius: 14, padding: "0.95rem 1rem",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.85rem",
              flexWrap: "wrap", color: BRAND.cream
            }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND.leaf, marginBottom: "0.2rem" }}>
                  Ready to order?
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>Call Goetz's Nursery</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.85, marginTop: "0.15rem" }}>Delivery & installation available</div>
              </div>
              <a href="tel:+12626280502" style={{
                background: BRAND.leaf, color: BRAND.forestDark,
                padding: "0.55rem 1.15rem", borderRadius: 22,
                fontSize: "0.85rem", fontWeight: 700, textDecoration: "none",
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.35rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
              }}>📞 (262) 628-0502</a>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        background: BRAND.forestDark, color: BRAND.cream,
        padding: "1.5rem 1.25rem", marginTop: selected ? 0 : "1.5rem",
        borderTop: `2px solid ${BRAND.leaf}`
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              background: BRAND.cream, borderRadius: 10, padding: "0.3rem",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <img src={LOGO} alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
            </div>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.1rem", fontWeight: 600, lineHeight: 1
              }}>Goetz's Nursery</div>
              <div style={{ fontSize: "0.7rem", opacity: 0.8, marginTop: "0.2rem" }}>
                1765 Co Rd CC · Hartford, WI 53027
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.78rem", display: "flex", flexDirection: "column", gap: "0.2rem", alignItems: "flex-end" }}>
            <a href="tel:+12626280502" style={{ color: BRAND.leaf, textDecoration: "none", fontWeight: 700 }}>(262) 628-0502</a>
            <span style={{ opacity: 0.7, fontSize: "0.68rem" }}>Prices valid while supplies last</span>
          </div>
        </div>
      </div>
    </div>
  );
}
