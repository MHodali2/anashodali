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
      { k: "Year", v: "2025 –" }
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
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The corridor stopped being leftover space and became the one move that organizes the whole house.",
    materialsHeading: "Materials & Structure",
    materialsText: "A reinforced concrete frame carries the cantilevered band itself, finished in a pale sand-colored render that reads close to the surrounding stone; interior partitions are lightweight so the plan can be reconfigured room by room as the family's needs change.",
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
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "Every terrace is really just a room with the roof left off.",
    materialsHeading: "Materials & Structure",
    materialsText: "Load-bearing stone walls, quarried locally, carry most of the structure; where the plan opens up, slender steel columns take over so the courtyard-facing walls can be almost entirely glazed.",
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
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The screen does the work a curtain would — it just happens to be made of stone.",
    materialsHeading: "Materials & Structure",
    materialsText: "Precast stone-aggregate panels form the perforated screen, hung clear of the concrete frame behind on a simple steel bracket system that also doubles as a maintenance walkway.",
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
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "Three houses that share an address, not three rooms that share a house.",
    materialsHeading: "Materials & Structure",
    materialsText: "Each volume is built in exposed reinforced concrete with a shared stone base at street level, tying the compound visually to the older stone houses further down the street.",
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
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "The best room in the house was the leftover space neither elevation wanted.",
    materialsHeading: "Materials & Structure",
    materialsText: "A conventional concrete frame is dressed in locally quarried stone on both street faces, with render reserved for the more private garden elevation.",
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
      { k: "Year", v: "2025 –" }
    ],
    pullquote: "A plaza only works if it's also the fastest way to get somewhere.",
    materialsHeading: "Materials & Structure",
    materialsText: "A steel canopy shades the plaza without enclosing it, keeping the space legible as outdoor public ground; the flanking buildings are finished in a warm limestone that ties the project to the older city-center facades around it.",
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
    tones: [5, 6, 7, 8, 1, 2, 3]
  }

};
