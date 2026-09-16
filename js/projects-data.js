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
    title: "Masjid",
    titleAr: "مسجد",
    location: "Birzeit, Palestine",
    heroImage: "assets/images/masjid.webp",
    heroImageAlt: "Masjid — exterior view",
    kicker: "Case Study — 01 / Public",
    headline: "Prayer Hall as Threshold: Reworking the Village Mosque",
    paragraphs: [
      "Sited at the edge of Birzeit, the mosque is organized around a single question: how a threshold — the line between courtyard and prayer hall, between village and worship — can be widened rather than simply crossed. The design stretches that line into a shaded colonnade that reads as public space long before it reads as sacred space.",
      "A folded concrete roof lifts toward the qibla wall, drawing a single band of clerestory light down its length; underneath, local stone cladding and a restrained material palette keep the hall quiet enough for the light to do most of the talking."
    ],
    facts: [
      { k: "Location", v: "Birzeit, Palestine" },
      { k: "Program", v: "Public — Religious" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "The minaret is kept low and unlit — the roofline, not a tower, is what marks the building on the skyline at night.",
    materialsHeading: "Materials & Structure",
    materialsText: "Board-formed concrete carries the roof's long spans, left exposed inside the hall; the courtyard walls are faced in a warm local stone laid in a coursing pattern that echoes the older buildings surrounding the site. Openings are kept few and deliberate, so daylight arrives as event rather than ambience.",
    // real photography — see assets/images/masjid/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    spreadBImage: "assets/images/masjid/masjid%205.webp",
    spreadBImageAlt: "Masjid — exterior, alternate view",
    spread2Image: "assets/images/masjid/masjid%20interior%201.webp",
    spread2ImageAlt: "Masjid — interior view",
    galleryImages: [
      { src: "assets/images/masjid/masjid%203.webp", alt: "Masjid — exterior detail" },
      { src: "assets/images/masjid/masjid%204.webp", alt: "Masjid — exterior detail" },
      { src: "assets/images/masjid/masjid%20door.webp", alt: "Masjid — entrance detail" },
      { src: "assets/images/masjid/masjid%20interior%202.webp", alt: "Masjid — interior detail" }
    ],
    tones: [4, 7, 1, 2, 6, 3, 4]
  },

  band: {
    title: "Band",
    titleAr: "بند",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/band.webp",
    heroImageAlt: "Band — exterior view",
    kicker: "Case Study — 02 / Residential",
    headline: "Band: A Residence Organized Around a Single Ribbon of Circulation",
    paragraphs: [
      "Set on a narrow infill lot in Al-Bireh, Band takes its name from the folded concrete band that wraps stair, corridor and balcony into one continuous move — freeing every room around it to be planned on its own terms rather than around a fixed hallway.",
      "The ribbon steps outward at each floor to shade the one below, so the building manages its own solar gain before any mechanical system has to; the ground floor stays porous to the street, with the family's more private spaces stacked above and set back from view."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The corridor stopped being leftover space and became the one move that organizes the whole house.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame carries the cantilevered band itself, finished in a pale sand-colored render that reads close to the surrounding stone; interior partitions are lightweight so the plan can be reconfigured room by room as the family's needs change.",
    // real photography — see assets/images/band/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    spreadBImage: "assets/images/band/29.webp",
    spreadBImageAlt: "Band — exterior, alternate view",
    spread2Image: "assets/images/band/Untitled-13.webp",
    spread2ImageAlt: "Band — wide exterior view",
    galleryImages: [
      { src: "assets/images/band/f5.webp", alt: "Band — exterior detail" },
      { src: "assets/images/band/Untitled-5.webp", alt: "Band — detail view" },
      { src: "assets/images/band/Untitled-12.webp", alt: "Band — detail view" }
    ],
    tones: [4, 5, 6, 7, 8, 1, 2]
  },

  omary: {
    title: "Omary",
    titleAr: "عمري",
    location: "Al-Baloo', Palestine",
    heroImage: "assets/images/omary.webp",
    heroImageAlt: "Omary — exterior view",
    kicker: "Case Study — 03 / Residential",
    headline: "Omary: A Courtyard House Stepped Into a Sloped Site",
    paragraphs: [
      "Omary sits on a steeply sloped plot in Al-Baloo', and rather than fighting the grade with retaining walls, the house steps down it in three shallow terraces, each holding its own outdoor room.",
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
    spreadBImage: "assets/images/omary/Untitled-4.webp",
    spreadBImageAlt: "Omary — exterior, alternate view",
    spread2Image: "assets/images/omary/Untitled-5.webp",
    spread2ImageAlt: "Omary — wide exterior view",
    galleryImages: [
      { src: "assets/images/omary/kitchen-dining.webp", alt: "Omary — kitchen and dining" },
      { src: "assets/images/omary/living-terrace.webp", alt: "Omary — living room onto terrace" },
      { src: "assets/images/omary/open-plan.webp", alt: "Omary — open-plan interior" },
      { src: "assets/images/omary/living-room.webp", alt: "Omary — living room" }
    ],
    tones: [6, 7, 8, 1, 2, 3, 4]
  },

  sakhr: {
    title: "Sakhr",
    titleAr: "صخر",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/sakhr.webp",
    heroImageAlt: "Sakhr — exterior view",
    kicker: "Case Study — 04 / Residential",
    headline: "Sakhr: Load-Bearing Stone Reworked as a Perforated Screen",
    paragraphs: [
      "Sakhr — ‘rock’ in Arabic — takes the load-bearing stone construction common across Al-Bireh and turns it into the building's primary architectural idea rather than just its structure: a perforated stone screen wraps the south and west faces, filtering light before it ever reaches the glazing behind it.",
      "Behind the screen, a conventional apartment plan stays simple and efficient; the screen itself is the only place the project spends its formal ambition, so the rest of the building can stay quiet and easy to build."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The screen does the work a curtain would — it just happens to be made of stone.",
    materialsHeading: "Materials & Structure",
    materialsText: "Precast stone-aggregate panels form the perforated screen, hung clear of the concrete frame behind on a simple steel bracket system that also doubles as a maintenance walkway.",
    // real photography — see assets/images/sakhr/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    spreadBImage: "assets/images/sakhr/31.webp",
    spreadBImageAlt: "Sakhr — exterior, alternate view",
    spread2Image: "assets/images/sakhr/f5.webp",
    spread2ImageAlt: "Sakhr — wide exterior view",
    galleryImages: [
      { src: "assets/images/sakhr/Untitled-7.webp", alt: "Sakhr — exterior detail" },
      { src: "assets/images/sakhr/Untitled-9.webp", alt: "Sakhr — exterior detail" },
      { src: "assets/images/sakhr/Untitled-11.webp", alt: "Sakhr — exterior, evening view" },
      { src: "assets/images/sakhr/Untitled-12.webp", alt: "Sakhr — detail view" },
      { src: "assets/images/sakhr/Untitled-13.webp", alt: "Sakhr — wide exterior view" }
    ],
    tones: [2, 3, 4, 5, 6, 7, 8]
  },

  jamal: {
    title: "ِAbdallah Al-Jamal",
    titleAr: "عبدالله الجمل",
    location: "Ramallah, Palestine",
    heroImage: "assets/images/jamal.webp",
    heroImageAlt: "Abdallah Al-Jamal — exterior view",
    kicker: "Case Study — 05 / Residential",
    headline: "Abdallah Al-Jamal: A Family Compound Split Into Three Volumes",
    paragraphs: [
      "Rather than one large house, the Abdallah Al-Jamal residence in Ramallah is organized as three linked volumes — one for the parents, two for married children's families — arranged around a shared entrance court so each household keeps its own front door.",
      "A single shared roof terrace ties the three volumes together at the top level, giving the extended family one common outdoor room even as daily life below stays fully separate."
    ],
    facts: [
      { k: "Location", v: "Ramallah, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "Three houses that share an address, not three rooms that share a house.",
    materialsHeading: "Materials & Structure",
    materialsText: "Each volume is built in exposed reinforced concrete with a shared stone base at street level, tying the compound visually to the older stone houses further down the street.",
    // real photography — see assets/images/jamal/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    spreadBImage: "assets/images/jamal/Untitled-5.webp",
    spreadBImageAlt: "Abdallah Al-Jamal — aerial view",
    spread2Image: "assets/images/jamal/Untitled-4.webp",
    spread2ImageAlt: "Abdallah Al-Jamal — aerial view",
    galleryImages: [
      { src: "assets/images/jamal/8.webp", alt: "Abdallah Al-Jamal — entrance detail" },
      { src: "assets/images/jamal/Untitled-3.webp", alt: "Abdallah Al-Jamal — exterior, alternate view" },
      { src: "assets/images/jamal/Untitled-2.webp", alt: "Abdallah Al-Jamal — exterior, alternate view" },
      { src: "assets/images/jamal/Untitled-6.webp", alt: "Abdallah Al-Jamal — aerial detail" }
    ],
    tones: [7, 8, 1, 2, 3, 4, 5]
  },

  abdallah: {
    title: "Abdallah Ewias",
    titleAr: "عبدالله عويس",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/abdallah.webp",
    heroImageAlt: "Abdallah Ewias — exterior view",
    kicker: "Case Study — 06 / Residential",
    headline: "Abdallah Ewias: A Corner Site Turned Into Two Fronts",
    paragraphs: [
      "On a corner lot in Al-Bireh, most houses pick one street to face and treat the other as a side elevation. Abdallah Ewias instead gives both streets a genuine front — two entrances, two living rooms with their own outlook — folded around a shared internal stair.",
      "The fold in the plan created an unplanned triangular garden at the back of the site, now the house's most-used outdoor room precisely because it wasn't the point of the design."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The best room in the house was the leftover space neither elevation wanted.",
    materialsHeading: "Materials & Structure",
    materialsText: "A conventional concrete frame is dressed in locally quarried stone on both street faces, with render reserved for the more private garden elevation.",
    // real photography — see assets/images/abdallah/. Any of these left unset
    // (or removed later) falls back to the tones[] placeholder in that slot.
    spreadBImage: "assets/images/abdallah/Untitled-1.webp",
    spreadBImageAlt: "Abdallah Ewias — exterior, alternate view",
    spread2Image: "assets/images/abdallah/Untitled-7.webp",
    spread2ImageAlt: "Abdallah Ewias — aerial view",
    galleryImages: [
      { src: "assets/images/abdallah/Untitled-3.webp", alt: "Abdallah Ewias — exterior, alternate view" },
      { src: "assets/images/abdallah/Untitled-4.webp", alt: "Abdallah Ewias — exterior, evening view" },
      { src: "assets/images/abdallah/Untitled-5.webp", alt: "Abdallah Ewias — rear exterior view" },
      { src: "assets/images/abdallah/Untitled-6.webp", alt: "Abdallah Ewias — pool terrace detail" },
      { src: "assets/images/abdallah/Untitled-8.webp", alt: "Abdallah Ewias — aerial, evening view" }
    ],
    tones: [3, 4, 5, 6, 7, 8, 1]
  },

  "bireh-plaza": {
    title: "Bireh Plaza",
    titleAr: "ساحة البلد",
    location: "City Center, Al-Bireh, Palestine",
    heroImage: "assets/images/bireh-plaza.webp",
    heroImageAlt: "Bireh Plaza — exterior view",
    kicker: "Case Study — 07 / Cultural — Commercial",
    headline: "Bireh Plaza: Reopening Al-Bireh's City Center to Foot Traffic",
    paragraphs: [
      "Bireh Plaza reworks a dense city-center block into ground-floor retail with a public plaza cut through its middle — turning what was a single deep building footprint into a shortcut pedestrians actually want to take.",
      "Shops line the new plaza at eye level, offices and a small event hall sit above on the upper floors, and the plaza itself is treated as the project's real civic contribution — deliberately more generous than the retail alone requires."
    ],
    facts: [
      { k: "Location", v: "City Center, Al-Bireh, Palestine" },
      { k: "Program", v: "Cultural — Commercial" },
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
    title: "Iyyad Jaradat",
    titleAr: "اياد جردات",
    location: "Ramallah, Palestine",
    heroImage: "assets/images/jaradat.webp",
    heroImageAlt: "Iyyad Jaradat — exterior view",
    kicker: "Case Study — 08 / Commercial — Residential",
    headline: "Iyyad Jaradat: Ground-Floor Commerce Under Housing Above",
    paragraphs: [
      "The Iyyad Jaradat building in Ramallah stacks a commercial ground floor — sized and glazed for retail — beneath three floors of apartments, with a structural transfer level between them kept honest and visible rather than hidden.",
      "Deep balconies on the residential floors do double duty as sun-shading for the units below them, so the building manages its own comfort with geometry rather than added equipment."
    ],
    facts: [
      { k: "Location", v: "Ramallah, Palestine" },
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
    spreadBImage: "assets/images/jaradat/Untitled-3.webp",
    spreadBImageAlt: "Iyyad Jaradat — exterior, alternate view",
    spread2Image: "assets/images/jaradat/Untitled-6.webp",
    spread2ImageAlt: "Iyyad Jaradat — aerial, evening view",
    galleryImages: [
      { src: "assets/images/jaradat/Untitled-4.webp", alt: "Iyyad Jaradat — entrance detail" },
      { src: "assets/images/jaradat/Untitled-5.webp", alt: "Iyyad Jaradat — exterior, alternate view" },
      { src: "assets/images/jaradat/Untitled-7.webp", alt: "Iyyad Jaradat — facade detail" }
    ],
    tones: [5, 6, 7, 8, 1, 2, 3]
  },

  "imm-jad-sarsour": {
    title: "Imm Jad Sarsour",
    titleAr: "ام جاد صرصور",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/imm-jad-sarsour.webp",
    heroImageAlt: "Imm Jad Sarsour — exterior view",
    kicker: "Case Study — 09 / Residential",
    headline: "Imm Jad Sarsour: A Compact Plan Built Around Southern Light",
    paragraphs: [
      "This Al-Bireh residence works from a compact, efficient footprint, planning the living spaces to capture southern light through the day rather than relying on a larger floor area to feel generous.",
      "The street elevation stays quiet and deliberately understated, keeping the family's daily life oriented inward toward the garden and the more private faces of the house."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "A small footprint doesn't have to mean a small house — it just means every room has to earn its place.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame is finished in a pale render, with stone reserved for the entrance surround to mark the front door without overstating it.",
    spreadBImage: "assets/images/imm-jad-sarsour/02.webp",
    spreadBImageAlt: "Imm Jad Sarsour — exterior, alternate view",
    spread2Image: "assets/images/imm-jad-sarsour/03.webp",
    spread2ImageAlt: "Imm Jad Sarsour — wide exterior view",
    galleryImages: [
      { src: "assets/images/imm-jad-sarsour/04.webp", alt: "Imm Jad Sarsour — exterior detail" },
      { src: "assets/images/imm-jad-sarsour/05.webp", alt: "Imm Jad Sarsour — exterior detail" },
      { src: "assets/images/imm-jad-sarsour/06.webp", alt: "Imm Jad Sarsour — exterior, alternate view" }
    ],
    tones: [1, 2, 3, 4, 5, 6, 7]
  },

  "imad-mshosher": {
    title: "Imad Mshosher",
    titleAr: "عماد مشوشر",
    location: "Sateh Marhaba, Palestine",
    heroImage: "assets/images/imad-mshosher.webp",
    heroImageAlt: "Imad Mshosher — exterior view",
    kicker: "Case Study — 10 / Residential",
    headline: "Imad Mshosher: A Stair Reworked as the House's Organizing Spine",
    paragraphs: [
      "Stepped across several levels to hold onto its views, this residence reorganizes the stair from a circulation afterthought into the spine that ties each floor's living space back to the entrance below.",
      "Each level opens toward a different outlook, letting the section of the house do the work that a wider footprint would otherwise have needed."
    ],
    facts: [
      { k: "Location", v: "Sateh Marhaba, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The stair stopped being the thing you pass through and became the thing that holds the house together.",
    materialsHeading: "Materials & Structure",
    materialsText: "A concrete frame carries the stepped levels, with a stone base at street level giving way to a lighter render finish on the upper, more open floors.",
    spreadBImage: "assets/images/imad-mshosher/02.webp",
    spreadBImageAlt: "Imad Mshosher — exterior, alternate view",
    spread2Image: "assets/images/imad-mshosher/03.webp",
    spread2ImageAlt: "Imad Mshosher — wide exterior view",
    galleryImages: [
      { src: "assets/images/imad-mshosher/04.webp", alt: "Imad Mshosher — exterior detail" },
      { src: "assets/images/imad-mshosher/05.webp", alt: "Imad Mshosher — exterior detail" },
      { src: "assets/images/imad-mshosher/06.webp", alt: "Imad Mshosher — exterior, alternate view" },
      { src: "assets/images/imad-mshosher/07.webp", alt: "Imad Mshosher — exterior, evening view" },
      { src: "assets/images/imad-mshosher/08.webp", alt: "Imad Mshosher — aerial view" }
    ],
    tones: [2, 3, 4, 5, 6, 7, 8]
  },

  "jalal-hamed": {
    title: "Jalal Hamed",
    titleAr: "جلال حامد",
    location: "Silwad, Palestine",
    heroImage: "assets/images/jalal-hamed.webp",
    heroImageAlt: "Jalal Hamed — exterior view",
    kicker: "Case Study — 11 / Residential",
    headline: "Jalal Hamed: A Restrained Street Front, an Open Garden Face",
    paragraphs: [
      "This Silwad house is organized around a central stair hall that anchors every room to a single, legible core, keeping circulation short even as the plan grows.",
      "The street elevation is kept restrained and mostly solid, reserving the more open, glazed face of the house for the private garden at the rear."
    ],
    facts: [
      { k: "Location", v: "Silwad, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The street only ever sees half of the house — the garden gets the other half.",
    materialsHeading: "Materials & Structure",
    materialsText: "Load-bearing stone walls face the street, while the garden elevation shifts to a lighter concrete-and-glass assembly that opens the plan outward.",
    spreadBImage: "assets/images/jalal-hamed/02.webp",
    spreadBImageAlt: "Jalal Hamed — exterior, alternate view",
    spread2Image: "assets/images/jalal-hamed/03.webp",
    spread2ImageAlt: "Jalal Hamed — wide exterior view",
    galleryImages: [
      { src: "assets/images/jalal-hamed/04.webp", alt: "Jalal Hamed — exterior detail" },
      { src: "assets/images/jalal-hamed/05.webp", alt: "Jalal Hamed — exterior detail" },
      { src: "assets/images/jalal-hamed/06.webp", alt: "Jalal Hamed — exterior, alternate view" },
      { src: "assets/images/jalal-hamed/07.webp", alt: "Jalal Hamed — evening view" }
    ],
    tones: [3, 4, 5, 6, 7, 8, 1]
  },

  "omar-aaqel": {
    title: "Omar Aaqel",
    titleAr: "عمر عقل",
    location: "Al-Bireh, Palestine",
    heroImage: "assets/images/omar-aaqel.webp",
    heroImageAlt: "Omar Aaqel — exterior view",
    kicker: "Case Study — 12 / Residential",
    headline: "Omar Aaqel: A Compact, Energy-Conscious Family House",
    paragraphs: [
      "Designed around a compact, energy-conscious plan, this Al-Bireh house uses deep window reveals to cut solar gain without giving up daylight in the main living spaces.",
      "A simple stone base grounds the building at street level, letting the more open upper floor read as a lighter volume set above it."
    ],
    facts: [
      { k: "Location", v: "Al-Bireh, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2024 –" }
    ],
    pullquote: "A deep reveal does the shading work a mechanical louver would — it just never needs maintenance.",
    materialsHeading: "Materials & Structure",
    materialsText: "A stone-clad concrete base carries a lighter render-finished upper floor, with deep-set window reveals cast directly into the concrete frame.",
    spreadBImage: "assets/images/omar-aaqel/02.webp",
    spreadBImageAlt: "Omar Aaqel — exterior, alternate view",
    spread2Image: "assets/images/omar-aaqel/03.webp",
    spread2ImageAlt: "Omar Aaqel — wide exterior view",
    galleryImages: [
      { src: "assets/images/omar-aaqel/04.webp", alt: "Omar Aaqel — exterior detail" },
      { src: "assets/images/omar-aaqel/05.webp", alt: "Omar Aaqel — exterior detail" },
      { src: "assets/images/omar-aaqel/06.webp", alt: "Omar Aaqel — exterior, alternate view" }
    ],
    tones: [4, 5, 6, 7, 8, 1, 2]
  },

  "abo-khalid": {
    title: "Abo Khalid",
    titleAr: "ابو خالد",
    location: "Deir Dibwan, Palestine",
    heroImage: "assets/images/abo-khalid.webp",
    heroImageAlt: "Abo Khalid — exterior view",
    kicker: "Case Study — 13 / Residential",
    headline: "Abo Khalid: A Double-Height Hall as the House's Light Well",
    paragraphs: [
      "Built around a central double-height hall, this Deir Dibwan residence draws light down into the ground-floor living spaces from above, rather than relying on street-facing windows alone.",
      "The hall also acts as the house's main gathering space, visually connecting the ground floor to the bedrooms on the level above."
    ],
    facts: [
      { k: "Location", v: "Deir Dibwan, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2023 –" }
    ],
    pullquote: "The light well isn't decorative — it's the reason the living room doesn't need its lights on at noon.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame carries the double-height void, with a stone-clad street facade and a skylight assembly set into the roof above the hall.",
    spreadBImage: "assets/images/abo-khalid/02.webp",
    spreadBImageAlt: "Abo Khalid — exterior, alternate view",
    spread2Image: "assets/images/abo-khalid/03.webp",
    spread2ImageAlt: "Abo Khalid — wide exterior view",
    galleryImages: [
      { src: "assets/images/abo-khalid/04.webp", alt: "Abo Khalid — exterior detail" },
      { src: "assets/images/abo-khalid/05.webp", alt: "Abo Khalid — exterior detail" },
      { src: "assets/images/abo-khalid/06.webp", alt: "Abo Khalid — exterior, alternate view" },
      { src: "assets/images/abo-khalid/07.webp", alt: "Abo Khalid — evening view" }
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
    title: "Mikkawi",
    titleAr: "مكاوي",
    location: "Masayef, Palestine",
    heroImage: "assets/images/mikkawi.webp",
    heroImageAlt: "Mikkawi — exterior view",
    kicker: "Case Study — 15 / Residential",
    headline: "Mikkawi: A Vertical Plan That Keeps the Garden Large",
    paragraphs: [
      "Mikkawi trades a larger footprint for a taller, more vertical plan, stacking bedrooms above an open ground floor to leave as much of the lot as possible for the garden around it.",
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
    spreadBImage: "assets/images/mikkawi/02.webp",
    spreadBImageAlt: "Mikkawi — exterior, alternate view",
    spread2Image: "assets/images/mikkawi/03.webp",
    spread2ImageAlt: "Mikkawi — wide exterior view",
    galleryImages: [
      { src: "assets/images/mikkawi/04.webp", alt: "Mikkawi — exterior detail" },
      { src: "assets/images/mikkawi/05.webp", alt: "Mikkawi — exterior detail" },
      { src: "assets/images/mikkawi/06.webp", alt: "Mikkawi — exterior, alternate view" }
    ],
    tones: [7, 8, 1, 2, 3, 4, 5]
  },

  "tallet-bahar": {
    title: "Tallet Bahar",
    titleAr: "طلة بحر",
    location: "Ramallah, Palestine",
    heroImage: "assets/images/tallet-bahar.webp",
    heroImageAlt: "Tallet Bahar — exterior view",
    kicker: "Case Study — 16 / Residential",
    headline: "Tallet Bahar: A House Stepped Into the Hillside",
    paragraphs: [
      "Tallet Bahar follows the slope of its Ramallah hillside site rather than cutting a flat platform into it, stepping the house down the grade in line with the terrain.",
      "Terraces on each level open the house outward toward the valley view, so the section — not the facade — carries most of the design's ambition."
    ],
    facts: [
      { k: "Location", v: "Ramallah, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022 –" }
    ],
    pullquote: "The slope was never a constraint to solve around — it was the site's best feature.",
    materialsHeading: "Materials & Structure",
    materialsText: "Retaining and structural walls are combined in board-formed concrete, with local stone cladding on the upper terraces to tie the house back to the hillside around it.",
    spreadBImage: "assets/images/tallet-bahar/02.webp",
    spreadBImageAlt: "Tallet Bahar — exterior, alternate view",
    spread2Image: "assets/images/tallet-bahar/03.webp",
    spread2ImageAlt: "Tallet Bahar — wide exterior view",
    galleryImages: [
      { src: "assets/images/tallet-bahar/04.webp", alt: "Tallet Bahar — exterior detail" },
      { src: "assets/images/tallet-bahar/05.webp", alt: "Tallet Bahar — exterior detail" },
      { src: "assets/images/tallet-bahar/06.webp", alt: "Tallet Bahar — exterior, alternate view" },
      { src: "assets/images/tallet-bahar/07.webp", alt: "Tallet Bahar — terrace detail" },
      { src: "assets/images/tallet-bahar/08.webp", alt: "Tallet Bahar — evening view" }
    ],
    tones: [8, 1, 2, 3, 4, 5, 6]
  },

  "nabali-al-faris": {
    title: "Nabali Al-Faris",
    titleAr: "نبالي والفارس",
    location: "Ramallah, Palestine",
    heroImage: "assets/images/nabali-al-faris.webp",
    heroImageAlt: "Nabali Al-Faris — exterior view",
    kicker: "Case Study — 17 / Residential",
    headline: "Nabali Al-Faris: A House Planned Around a Shared Courtyard",
    paragraphs: [
      "This Ramallah family house is planned around a shared central courtyard, keeping the surrounding rooms naturally lit and cross-ventilated without relying on a deep street-facing facade.",
      "The courtyard becomes the house's real living room in the warmer months, with the perimeter rooms able to open fully onto it."
    ],
    facts: [
      { k: "Location", v: "Ramallah, Palestine" },
      { k: "Program", v: "Residential" },
      { k: "Status", v: "In Design Development" },
      { k: "Site Area", v: "— placeholder" },
      { k: "Year", v: "2022 –" }
    ],
    pullquote: "The courtyard does what air conditioning would, most of the year, for free.",
    materialsHeading: "Materials & Structure",
    materialsText: "Load-bearing stone walls wrap the courtyard on all sides, with timber-framed openings sized to each room's exposure rather than repeated uniformly.",
    spreadBImage: "assets/images/nabali-al-faris/02.webp",
    spreadBImageAlt: "Nabali Al-Faris — exterior, alternate view",
    spread2Image: "assets/images/nabali-al-faris/03.webp",
    spread2ImageAlt: "Nabali Al-Faris — wide exterior view",
    galleryImages: [
      { src: "assets/images/nabali-al-faris/04.webp", alt: "Nabali Al-Faris — exterior detail" },
      { src: "assets/images/nabali-al-faris/05.webp", alt: "Nabali Al-Faris — exterior detail" },
      { src: "assets/images/nabali-al-faris/06.webp", alt: "Nabali Al-Faris — exterior, alternate view" }
    ],
    tones: [1, 2, 3, 4, 5, 6, 7]
  }

};
