// ==========================================================================
// Anas Hodali Architecture — projects-data.js
// Content for the fullscreen project overlay (see .project-overlay in
// index.html + renderOverlay()/initProjectOverlay() in main.js). One entry
// per project, keyed by the same id used in each card's data-project
// attribute in index.html.
//
// Everything text-wise here is placeholder/draft copy written to test the
// overlay layout, not final approved project descriptions — swap it out
// project by project whenever real copy is ready. `tones` picks which of
// the shared .ov-placeholder gradient tones (1-8, same palette as the grid
// cards) each of the overlay's 7 image slots uses, in this fixed order:
// [spread-B, spread-2 full image, gallery tile 1..5]. Every project has
// exactly one real photo (heroImage) — the rest stay labeled placeholders
// until real photography exists.
// ==========================================================================

window.PROJECTS = {

  masjid: {
    title: "Masjid Al-Akhawayn",
    titleAr: "مسجد الأخوين",
    location: "Birzeit, Palestine",
    heroImage: "assets/images/masjid.webp",
    heroImageAlt: "Masjid Al-Akhawayn — exterior view",
    kicker: "Case Study — 01 / Public",
    headline: "Prayer Hall as Threshold: Reworking the Village Mosque",
    paragraphs: [
      "Sited at the edge of Birzeit, the mosque is organized around a single question: how a threshold — the line between courtyard and prayer hall, between village and worship — can be widened rather than simply crossed. The design stretches that line into a shaded colonnade that reads as public space long before it reads as sacred space.",
      "A folded concrete roof lifts toward the qibla wall, drawing a single band of clerestory light down its length; underneath, local stone cladding and a restrained material palette keep the hall quiet enough for the light to do most of the talking."
    ],
    facts: [
      { k: "Location", v: "Birzeit, Palestine" },
      { k: "Program", v: "Public" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "The minaret is kept low and unlit — the roofline, not a tower, is what marks the building on the skyline at night.",
    materialsHeading: "Materials & Structure",
    materialsText: "Board-formed concrete carries the roof's long spans, left exposed inside the hall; the courtyard walls are faced in a warm local stone laid in a coursing pattern that echoes the older buildings surrounding the site. Openings are kept few and deliberate, so daylight arrives as event rather than ambience.",
    // real photography — see assets/images/masjid/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (masjid 5.webp)
    // was moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/RtNbASv5m_M",
    spread2Image: "assets/images/masjid/masjid%20interior%201.webp",
    spread2ImageAlt: "Masjid Al-Akhawayn — interior view",
    galleryImages: [
      { src: "assets/images/masjid/masjid%203.webp", alt: "Masjid Al-Akhawayn — exterior detail" },
      { src: "assets/images/masjid/masjid%204.webp", alt: "Masjid Al-Akhawayn — exterior detail" },
      { src: "assets/images/masjid/masjid%20door.webp", alt: "Masjid Al-Akhawayn — entrance detail" },
      { src: "assets/images/masjid/masjid%20interior%202.webp", alt: "Masjid Al-Akhawayn — interior detail" },
      { src: "assets/images/masjid/masjid%205.webp", alt: "Masjid Al-Akhawayn — exterior, alternate view" }
    ],
    tones: [4, 7, 1, 2, 6, 3, 4]
  },

  band: {
    title: "B’nd",
    titleAr: "بند",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/band.webp",
    heroImageAlt: "B’nd — exterior view",
    kicker: "Case Study — 02 / Residential — Interior Design",
    headline: "B’nd: A Residence Organized Around a Single Ribbon of Circulation",
    paragraphs: [
      "Set on a narrow infill lot in Al-Bireh, B’nd takes its name from the folded concrete band that wraps stair, corridor and balcony into one continuous move — freeing every room around it to be planned on its own terms rather than around a fixed hallway.",
      "The ribbon steps outward at each floor to shade the one below, so the building manages its own solar gain before any mechanical system has to; the ground floor stays porous to the street, with the family's more private spaces stacked above and set back from view."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential — Interior Design" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The corridor stopped being leftover space and became the one move that organizes the whole house.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame carries the cantilevered band itself, finished in a pale sand-colored render that reads close to the surrounding stone; interior partitions are lightweight so the plan can be reconfigured room by room as the family's needs change.",
    // real photography — see assets/images/band/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (29.webp) was
    // moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/RBziDpOJ5BY",
    spread2Image: "assets/images/band/Untitled-13.webp",
    spread2ImageAlt: "B’nd — wide exterior view",
    galleryImages: [
      { src: "assets/images/band/f5.webp", alt: "B’nd — exterior detail" },
      { src: "assets/images/band/Untitled-5.webp", alt: "B’nd — detail view" },
      { src: "assets/images/band/Untitled-12.webp", alt: "B’nd — detail view" },
      { src: "assets/images/band/1.jpeg", alt: "B’nd — floor plan 1" },
      { src: "assets/images/band/2.jpeg", alt: "B’nd — floor plan 2" },
      { src: "assets/images/band/3.jpeg", alt: "B’nd — floor plan 3" },
      { src: "assets/images/band/4.jpeg", alt: "B’nd — floor plan 4" },
      { src: "assets/images/band/5.jpeg", alt: "B’nd — floor plan 5" },
      { src: "assets/images/band/29.webp", alt: "B’nd — exterior, alternate view" }
    ],
    tones: [4, 5, 6, 7, 8, 1, 2]
  },

  omary: {
    title: "Mirsal",
    titleAr: "مرسال",
    location: "Al-Baloo', Palestine",
    heroImage: "assets/images/omary.webp",
    heroImageAlt: "Mirsal — exterior view",
    kicker: "Case Study — 03 / Residential",
    headline: "Mirsal: A Courtyard House Stepped Into a Sloped Site",
    paragraphs: [
      "Mirsal sits on a steeply sloped plot in Al-Baloo', and rather than fighting the grade with retaining walls, the house steps down it in three shallow terraces, each holding its own outdoor room.",
      "Bedrooms sit at the quiet upper terrace, living spaces open onto the mid-level courtyard, and a smaller guest suite occupies the lowest terrace with its own separate entrance — letting three generations share one address without sharing every room."
    ],
    facts: [
      { k: "Location", v: "Al-Baloo', Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "Every terrace is really just a room with the roof left off.",
    materialsHeading: "Materials & Structure",
    materialsText: "Load-bearing stone walls, quarried locally, carry most of the structure; where the plan opens up, slender steel columns take over so the courtyard-facing walls can be almost entirely glazed.",
    // real photography — see assets/images/omary/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (Untitled-4.webp)
    // was moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/79JLYznOaDk",
    spread2Image: "assets/images/omary/Untitled-5.webp",
    spread2ImageAlt: "Mirsal — wide exterior view",
    galleryImages: [
      { src: "assets/images/omary/living-room.webp", alt: "Mirsal — exterior, street view" },
      { src: "assets/images/omary/Untitled-4.webp", alt: "Mirsal — exterior, alternate view" }
    ],
    tones: [6, 7, 8, 1, 2, 3, 4]
  },

  vivian: {
    title: "Vivian",
    titleAr: "فيفيان",
    location: "Al-Baloo', Palestine",
    heroImage: "assets/images/vivian.webp",
    heroImageAlt: "Vivian — open-plan living, dining and kitchen",
    kicker: "Case Study — 18 / Interior Design",
    headline: "Vivian: One Apartment, Designed From the Inside Out",
    paragraphs: [
      "Vivian is a single apartment within Mirsal, and the project is entirely about its interior: kitchen, dining and living are read as one continuous room, with glazed walls pulling the garden terrace into the daily life of the space.",
      "A restrained palette of white, charcoal and walnut keeps the plan calm, while linear ceiling lighting, a bookshelf column and a few deliberate pieces of colour give each zone its own character without breaking the openness."
    ],
    facts: [
      { k: "Location", v: "Al-Baloo', Palestine" },
      { k: "Program", v: "Interior Design" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The furniture does the zoning, so the room never has to be cut up.",
    materialsHeading: "Materials & Finishes",
    materialsText: "Large-format grey marble-effect floor tiles run through every zone; matte charcoal joinery and walnut accents frame the kitchen and shelving, set against white ceilings with concealed linear lighting.",
    // real photography — see assets/images/vivian/. Interior renders moved
    // here from Mirsal's gallery (Vivian is one apartment inside Mirsal).
    spreadBImage: "assets/images/vivian/kitchen-dining.webp",
    spreadBImageAlt: "Vivian — living room onto the terrace",
    spread2Image: "assets/images/vivian/open-plan.webp",
    spread2ImageAlt: "Vivian — living area",
    galleryImages: [
      { src: "assets/images/vivian/dining-kitchen.webp", alt: "Vivian — kitchen and dining" },
      { src: "assets/images/vivian/living-terrace.webp", alt: "Vivian — open-plan interior" }
    ],
    tones: [6, 7, 8, 1, 2, 3, 4]
  },

  jalal: {
    title: "Silwad Private Residence #2",
    titleAr: "منزل خاص سلواد ٢",
    location: "Silwad, Palestine",
    heroImage: "assets/images/jalal.webp",
    heroImageAlt: "Silwad Private Residence #2 — front elevation and garage",
    kicker: "Case Study — 19 / Private residence",
    headline: "Silwad Private Residence #2: White Stone, Arched Openings, Timber Screens",
    paragraphs: [
      "This Silwad house is a two-storey family home built from white stone in two textures: smooth dressed blocks for the main walls and rougher bush-hammered stone for the entrance piers and stair tower. Pairs of arched windows and a stepped cornice line give the street elevations a traditional rhythm.",
      "On the ground floor a covered terrace opens to the garden under the upper floor, and the boundary wall carries perforated timber screens and gates, so the house stays private from the street while still showing its stonework."
    ],
    facts: [
      { k: "Location", v: "Silwad, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024" }
    ],
    pullquote: "Smooth stone for the walls, rough stone for the piers — one material, two textures.",
    materialsHeading: "Materials & Finishes",
    materialsText: "White dressed stone clads the walls, with bush-hammered stone on the entrance piers and stair tower. Window frames are dark metal, doors, gates and the roof pergola are timber, and the boundary wall carries geometric perforated timber screens.",
    // real photography — see assets/images/jalal/. The hero (jalal.webp) is
    // the front elevation; the aerial view sits in the gallery.
    spreadBImage: "assets/images/jalal/02.webp",
    spreadBImageAlt: "Silwad Private Residence #2 — side elevation and covered terrace",
    spread2Image: "assets/images/jalal/03.webp",
    spread2ImageAlt: "Silwad Private Residence #2 — street view",
    galleryImages: [
      { src: "assets/images/jalal/04.webp", alt: "Silwad Private Residence #2 — aerial view" }
    ],
    tones: [2, 3, 4, 5, 6, 7, 8]
  },

  jalil: {
    title: "Jalil",
    titleAr: "جليل",
    location: "Surda, Palestine",
    heroImage: "assets/images/jalil.webp",
    heroImageAlt: "Jalil — street elevation with ground-floor shops",
    kicker: "Case Study — 20 / Commercial — Residential",
    headline: "Jalil: Shops at the Street, Apartments Stacked Above",
    paragraphs: [
      "Jalil is a mixed-use building in Surda. A row of glazed shopfronts runs along the street at ground level, and the apartments above are set back behind deep balconies framed in stone, so the public floor and the private floors read as two distinct layers.",
      "Stepped balconies, a timber-clad corner bay and tall stone frames break up the long facade. At the top, a stone-framed roof terrace with a timber pergola finishes the building and gives the upper apartments private outdoor space."
    ],
    facts: [
      { k: "Location", v: "Surda, Palestine" },
      { k: "Program", v: "Commercial — Residential" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022" }
    ],
    pullquote: "The shops belong to the street; the balconies belong to the apartments above.",
    materialsHeading: "Materials & Finishes",
    materialsText: "Pale limestone cladding in two tones is paired with timber slats, dark metal fascias and glass balustrades. Linear LED strips run under each balcony slab, and the roof terrace carries a timber pergola and planted edges.",
    // real photography — see assets/images/jalil/. The hero (jalil.webp) is
    // the daytime street view; the remaining five renders fill the overlay.
    spreadBImage: "assets/images/jalil/02.webp",
    spreadBImageAlt: "Jalil — street elevation at dusk",
    spread2Image: "assets/images/jalil/04.webp",
    spread2ImageAlt: "Jalil — front elevation",
    galleryImages: [
      { src: "assets/images/jalil/03.webp", alt: "Jalil — tower and stone-framed balconies" },
      { src: "assets/images/jalil/05.webp", alt: "Jalil — corner view with shopfronts" },
      { src: "assets/images/jalil/06.webp", alt: "Jalil — facade detail from below" }
    ],
    tones: [5, 6, 7, 8, 1, 2, 3]
  },

  meet: {
    title: "Meet Moot",
    titleAr: "ميت موت",
    location: "Masyoun, Palestine",
    heroImage: "assets/images/meet.webp",
    heroImageAlt: "Meet Moot — restaurant entrance and timber drum",
    kicker: "Case Study — 21 / Commercial",
    headline: "Meet Moot: A Restaurant Built From Three Distinct Volumes",
    paragraphs: [
      "Meet Moot is a freestanding restaurant in Masyoun, made of three volumes set side by side: a round drum clad in horizontal timber, a glazed dining hall under a dark rectangular frame, and a white stone block with a cantilevered upper floor that holds the second dining level.",
      "The building sits on a sloping street and steps up with it. A planted terrace with outdoor seating wraps the entrance, and parking is tucked under the stone block, so cars stay out of the dining frontage."
    ],
    facts: [
      { k: "Location", v: "Masyoun, Palestine" },
      { k: "Program", v: "Commercial" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022" }
    ],
    pullquote: "Timber for the drum, glass for the hall, white stone for the block.",
    materialsHeading: "Materials & Finishes",
    materialsText: "Horizontal timber cladding covers the drum and the cantilevered band, set against white stone cladding, dark charcoal frames and full-height glazing. Backlit signage and fine LED lines pick out the entrance and the terrace edge.",
    // real photography — see assets/images/meet/. The hero (meet.webp) is the
    // branded street view. 01-03 are the same views with placeholder
    // "Resturant" signage, kept as the earlier design-stage renders.
    spreadBImage: "assets/images/meet/06.webp",
    spreadBImageAlt: "Meet Moot — corner view with cantilevered upper floor",
    spread2Image: "assets/images/meet/05.webp",
    spread2ImageAlt: "Meet Moot — street elevation",
    galleryImages: [
      { src: "assets/images/meet/01.webp", alt: "Meet Moot — entrance view, design-stage signage" },
      { src: "assets/images/meet/02.webp", alt: "Meet Moot — street elevation, design-stage signage" },
      { src: "assets/images/meet/03.webp", alt: "Meet Moot — corner view, design-stage signage" }
    ],
    tones: [4, 5, 6, 7, 8, 1, 2]
  },

  salaymeh: {
    title: "Multi-Story Residence",
    titleAr: "سكن متعدد الطوابق",
    location: "Kofr Aqab, Palestine",
    heroImage: "assets/images/salaymeh.webp",
    heroImageAlt: "Multi-Story Residence — front elevation with balconies",
    kicker: "Case Study — 22 / Residential",
    headline: "Multi-Story Residence: A Stone Block With a Stacked Balcony Spine",
    paragraphs: [
      "This five-storey residential building in Kofr Aqab is clad in white stone, with one stone-framed column of balconies running up the entrance side. Each floor gets its own glass-balustraded outdoor room, and the rest of the facade is kept plain, with regular window openings and a tall glazed slot marking the stair core.",
      "An external stair connects the entrance level to the upper floors. The top storey is set back as a penthouse with a private roof terrace, and landscaped planters and paved parking sit around the base of the building."
    ],
    facts: [
      { k: "Location", v: "Kofr Aqab, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022" }
    ],
    pullquote: "One column of balconies carries all the character; the rest of the block stays quiet.",
    materialsHeading: "Materials & Finishes",
    materialsText: "White limestone cladding in a smooth coursed finish, with rougher bush-hammered stone on the balcony frames. Glass balustrades, dark metal window frames and a full-height glazed slot over the stair core complete the facade.",
    // real photography — see assets/images/salaymeh/. The hero
    // (salaymeh.webp) is the front elevation; the aerial view sits in the gallery.
    spreadBImage: "assets/images/salaymeh/03.webp",
    spreadBImageAlt: "Multi-Story Residence — side elevation and garden terrace",
    spread2Image: "assets/images/salaymeh/04.webp",
    spread2ImageAlt: "Multi-Story Residence — entrance side and external stair",
    galleryImages: [
      { src: "assets/images/salaymeh/01.webp", alt: "Multi-Story Residence — aerial view" }
    ],
    tones: [6, 7, 8, 1, 2, 3, 4]
  },

  yabrood: {
    title: "Yabrood Villa",
    titleAr: "فيلا يبرود",
    location: "Yabrood, Palestine",
    heroImage: "assets/images/yabrood.webp",
    heroImageAlt: "Yabrood Villa — entrance side and pool terrace",
    kicker: "Case Study — 23 / Private residence",
    headline: "Yabrood Villa: Stacked Stone Volumes Around a Glass-Edged Pool",
    paragraphs: [
      "This villa in Yabrood is composed of white stone volumes stacked and offset against each other, each capped with a thick dark marble-faced slab that serves as both roof and canopy. The street side stays low and calm, with a raised stone-and-marble entrance terrace and a timber-clad entry bay.",
      "On the garden side the house opens up. An infinity pool with a glass edge sits at the first-floor level over the garage, next to an open dining and lounge terrace that spills out of the sliding glazing. Balconies with glass balustrades step out from the upper floors."
    ],
    facts: [
      { k: "Location", v: "Yabrood, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022" }
    ],
    pullquote: "The street sees a calm stone house; the garden gets the pool and the terrace.",
    materialsHeading: "Materials & Finishes",
    materialsText: "White limestone in smooth and bush-hammered finishes, dark veined marble on the roof slabs, canopies and entrance steps, timber cladding on the entry bay, and glass balustrades and sliding glazing throughout. The pool is tiled in blue mosaic and has a glass edge.",
    // real photography — see assets/images/yabrood/. The hero (yabrood.webp)
    // is the corner view; 05 is a near-duplicate of it from the same camera.
    spreadBImage: "assets/images/yabrood/04.webp",
    spreadBImageAlt: "Yabrood Villa — garden elevation with pool and garage",
    spread2Image: "assets/images/yabrood/03.webp",
    spread2ImageAlt: "Yabrood Villa — entrance elevation",
    galleryImages: [
      { src: "assets/images/yabrood/01.webp", alt: "Yabrood Villa — side elevation and roof terrace" },
      { src: "assets/images/yabrood/05.webp", alt: "Yabrood Villa — corner view" }
    ],
    tones: [7, 8, 1, 2, 3, 4, 5]
  },

  moafaq: {
    title: "Private Garden",
    titleAr: "حديقة خاصة",
    location: "Al-Baloo', Palestine",
    heroImage: "assets/images/moafaq.webp",
    heroImageAlt: "Private Garden — aerial view of the garden and pavilion",
    kicker: "Case Study — 24 / Landscape",
    headline: "Private Garden: A Formal Garden Climbing Toward a Classical Pavilion",
    paragraphs: [
      "This private garden in Al-Baloo' is laid out on a sloping plot in front of a classical residence. A wide dark stair rises from the street gate to a white arched pavilion at the top, and everything else is arranged around that central axis.",
      "On one side, a sunken circular fire pit is ringed by terraced planting beds that step up the slope like an amphitheatre. On the other, a gravel court with clipped shrubs in white planters leads to a tiered fountain. A balustraded path links both halves, and a stone-and-iron fence encloses the whole garden."
    ],
    facts: [
      { k: "Location", v: "Al-Baloo', Palestine" },
      { k: "Program", v: "Landscape" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022" }
    ],
    pullquote: "One stair on one axis, with the fire pit on one side and the fountain on the other.",
    materialsHeading: "Materials & Planting",
    materialsText: "White stone balustrades, steps and fence piers with black wrought-iron railings. The central stair is dark stone, and the gravel court is planted with clipped shrubs in white planters. Date palms, cypress and pines frame the pavilion, and the terraced beds are filled with red flowering plants and lit by globe lamps.",
    // real photography — see assets/images/moafaq/. The hero (moafaq.webp)
    // is the front aerial view; the second aerial sits in the gallery.
    spreadBImage: "assets/images/moafaq/05.webp",
    spreadBImageAlt: "Private Garden — street view of the entrance stair and pavilion",
    spread2Image: "assets/images/moafaq/03.webp",
    spread2ImageAlt: "Private Garden — aerial view from the corner",
    galleryImages: [
      { src: "assets/images/moafaq/02.webp", alt: "Private Garden — fountain court and pavilion" },
      { src: "assets/images/moafaq/04.webp", alt: "Private Garden — fire-pit amphitheatre from the street" },
      { src: "assets/images/moafaq/06.webp", alt: "Private Garden — pavilion arcade and residence beyond" },
      { src: "assets/images/moafaq/07.webp", alt: "Private Garden — corner view along the boundary fence" }
    ],
    tones: [8, 1, 2, 3, 4, 5, 6]
  },

  abdelsamad: {
    title: "Residential Building Surda",
    titleAr: "عمارة سكنية سردا",
    location: "Surda, Palestine",
    heroImage: "assets/images/abdelsamad.webp",
    heroImageAlt: "Residential Building Surda — street corner and entrance",
    kicker: "Case Study — 25 / Residential",
    headline: "Residential Building Surda: A Stone Block Split by a Glazed Stair Tower",
    paragraphs: [
      "This five-storey apartment building in Surda is clad in white dressed stone, with charcoal panels between the window bays and a tall tilted stone fin that cuts through the facade. A glazed stair tower sits inside the fin, so the vertical circulation shows from the street and marks the entrance.",
      "Corner balconies with glass balustrades and downlights are stacked up the main facade, and a black pergola crowns the roof terrace. The building sits on an open parking level behind a railed stone boundary wall, with a small garden terrace at the corner."
    ],
    facts: [
      { k: "Location", v: "Surda, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2021" }
    ],
    pullquote: "The stair is not hidden in the core — it is the first thing you see from the street.",
    materialsHeading: "Materials & Finishes",
    materialsText: "White dressed and bush-hammered stone, charcoal stone-effect panels, dark metal window frames and glass balustrades. The boundary wall has stone piers with horizontal black railings and lantern lights, and the stair tower is fully glazed.",
    // real photography — see assets/images/abdelsamad/. Only two renders
    // exist so far, so omitPlaceholders hides the empty wide-image slot and
    // gallery. Remove it once more photography is added.
    omitPlaceholders: true,
    spreadBImage: "assets/images/abdelsamad/02.webp",
    spreadBImageAlt: "Residential Building Surda — balconies and garden terrace",
    tones: [3, 4, 5, 6, 7, 8, 1]
  },

  brothers: {
    title: "Brothers",
    titleAr: "برذرز",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/brothers.webp",
    heroImageAlt: "Brothers — corner view with the street-level showroom",
    kicker: "Case Study — 26 / Commercial — Residential",
    headline: "Brothers: A Glass Showroom Block Beside a Stone Residential Wing",
    paragraphs: [
      "Brothers is a mixed-use building on a corner site in Al-Bireh. A glazed showroom sits at street level, with the building name and a large illuminated sign on the facade. Above it, the commercial floors are wrapped in a curtain wall, and long glass-edged balcony slabs step out at different depths.",
      "Beside it, a white stone wing holds the residential floors, with a regular grid of windows and small balconies. Tall perforated dark-metal fins rise at the corners and frame the building from the street, and the roofline is finished with cantilevered canopies and roof terraces."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Commercial — Residential" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2021" }
    ],
    pullquote: "Glass for the showroom and offices, stone for the homes, one perforated screen to tie them together.",
    materialsHeading: "Materials & Finishes",
    materialsText: "A glass curtain wall with grey-tinted glazing on the commercial floors, white dressed stone on the residential wing, and dark perforated metal screens with geometric patterns on the corner fins. Balconies have glass balustrades, and the roofline carries slim cantilevered canopies.",
    // real photography — see assets/images/brothers/. The renders show
    // third-party branding (a car-maker's showroom sign) on the ground floor.
    // Three views, each rendered in two lighting variants: 01/04 (rear
    // elevation), 02/05 (tall front view) and hero + 06 (corner view).
    spreadBImage: "assets/images/brothers/02.webp",
    spreadBImageAlt: "Brothers — front elevation with showroom and balcony floors",
    spread2Image: "assets/images/brothers/01.webp",
    spread2ImageAlt: "Brothers — residential wing and entrance",
    galleryImages: [
      { src: "assets/images/brothers/04.webp", alt: "Brothers — residential wing and entrance, alternate sky" },
      { src: "assets/images/brothers/05.webp", alt: "Brothers — front elevation, alternate sky" },
      { src: "assets/images/brothers/06.webp", alt: "Brothers — corner view, alternate sky" }
    ],
    tones: [4, 5, 6, 7, 8, 1, 2]
  },

  israr: {
    title: "Private Residence Surda",
    titleAr: "منزل خاص سردا",
    location: "Surda, Palestine",
    heroImage: "assets/images/israr.webp",
    heroImageAlt: "Private Residence Surda — front elevation and entrance portico",
    kicker: "Case Study — 27 / Private residence",
    headline: "Private Residence Surda: An Andalusian-Inspired Stone House",
    paragraphs: [
      "This family house in Surda draws on Andalusian and Moorish detailing, built in white stone. Horseshoe arches on slender paired columns frame the windows and the entrance portico, and the stepped cornice repeats across the walls and at every roofline.",
      "Carved geometric screens fill the narrow windows, balcony rails and roof parapets, and bands of painted tile sit above the doorways. Terracotta hip roofs cover the lower wings, and a pair of timber pergolas shade the first-floor terrace. A carved timber door marks the covered entrance."
    ],
    facts: [
      { k: "Location", v: "Surda, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2020" }
    ],
    pullquote: "Every opening is an arch, and every screen is a pattern.",
    materialsHeading: "Materials & Finishes",
    materialsText: "White limestone in coursed blocks with carved stepped cornices, terracotta roof tiles, painted ceramic tile bands, carved stone and timber geometric screens, and a carved timber entrance door. Window frames are dark metal, and the terraces are shaded by dark timber pergolas.",
    // real photography — see assets/images/israr/. The hero (israr.webp) is
    // the full front elevation; 01 is a portrait detail of the garden side.
    spreadBImage: "assets/images/israr/02.webp",
    spreadBImageAlt: "Private Residence Surda — entrance portico with carved timber door",
    spread2Image: "assets/images/israr/03.webp",
    spread2ImageAlt: "Private Residence Surda — corner view with external stair",
    galleryImages: [
      { src: "assets/images/israr/01.webp", alt: "Private Residence Surda — garden side, balcony and arched windows" }
    ],
    tones: [5, 6, 7, 8, 1, 2, 3]
  },

  masri: {
    title: "Residential Building Sharafeh",
    titleAr: "عمارة سكنية شرفة",
    location: "Sharafeh, Palestine",
    heroImage: "assets/images/masri.webp",
    heroImageAlt: "Residential Building Sharafeh — corner view with ground-floor shops",
    kicker: "Case Study — 28 / Commercial — Residential",
    headline: "Residential Building Sharafeh: Apartments Above a Row of Shops",
    paragraphs: [
      "This five-storey apartment building in Sharafeh stands on a corner site, with a row of shopfronts at ground level and the apartments stacked above. The upper floors are a patchwork of white stone, sand-coloured stone, charcoal panels and timber, which breaks the long facade into several narrower vertical bays.",
      "Balconies with dark metal railings are stacked on the corner facade, and the side elevations use regular punched windows with small Juliet balconies. At the rear, the building stands on columns over an open parking level, and the top floor is set back as a roof terrace."
    ],
    facts: [
      { k: "Location", v: "Sharafeh, Palestine" },
      { k: "Program", v: "Commercial — Residential" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2020" }
    ],
    pullquote: "Four materials, split into narrow bays, so one long facade reads as several buildings.",
    materialsHeading: "Materials & Finishes",
    materialsText: "White dressed stone and sand-coloured limestone cladding, charcoal concrete-effect balcony slabs, horizontal timber panels and dark metal balcony railings and window frames. The ground-floor shopfronts are dark glass with lit fascia signs.",
    // real photography — see assets/images/masri/. Only three renders exist
    // so far, so the gallery falls back to the "Image placeholder" tiles
    // until more photography is added. The renders show retail brand logos
    // on the shop fascias.
    spreadBImage: "assets/images/masri/02.webp",
    spreadBImageAlt: "Residential Building Sharafeh — street elevation with shops and balconies",
    spread2Image: "assets/images/masri/01.webp",
    spread2ImageAlt: "Residential Building Sharafeh — rear elevation over the parking level",
    tones: [6, 7, 8, 1, 2, 3, 4]
  },

  faris: {
    title: "Private Villa",
    titleAr: "فيلا خاصة",
    location: "Al-Baloo', Palestine",
    heroImage: "assets/images/faris.webp",
    heroImageAlt: "Private Villa — street elevation with timber gates",
    kicker: "Case Study — 29 / Private residence",
    headline: "Private Villa: A Stone House Stepping Up Its Sloping Street",
    paragraphs: [
      "This villa in Al-Baloo' is built in white dressed stone with stepped cornices, set on a plot that rises along the street. A tall timber entrance door with a pyramid pattern sits behind a lower gate bay, and timber panels and a cantilevered first-floor terrace with glass balustrade break up the stone walls.",
      "The garden is organised in terraces. Stone retaining walls with concealed lighting step up past planted beds, a barbecue patio sits in a sheltered side court, and a roof terrace under a timber pergola has loungers and pebble planting. Tall cypress and poplar trees screen the boundary, and a cut-out stone name plate marks the gate."
    ],
    facts: [
      { k: "Location", v: "Al-Baloo', Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "Completed" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2020" }
    ],
    pullquote: "The house steps with the street, and the garden steps with the house.",
    materialsHeading: "Materials & Landscape",
    materialsText: "White dressed and bush-hammered stone with stepped cornices, timber cladding and slatted timber gates, dark glazing and a glass-balustraded terrace. In the garden, stone retaining walls carry concealed LED strips, with white pebbles and paving, timber pergolas and planting of cypress, lavender, peonies and hydrangeas.",
    // real photography — see assets/images/faris/. The hero (faris.webp) is
    // the straight street elevation. A ninth source render (faris8) was a
    // byte-for-byte copy of 06 and is not included.
    spreadBImage: "assets/images/faris/06.webp",
    spreadBImageAlt: "Private Villa — street elevation from the corner",
    spread2Image: "assets/images/faris/09.webp",
    spread2ImageAlt: "Private Villa — side elevation and garden terrace",
    galleryImages: [
      { src: "assets/images/faris/01.webp", alt: "Private Villa — lit stair and terraced planters" },
      { src: "assets/images/faris/02.webp", alt: "Private Villa — barbecue patio" },
      { src: "assets/images/faris/03.webp", alt: "Private Villa — pergola roof terrace" },
      { src: "assets/images/faris/04.webp", alt: "Private Villa — side garden path" },
      { src: "assets/images/faris/05.webp", alt: "Private Villa — driveway and retaining wall" }
    ],
    tones: [7, 8, 1, 2, 3, 4, 5]
  },

  sakhr: {
    title: "Sakhr",
    titleAr: "صخر",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/sakhr.webp",
    heroImageAlt: "Sakhr — exterior view",
    kicker: "Case Study — 04 / Residential — Interior Design",
    headline: "Sakhr: Load-Bearing Stone Reworked as a Perforated Screen",
    paragraphs: [
      "Sakhr — ‘rock’ in Arabic — takes the load-bearing stone construction common across Al-Bireh and turns it into the building's primary architectural idea rather than just its structure: a perforated stone screen wraps the south and west faces, filtering light before it ever reaches the glazing behind it.",
      "Behind the screen, a conventional apartment plan stays simple and efficient; the screen itself is the only place the project spends its formal ambition, so the rest of the building can stay quiet and easy to build."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential — Interior Design" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The screen does the work a curtain would — it just happens to be made of stone.",
    materialsHeading: "Materials & Structure",
    materialsText: "Precast stone-aggregate panels form the perforated screen, hung clear of the concrete frame behind on a simple steel bracket system that also doubles as a maintenance walkway.",
    // real photography — see assets/images/sakhr/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (31.webp) was
    // moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/JjkJ2-giUJw",
    spread2Image: "assets/images/sakhr/f5.webp",
    spread2ImageAlt: "Sakhr — wide exterior view",
    galleryImages: [
      { src: "assets/images/sakhr/Untitled-7.webp", alt: "Sakhr — exterior detail" },
      { src: "assets/images/sakhr/Untitled-9.webp", alt: "Sakhr — exterior detail" },
      { src: "assets/images/sakhr/Untitled-11.webp", alt: "Sakhr — exterior, evening view" },
      { src: "assets/images/sakhr/Untitled-12.webp", alt: "Sakhr — detail view" },
      { src: "assets/images/sakhr/Untitled-13.webp", alt: "Sakhr — wide exterior view" },
      { src: "assets/images/sakhr/1.jpeg", alt: "Sakhr — floor plan 1" },
      { src: "assets/images/sakhr/2.jpeg", alt: "Sakhr — floor plan 2" },
      { src: "assets/images/sakhr/31.webp", alt: "Sakhr — exterior, alternate view" }
    ],
    tones: [2, 3, 4, 5, 6, 7, 8]
  },

  jamal: {
    title: "Salamiyeh Private Residence",
    titleAr: "منزل خاص سلامية",
    location: "Salamiyeh, Palestine",
    heroImage: "assets/images/jamal.webp",
    heroImageAlt: "Salamiyeh Private Residence — exterior view",
    kicker: "Case Study — 05 / Private residence",
    headline: "Salamiyeh Private Residence: A Family Compound Split Into Three Volumes",
    paragraphs: [
      "Rather than one large house, the Salamiyeh Private Residence is organized as three linked volumes — one for the parents, two for married children's families — arranged around a shared entrance court so each household keeps its own front door.",
      "A single shared roof terrace ties the three volumes together at the top level, giving the extended family one common outdoor room even as daily life below stays fully separate."
    ],
    facts: [
      { k: "Location", v: "Salamiyeh, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "Three houses that share an address, not three rooms that share a house.",
    materialsHeading: "Materials & Structure",
    materialsText: "Each volume is built in exposed reinforced concrete with a shared stone base at street level, tying the compound visually to the older stone houses further down the street.",
    // real photography — see assets/images/jamal/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (Untitled-5.webp)
    // was moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/bKUdMu8Tpgg",
    spread2Image: "assets/images/jamal/Untitled-4.webp",
    spread2ImageAlt: "Salamiyeh Private Residence — aerial view",
    galleryImages: [
      { src: "assets/images/jamal/8.webp", alt: "Salamiyeh Private Residence — entrance detail" },
      { src: "assets/images/jamal/Untitled-3.webp", alt: "Salamiyeh Private Residence — exterior, alternate view" },
      { src: "assets/images/jamal/Untitled-2.webp", alt: "Salamiyeh Private Residence — exterior, alternate view" },
      { src: "assets/images/jamal/Untitled-6.webp", alt: "Salamiyeh Private Residence — aerial detail" },
      { src: "assets/images/jamal/Untitled-5.webp", alt: "Salamiyeh Private Residence — aerial view" }
    ],
    tones: [7, 8, 1, 2, 3, 4, 5]
  },

  abdallah: {
    title: "Al-Bireh Private Residence #3",
    titleAr: "منزل خاص البيرة ٣",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/abdallah.webp",
    heroImageAlt: "Al-Bireh Private Residence #3 — exterior view",
    kicker: "Case Study — 06 / Private residence — Interior Design",
    headline: "Al-Bireh Private Residence #3: A Corner Site Turned Into Two Fronts",
    paragraphs: [
      "On a corner lot in Al-Bireh, most houses pick one street to face and treat the other as a side elevation. The house instead gives both streets a genuine front — two entrances, two living rooms with their own outlook — folded around a shared internal stair.",
      "The fold in the plan created an unplanned triangular garden at the back of the site, now the house's most-used outdoor room precisely because it wasn't the point of the design."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Private residence — Interior Design" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The best room in the house was the leftover space neither elevation wanted.",
    materialsHeading: "Materials & Structure",
    materialsText: "A conventional concrete frame is dressed in locally quarried stone on both street faces, with render reserved for the more private garden elevation.",
    // real photography — see assets/images/abdallah/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (Untitled-1.webp)
    // was moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/khVZgtQQOzw",
    spread2Image: "assets/images/abdallah/Untitled-7.webp",
    spread2ImageAlt: "Al-Bireh Private Residence #3 — aerial view",
    galleryImages: [
      { src: "assets/images/abdallah/Untitled-3.webp", alt: "Al-Bireh Private Residence #3 — exterior, alternate view" },
      { src: "assets/images/abdallah/Untitled-4.webp", alt: "Al-Bireh Private Residence #3 — exterior, evening view" },
      { src: "assets/images/abdallah/Untitled-5.webp", alt: "Al-Bireh Private Residence #3 — rear exterior view" },
      { src: "assets/images/abdallah/Untitled-6.webp", alt: "Al-Bireh Private Residence #3 — pool terrace detail" },
      { src: "assets/images/abdallah/Untitled-8.webp", alt: "Al-Bireh Private Residence #3 — aerial, evening view" },
      { src: "assets/images/abdallah/Untitled-1.webp", alt: "Al-Bireh Private Residence #3 — exterior, alternate view" }
    ],
    // YouTube embeds shown at the end of the gallery (see renderOverlay())
    galleryVideos: [
      "https://www.youtube.com/embed/3hi9hVfq3jk",
      "https://www.youtube.com/embed/RPxQm4qlXWA",
      "https://www.youtube.com/embed/WROf0CR8Ukk"
    ],
    tones: [3, 4, 5, 6, 7, 8, 1]
  },

  "bireh-plaza": {
    title: "Bireh Plaza",
    titleAr: "ساحة البلد",
    location: "City Center, Al-Bireh, Palestine",
    heroImage: "assets/images/bireh-plaza.webp",
    heroImageAlt: "Bireh Plaza — exterior view",
    kicker: "Case Study — 07 / Public — Commercial",
    headline: "Bireh Plaza: Reopening Al-Bireh's City Center to Foot Traffic",
    paragraphs: [
      "Bireh Plaza reworks a dense city-center block into ground-floor retail with a public plaza cut through its middle — turning what was a single deep building footprint into a shortcut pedestrians actually want to take.",
      "Shops line the new plaza at eye level, offices and a small event hall sit above on the upper floors, and the plaza itself is treated as the project's real civic contribution — deliberately more generous than the retail alone requires."
    ],
    facts: [
      { k: "Location", v: "City Center, Al-Bireh, Palestine" },
      { k: "Program", v: "Public — Commercial" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "A plaza only works if it's also the fastest way to get somewhere.",
    materialsHeading: "Materials & Structure",
    materialsText: "A steel canopy shades the plaza without enclosing it, keeping the space legible as outdoor public ground; the flanking buildings are finished in a warm limestone that ties the project to the older city-center facades around it.",
    // real photography — see assets/images/bireh-plaza/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    spreadBImage: "assets/images/bireh-plaza/tower-street.jpeg",
    spreadBImageAlt: "Bireh Plaza — tower, street view",
    spread2Image: "assets/images/bireh-plaza/top-view.jpeg",
    spread2ImageAlt: "Bireh Plaza — aerial view",
    galleryImages: [
      { src: "assets/images/bireh-plaza/plaza-cafe.jpeg", alt: "Bireh Plaza — cafe seating" },
      { src: "assets/images/bireh-plaza/tower-plaza.jpeg", alt: "Bireh Plaza — tower and plaza" },
      { src: "assets/images/bireh-plaza/plaza-event.jpeg", alt: "Bireh Plaza — outdoor screening event" }
    ],
    tones: [8, 1, 2, 3, 4, 5, 6]
  },

  jaradat: {
    title: "San Fransisco",
    titleAr: "سان فرانسيسكو",
    location: "Al-Tireh, Palestine",
    heroImage: "assets/images/jaradat.webp",
    heroImageAlt: "San Fransisco — exterior view",
    kicker: "Case Study — 08 / Commercial — Residential",
    headline: "San Fransisco: Ground-Floor Commerce Under Housing Above",
    paragraphs: [
      "The San Fransisco building in Al-Tireh stacks a commercial ground floor — sized and glazed for retail — beneath three floors of apartments, with a structural transfer level between them kept honest and visible rather than hidden.",
      "Deep balconies on the residential floors do double duty as sun-shading for the units below them, so the building manages its own comfort with geometry rather than added equipment."
    ],
    facts: [
      { k: "Location", v: "Al-Tireh, Palestine" },
      { k: "Program", v: "Commercial — Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The transfer beam didn't need to be hidden — it's the one part of the building that explains the whole idea.",
    materialsHeading: "Materials & Structure",
    materialsText: "A concrete frame carries the transfer structure at the second level; the retail base is fully glazed aluminum storefront, while the residential floors above are finished in the same stone cladding used across the practice's other Ramallah work.",
    // real photography — see assets/images/jaradat/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    // prototype: YouTube embed in place of the spread-B image slot (see
    // renderOverlay() in main.js). The image that used to live in this slot
    // (Untitled-3.webp) was moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/cpxGmguVZSY",
    spread2Image: "assets/images/jaradat/Untitled-6.webp",
    spread2ImageAlt: "San Fransisco — aerial, evening view",
    galleryImages: [
      { src: "assets/images/jaradat/Untitled-4.webp", alt: "San Fransisco — entrance detail" },
      { src: "assets/images/jaradat/Untitled-5.webp", alt: "San Fransisco — exterior, alternate view" },
      { src: "assets/images/jaradat/Untitled-7.webp", alt: "San Fransisco — facade detail" },
      { src: "assets/images/jaradat/Untitled-3.webp", alt: "San Fransisco — exterior, alternate view" }
    ],
    tones: [5, 6, 7, 8, 1, 2, 3]
  },

  "imm-jad-sarsour": {
    title: "Al-Bireh Private Residence",
    titleAr: "منزل خاص البيرة",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/imm-jad-sarsour.webp",
    heroImageAlt: "Al-Bireh Private Residence — exterior view",
    kicker: "Case Study — 09 / Private residence",
    headline: "Al-Bireh Private Residence: A Compact Plan Built Around Southern Light",
    paragraphs: [
      "This Al-Bireh residence works from a compact, efficient footprint, planning the living spaces to capture southern light through the day rather than relying on a larger floor area to feel generous.",
      "The street elevation stays quiet and deliberately understated, keeping the family's daily life oriented inward toward the garden and the more private faces of the house."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "A small footprint doesn't have to mean a small house — it just means every room has to earn its place.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame is finished in a pale render, with stone reserved for the entrance surround to mark the front door without overstating it.",
    spreadBImage: "assets/images/imm-jad-sarsour/02.webp",
    spreadBImageAlt: "Al-Bireh Private Residence — exterior, alternate view",
    spread2Image: "assets/images/imm-jad-sarsour/03.webp",
    spread2ImageAlt: "Al-Bireh Private Residence — wide exterior view",
    galleryImages: [
      { src: "assets/images/imm-jad-sarsour/04.webp", alt: "Al-Bireh Private Residence — exterior detail" },
      { src: "assets/images/imm-jad-sarsour/05.webp", alt: "Al-Bireh Private Residence — exterior detail" },
      { src: "assets/images/imm-jad-sarsour/06.webp", alt: "Al-Bireh Private Residence — exterior, alternate view" }
    ],
    tones: [1, 2, 3, 4, 5, 6, 7]
  },

  "imad-mshosher": {
    title: "Country Club Al-Bireh",
    titleAr: "كانتري كلوب البيرة",
    location: "Sateh Marhaba, Palestine",
    heroImage: "assets/images/imad-mshosher.webp",
    heroImageAlt: "Country Club Al-Bireh — exterior view",
    kicker: "Case Study — 10 / Public",
    headline: "Country Club Al-Bireh: A Stair Reworked as the House's Organizing Spine",
    paragraphs: [
      "Stepped across several levels to hold onto its views, this residence reorganizes the stair from a circulation afterthought into the spine that ties each floor's living space back to the entrance below.",
      "Each level opens toward a different outlook, letting the section of the house do the work that a wider footprint would otherwise have needed."
    ],
    facts: [
      { k: "Location", v: "Sateh Marhaba, Palestine" },
      { k: "Program", v: "Public" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The stair stopped being the thing you pass through and became the thing that holds the house together.",
    materialsHeading: "Materials & Structure",
    materialsText: "A concrete frame carries the stepped levels, with a stone base at street level giving way to a lighter render finish on the upper, more open floors.",
    spreadBImage: "assets/images/imad-mshosher/02.webp",
    spreadBImageAlt: "Country Club Al-Bireh — exterior, alternate view",
    spread2Image: "assets/images/imad-mshosher/03.webp",
    spread2ImageAlt: "Country Club Al-Bireh — wide exterior view",
    galleryImages: [
      { src: "assets/images/imad-mshosher/04.webp", alt: "Country Club Al-Bireh — exterior detail" },
      { src: "assets/images/imad-mshosher/05.webp", alt: "Country Club Al-Bireh — exterior detail" },
      { src: "assets/images/imad-mshosher/06.webp", alt: "Country Club Al-Bireh — exterior, alternate view" },
      { src: "assets/images/imad-mshosher/07.webp", alt: "Country Club Al-Bireh — exterior, evening view" },
      { src: "assets/images/imad-mshosher/08.webp", alt: "Country Club Al-Bireh — aerial view" }
    ],
    tones: [2, 3, 4, 5, 6, 7, 8]
  },

  "jalal-hamed": {
    title: "Silwad Private Residence",
    titleAr: "منزل خاص سلواد",
    location: "Silwad, Palestine",
    heroImage: "assets/images/jalal-hamed.webp",
    heroImageAlt: "Silwad Private Residence — exterior view",
    kicker: "Case Study — 11 / Private residence",
    headline: "Silwad Private Residence: A Restrained Street Front, an Open Garden Face",
    paragraphs: [
      "This Silwad house is organized around a central stair hall that anchors every room to a single, legible core, keeping circulation short even as the plan grows.",
      "The street elevation is kept restrained and mostly solid, reserving the more open, glazed face of the house for the private garden at the rear."
    ],
    facts: [
      { k: "Location", v: "Silwad, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The street only ever sees half of the house — the garden gets the other half.",
    materialsHeading: "Materials & Structure",
    materialsText: "Load-bearing stone walls face the street, while the garden elevation shifts to a lighter concrete-and-glass assembly that opens the plan outward.",
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (02.webp) was
    // moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/Zih5UHlcgMg",
    spread2Image: "assets/images/jalal-hamed/03.webp",
    spread2ImageAlt: "Silwad Private Residence — wide exterior view",
    galleryImages: [
      { src: "assets/images/jalal-hamed/04.webp", alt: "Silwad Private Residence — exterior detail" },
      { src: "assets/images/jalal-hamed/05.webp", alt: "Silwad Private Residence — exterior detail" },
      { src: "assets/images/jalal-hamed/06.webp", alt: "Silwad Private Residence — exterior, alternate view" },
      { src: "assets/images/jalal-hamed/07.webp", alt: "Silwad Private Residence — evening view" },
      { src: "assets/images/jalal-hamed/02.webp", alt: "Silwad Private Residence — exterior, alternate view" }
    ],
    tones: [3, 4, 5, 6, 7, 8, 1]
  },

  "omar-aaqel": {
    title: "Al-Bireh Private Residence #2",
    titleAr: "منزل خاص البيرة ٢",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/omar-aaqel.webp",
    heroImageAlt: "Al-Bireh Private Residence #2 — exterior view",
    kicker: "Case Study — 12 / Private residence",
    headline: "Al-Bireh Private Residence #2: A Compact, Energy-Conscious Family House",
    paragraphs: [
      "Designed around a compact, energy-conscious plan, this Al-Bireh house uses deep window reveals to cut solar gain without giving up daylight in the main living spaces.",
      "A simple stone base grounds the building at street level, letting the more open upper floor read as a lighter volume set above it."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "A deep reveal does the shading work a mechanical louver would — it just never needs maintenance.",
    materialsHeading: "Materials & Structure",
    materialsText: "A stone-clad concrete base carries a lighter render-finished upper floor, with deep-set window reveals cast directly into the concrete frame.",
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (02.webp) was
    // moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/ocmC07iHSaA",
    spread2Image: "assets/images/omar-aaqel/03.webp",
    spread2ImageAlt: "Al-Bireh Private Residence #2 — wide exterior view",
    galleryImages: [
      { src: "assets/images/omar-aaqel/04.webp", alt: "Al-Bireh Private Residence #2 — exterior detail" },
      { src: "assets/images/omar-aaqel/05.webp", alt: "Al-Bireh Private Residence #2 — exterior detail" },
      { src: "assets/images/omar-aaqel/06.webp", alt: "Al-Bireh Private Residence #2 — exterior, alternate view" },
      { src: "assets/images/omar-aaqel/02.webp", alt: "Al-Bireh Private Residence #2 — exterior, alternate view" }
    ],
    tones: [4, 5, 6, 7, 8, 1, 2]
  },

  "abo-khalid": {
    title: "Deir Dibwan Private Residence",
    titleAr: "منزل خاص دير دبوان",
    location: "Deir Dibwan, Palestine",
    heroImage: "assets/images/abo-khalid.webp",
    heroImageAlt: "Deir Dibwan Private Residence — exterior view",
    kicker: "Case Study — 13 / Private residence",
    headline: "Deir Dibwan Private Residence: A Double-Height Hall as the House's Light Well",
    paragraphs: [
      "Built around a central double-height hall, this Deir Dibwan residence draws light down into the ground-floor living spaces from above, rather than relying on street-facing windows alone.",
      "The hall also acts as the house's main gathering space, visually connecting the ground floor to the bedrooms on the level above."
    ],
    facts: [
      { k: "Location", v: "Deir Dibwan, Palestine" },
      { k: "Program", v: "Private residence" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The light well isn't decorative — it's the reason the living room doesn't need its lights on at noon.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame carries the double-height void, with a stone-clad street facade and a skylight assembly set into the roof above the hall.",
    spreadBImage: "assets/images/abo-khalid/02.webp",
    spreadBImageAlt: "Deir Dibwan Private Residence — exterior, alternate view",
    spread2Image: "assets/images/abo-khalid/03.webp",
    spread2ImageAlt: "Deir Dibwan Private Residence — wide exterior view",
    galleryImages: [
      { src: "assets/images/abo-khalid/04.webp", alt: "Deir Dibwan Private Residence — exterior detail" },
      { src: "assets/images/abo-khalid/05.webp", alt: "Deir Dibwan Private Residence — exterior detail" },
      { src: "assets/images/abo-khalid/06.webp", alt: "Deir Dibwan Private Residence — exterior, alternate view" },
      { src: "assets/images/abo-khalid/07.webp", alt: "Deir Dibwan Private Residence — evening view" }
    ],
    tones: [5, 6, 7, 8, 1, 2, 3]
  },

  bazzar: {
    title: "Bazzar",
    titleAr: "البزار",
    location: "Al-Baloo', Palestine",
    heroImage: "assets/images/bazzar.webp",
    heroImageAlt: "Bazzar — exterior view",
    kicker: "Case Study — 14 / Commercial",
    headline: "Bazzar: Open Retail Floors Behind a Fully Glazed Base",
    paragraphs: [
      "Bazzar is organized around open, flexible retail floors that can be subdivided or combined as tenancy needs change, rather than being fixed to a single retail layout.",
      "A fully glazed ground level keeps the storefronts legible from the street at every hour, turning the building's base into its own advertisement."
    ],
    facts: [
      { k: "Location", v: "Al-Baloo', Palestine" },
      { k: "Program", v: "Commercial" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "A retail building's best feature is usually just staying out of the way of what's inside it.",
    materialsHeading: "Materials & Structure",
    materialsText: "A long-span concrete frame keeps the retail floors column-light, with a curtain-wall glazing system wrapping the fully transparent ground floor.",
    spreadBImage: "assets/images/bazzar/02.webp",
    spreadBImageAlt: "Bazzar — exterior, alternate view",
    spread2Image: "assets/images/bazzar/03.webp",
    spread2ImageAlt: "Bazzar — wide exterior view",
    galleryImages: [
      { src: "assets/images/bazzar/04.webp", alt: "Bazzar — exterior detail" },
      { src: "assets/images/bazzar/05.webp", alt: "Bazzar — exterior detail" },
      { src: "assets/images/bazzar/06.webp", alt: "Bazzar — exterior, alternate view" },
      { src: "assets/images/bazzar/07.webp", alt: "Bazzar — evening view" }
    ],
    tones: [6, 7, 8, 1, 2, 3, 4]
  },

  mikkawi: {
    title: "360 Residence",
    titleAr: "إسكان ٣٦٠",
    location: "Masayef, Palestine",
    heroImage: "assets/images/mikkawi.webp",
    heroImageAlt: "360 Residence — exterior view",
    kicker: "Case Study — 15 / Residential",
    headline: "360 Residence: A Vertical Plan That Keeps the Garden Large",
    paragraphs: [
      "360 Residence trades a larger footprint for a taller, more vertical plan, stacking bedrooms above an open ground floor to leave as much of the lot as possible for the garden around it.",
      "The compact massing also keeps construction and maintenance costs proportionate to a smaller family home, without shrinking the rooms themselves."
    ],
    facts: [
      { k: "Location", v: "Masayef, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "Building up instead of out was the whole design decision — everything else followed from it.",
    materialsHeading: "Materials & Structure",
    materialsText: "A compact reinforced concrete frame is finished in a light render, with a stone base marking the entrance at ground level.",
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (02.webp) was
    // moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/XdUxsbTpUBk",
    spread2Image: "assets/images/mikkawi/03.webp",
    spread2ImageAlt: "360 Residence — wide exterior view",
    galleryImages: [
      { src: "assets/images/mikkawi/04.webp", alt: "360 Residence — exterior detail" },
      { src: "assets/images/mikkawi/05.webp", alt: "360 Residence — exterior detail" },
      { src: "assets/images/mikkawi/06.webp", alt: "360 Residence — exterior, alternate view" },
      { src: "assets/images/mikkawi/02.webp", alt: "360 Residence — exterior, alternate view" }
    ],
    tones: [7, 8, 1, 2, 3, 4, 5]
  },

  "tallet-bahar": {
    title: "Tallet Bahar",
    titleAr: "طلة بحر",
    location: "Masayef, Palestine",
    heroImage: "assets/images/tallet-bahar.webp",
    heroImageAlt: "Tallet Bahar — exterior view",
    kicker: "Case Study — 16 / Residential",
    headline: "Tallet Bahar: A House Stepped Into the Hillside",
    paragraphs: [
      "Tallet Bahar follows the slope of its Masayef hillside site rather than cutting a flat platform into it, stepping the house down the grade in line with the terrain.",
      "Terraces on each level open the house outward toward the valley view, so the section — not the facade — carries most of the design's ambition."
    ],
    facts: [
      { k: "Location", v: "Masayef, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022 –" }
    ],
    pullquote: "The slope was never a constraint to solve around — it was the site's best feature.",
    materialsHeading: "Materials & Structure",
    materialsText: "Retaining and structural walls are combined in board-formed concrete, with local stone cladding on the upper terraces to tie the house back to the hillside around it.",
    // video embed in place of the spread-B image slot (see renderOverlay()
    // in main.js). The image that used to live in this slot (02.webp) was
    // moved down into galleryImages below.
    spreadBVideo: "https://www.youtube.com/embed/6GrbBBVq5L4?start=63",
    spread2Image: "assets/images/tallet-bahar/03.webp",
    spread2ImageAlt: "Tallet Bahar — wide exterior view",
    galleryImages: [
      { src: "assets/images/tallet-bahar/04.webp", alt: "Tallet Bahar — exterior detail" },
      { src: "assets/images/tallet-bahar/05.webp", alt: "Tallet Bahar — exterior detail" },
      { src: "assets/images/tallet-bahar/06.webp", alt: "Tallet Bahar — exterior, alternate view" },
      { src: "assets/images/tallet-bahar/07.webp", alt: "Tallet Bahar — terrace detail" },
      { src: "assets/images/tallet-bahar/08.webp", alt: "Tallet Bahar — evening view" },
      { src: "assets/images/tallet-bahar/floor%20plan%201.jpeg", alt: "Tallet Bahar — floor plan 1" },
      { src: "assets/images/tallet-bahar/floor%20plan%202.jpeg", alt: "Tallet Bahar — floor plan 2" },
      { src: "assets/images/tallet-bahar/floor%20plan%203.jpeg", alt: "Tallet Bahar — floor plan 3" },
      { src: "assets/images/tallet-bahar/floor%20plan%204.jpeg", alt: "Tallet Bahar — floor plan 4" },
      { src: "assets/images/tallet-bahar/02.webp", alt: "Tallet Bahar — exterior, alternate view" }
    ],
    tones: [8, 1, 2, 3, 4, 5, 6]
  },

  "nabali-al-faris": {
    title: "Qasyoon",
    titleAr: "قاسيون",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/nabali-al-faris.webp",
    heroImageAlt: "Qasyoon — exterior view",
    kicker: "Case Study — 17 / Residential",
    headline: "Qasyoon: A House Planned Around a Shared Courtyard",
    paragraphs: [
      "This Al-Bireh family house is planned around a shared central courtyard, keeping the surrounding rooms naturally lit and cross-ventilated without relying on a deep street-facing facade.",
      "The courtyard becomes the house's real living room in the warmer months, with the perimeter rooms able to open fully onto it."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022 –" }
    ],
    pullquote: "The courtyard does what air conditioning would, most of the year, for free.",
    materialsHeading: "Materials & Structure",
    materialsText: "Load-bearing stone walls wrap the courtyard on all sides, with timber-framed openings sized to each room's exposure rather than repeated uniformly.",
    spreadBImage: "assets/images/nabali-al-faris/02.webp",
    spreadBImageAlt: "Qasyoon — exterior, alternate view",
    spread2Image: "assets/images/nabali-al-faris/03.webp",
    spread2ImageAlt: "Qasyoon — wide exterior view",
    galleryImages: [
      { src: "assets/images/nabali-al-faris/04.webp", alt: "Qasyoon — exterior detail" },
      { src: "assets/images/nabali-al-faris/05.webp", alt: "Qasyoon — exterior detail" },
      { src: "assets/images/nabali-al-faris/06.webp", alt: "Qasyoon — exterior, alternate view" }
    ],
    tones: [1, 2, 3, 4, 5, 6, 7]
  }

};
