const prisma = require('./prisma')

const IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
]

const SEED_PROPERTIES = [
  {
    title: 'Inwood Hill Residence',
    price: 649000,
    beds: 1,
    baths: 1,
    sqft: 720,
    location: 'Inwood, Manhattan',
    type: 'condo',
    condition: 'Renovated',
    images: [IMAGES[5]],
    featured: false,
    description:
      "Tucked on a quiet block just steps from Inwood Hill Park, this one-bedroom condo offers one of the best value propositions left in Manhattan. The unit was fully renovated within the past two years: new white-oak flooring throughout, a stone-and-white kitchen with stainless appliances, and a spa-style bathroom with a rainfall shower. Northern light pours through oversized windows, and the layout leaves room for a proper home office nook. The building is a well-run, low-fee co-op with a live-in super, laundry room, and bike storage. Inwood Hill Park and its trails, tennis courts, and river views are a five-minute walk, and the A train puts Midtown under 30 minutes away."
  },
  {
    title: 'Washington Heights River View',
    price: 675000,
    beds: 2,
    baths: 1,
    sqft: 900,
    location: 'Washington Heights, Manhattan',
    type: 'apartment',
    condition: 'Excellent',
    images: [IMAGES[2]],
    featured: false,
    description:
      "A rare two-bedroom in a classic prewar elevator building, with partial Hudson River views from both the living room and primary bedroom. Original details — herringbone floors, high ceilings, deep window sills — have been carefully preserved alongside tasteful updates to the kitchen and bath. The second bedroom comfortably fits a queen bed and desk, ideal for a roommate setup or home office. Building amenities include a laundry room, package room, and a landscaped courtyard. Fort Tryon Park and The Cloisters are a short stroll away, and the A express train gets you into Midtown in under 25 minutes."
  },
  {
    title: 'East Village Artist Flat',
    price: 780000,
    beds: 1,
    baths: 1,
    sqft: 650,
    location: 'East Village, Manhattan',
    type: 'apartment',
    condition: 'Renovated',
    images: [IMAGES[1]],
    featured: false,
    description:
      "Full of character on one of the East Village's most storied blocks, this walk-up one-bedroom pairs original exposed brick and tin ceilings with a fully renovated kitchen and bath. The open living area gets excellent light from two exposures, and the bedroom comfortably separates from the living space for genuine privacy — rare at this size downtown. Steps from Tompkins Square Park, and surrounded by the neighborhood's famous restaurants, bars, and independent shops. A fourth-floor walk-up with low monthly costs, this is a foothold in one of Manhattan's most in-demand downtown pockets."
  },
  {
    title: 'Greenwich Village Garden Studio',
    price: 895000,
    beds: 1,
    baths: 1,
    sqft: 600,
    location: 'Greenwich Village, Manhattan',
    type: 'condo',
    condition: 'Excellent',
    images: [IMAGES[3]],
    featured: false,
    description:
      "A ground-floor studio condo with a private, gated garden patio — a genuine rarity in the Village. Inside, the open layout is anchored by a windowed kitchen with quartz counters and a built-in banquette, while the sleeping area is discreetly separated by a custom built-in. The garden itself is fully private, large enough for a dining set and planters, and gets afternoon sun. Located on a tree-lined, landmarked block minutes from Washington Square Park, with the neighborhood's cafes, jazz clubs, and NYU campus all within easy walking distance."
  },
  {
    title: 'Murray Hill Corner Suite',
    price: 1150000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    location: 'Murray Hill, Manhattan',
    type: 'condo',
    condition: 'Excellent',
    images: [IMAGES[4]],
    featured: false,
    description:
      "A corner two-bedroom, two-bath in a full-service condominium, with oversized windows wrapping three exposures that flood the open kitchen and living area with light most of the day. Both bedrooms fit king beds and have their own en-suite or adjacent bath, making this an easy split for roommates or a couple who wants a dedicated guest room or office. The building offers a 24-hour doorman, live-in super, fitness center, and a common roof deck with skyline views. Murray Hill's mix of quiet residential streets and easy access to Grand Central, the 6 train, and the FDR makes commuting from here unusually painless."
  },
  {
    title: "Hell's Kitchen Sky Loft",
    price: 1050000,
    beds: 1,
    baths: 1.5,
    sqft: 950,
    location: "Hell's Kitchen, Manhattan",
    type: 'loft',
    condition: 'Renovated',
    images: [IMAGES[1]],
    featured: false,
    description:
      "A high-floor loft with an open, industrial-inspired layout and floor-to-ceiling windows facing west toward the Hudson — sunsets from the living room are a daily event. The kitchen features a waterfall island, integrated Miele appliances, and enough counter space for serious cooking, while the sleeping loft above is separated just enough to feel like a proper bedroom without losing the openness of the plan. A powder room off the entry is a thoughtful touch for guests. The building has a shared roof deck, and the location puts Hudson Yards, the theater district, and the 7/A/C/E lines all within a ten-minute walk."
  },
  {
    title: 'Lower East Side Modern Condo',
    price: 1250000,
    beds: 2,
    baths: 2,
    sqft: 1050,
    location: 'Lower East Side, Manhattan',
    type: 'condo',
    condition: 'Newly Built',
    images: [IMAGES[5]],
    featured: false,
    description:
      "A brand-new construction two-bedroom in a boutique LES condominium, never previously occupied. The layout separates the two bedrooms on opposite sides of the apartment for privacy, each with its own bathroom, while the open kitchen and living area opens onto a private balcony overlooking the street. Finishes include wide-plank white oak floors, a chef's kitchen with a Bertazzoni range, and an in-unit washer/dryer. The building offers a landscaped roof lounge with grilling stations and skyline views, plus a package room and bike storage. The LES's restaurant and gallery scene, plus the F/J/M/Z trains, are all at your doorstep."
  },
  {
    title: 'Financial District Sky Residence',
    price: 1650000,
    beds: 1,
    baths: 1.5,
    sqft: 1200,
    location: 'Financial District, Manhattan',
    type: 'apartment',
    condition: 'Newly Built',
    images: [IMAGES[5]],
    featured: false,
    description:
      "A high-floor one-bedroom-plus-den in a full-amenity FiDi tower, with sweeping views over New York Harbor and the downtown skyline from nearly every room. The den is large enough to serve as a proper second bedroom, home office, or nursery. Building amenities are genuinely resort-level: a 75-foot indoor pool, spa, fitness center with yoga studio, resident lounge, and a furnished roof terrace. Battery Park, the Staten Island Ferry, and the 1/2/3/4/5/A/C/E/R/W subway lines are all within a few minutes' walk, making this one of the best-connected addresses in the city."
  },
  {
    title: 'Harlem Brownstone Restoration',
    price: 1450000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    location: 'Harlem, Manhattan',
    type: 'townhouse',
    condition: 'Needs Renovation',
    images: [IMAGES[4]],
    featured: false,
    description:
      "A landmark-district brownstone shell on a beautiful tree-lined block, offered as a rare opportunity for a full, custom restoration. Original detailing — plaster moldings, a carved staircase, and several marble mantels — survives throughout and gives a strong sense of the home's turn-of-the-century character. The building's four floors and finished cellar leave enormous flexibility for a single-family conversion, a duplex-plus-rental configuration, or a full owner's mansion. Delivered vacant with clear title, this is a project for a buyer ready to bring in an architect and contractor, in a neighborhood that has seen significant investment over the past decade."
  },
  {
    title: 'Midtown East High-Floor Condo',
    price: 1950000,
    beds: 2,
    baths: 2,
    sqft: 1300,
    location: 'Midtown East, Manhattan',
    type: 'condo',
    condition: 'Excellent',
    images: [IMAGES[2]],
    featured: false,
    description:
      "A high-floor, two-bedroom, two-bath condo moments from Grand Central Terminal, with floor-to-ceiling windows and unobstructed eastern views toward the river. The primary suite comfortably fits a king bed and has its own walk-in closet and en-suite bath, while the second bedroom works equally well as a guest room or office. The open kitchen has a large island for entertaining, and the building offers a 24-hour doorman, concierge, fitness center, and a resident lounge with a private dining room. With Grand Central, the 4/5/6/7/S lines, and the East Side's best restaurants all within blocks, this is an exceptionally convenient base for a commuter or frequent traveler."
  },
  {
    title: 'The Chelsea Mercantile',
    price: 2400000,
    beds: 2,
    baths: 2,
    sqft: 1500,
    location: 'Chelsea, Manhattan',
    type: 'condo',
    condition: 'Excellent',
    images: [IMAGES[0]],
    featured: false,
    description:
      "A sprawling two-bedroom condo inside a converted 1913 mercantile warehouse, with 11-foot ceilings, oversized factory windows, and exposed structural columns that give the space real industrial character. The kitchen has been fully updated with custom cabinetry and a large island, and both bedrooms are generously sized with excellent closet space. A standout feature is the private, furnished roof deck — accessible only to this unit — with skyline and river views. The building retains a full-time doorman and a shared gym, and sits equidistant from the High Line, Chelsea's gallery district, and the Meatpacking District's restaurants."
  },
  {
    title: 'NoHo Artist Loft',
    price: 2650000,
    beds: 2,
    baths: 2,
    sqft: 1700,
    location: 'NoHo, Manhattan',
    type: 'loft',
    condition: 'Renovated',
    images: [IMAGES[1]],
    featured: false,
    description:
      "A classic cast-iron loft on one of NoHo's most photographed cobblestone blocks, with 12-foot ceilings, oversized arched windows, and an open floor plan that has hosted everything from gallery openings to dinner parties for thirty. The primary bedroom is fully enclosed for privacy, while a flexible second room works as a bedroom, studio, or media room depending on the buyer's needs. A chef's kitchen anchors the main living space with a large island and top-tier appliances. The building has a live-in super and a shared roof deck, and sits within a five-minute walk of the East Village, SoHo, and Washington Square Park."
  },
  {
    title: 'Flatiron Loft Conversion',
    price: 2850000,
    beds: 2,
    baths: 2,
    sqft: 1650,
    location: 'Flatiron District, Manhattan',
    type: 'loft',
    condition: 'Renovated',
    images: [IMAGES[1]],
    featured: false,
    description:
      "A full-floor loft conversion inside a landmark Flatiron building, with exposed steel beams, 11-foot ceilings, and a wall of arched windows overlooking a quiet side street. The kitchen features a waterfall marble island large enough to seat six, and flows directly into a living and dining area built for entertaining. Both bedrooms are oversized, with the primary suite offering a walk-in closet and a spa bathroom with a soaking tub. The building has a virtual doorman, bike room, and storage, and the location — steps from Madison Square Park, Union Square, and the N/Q/R/W/4/5/6 lines — is about as central as Manhattan gets."
  },
  {
    title: 'Gramercy Park Residence',
    price: 3100000,
    beds: 3,
    baths: 3,
    sqft: 2950,
    location: 'Gramercy Park, Manhattan',
    type: 'apartment',
    condition: 'Renovated',
    images: [IMAGES[2]],
    featured: false,
    description:
      "One of Manhattan's true rarities: a residence with private key access to Gramercy Park, the city's only private park. This fully renovated three-bedroom occupies a full floor, with custom millwork throughout, a wood-burning fireplace in the formal living room, and a windowed eat-in kitchen outfitted with top-of-the-line appliances. The primary suite includes a dressing room and a marble bath with a soaking tub, while the two additional bedrooms share a renovated bath. Prewar details — high ceilings, oversized moldings, and herringbone floors — have been meticulously maintained. The building offers a live-in super and a shared garden, on one of the most tranquil blocks in the city."
  },
  {
    title: 'Upper West Side Prewar Classic Seven',
    price: 3400000,
    beds: 3,
    baths: 2.5,
    sqft: 2400,
    location: 'Upper West Side, Manhattan',
    type: 'apartment',
    condition: 'Excellent',
    images: [IMAGES[2]],
    featured: true,
    description:
      "A classic seven on a tree-lined block near Riverside Park, with the gracious proportions and formal layout that define the Upper West Side's best prewar buildings. A generous entry gallery leads to a formal dining room, a windowed eat-in kitchen with a butler's pantry, and a corner living room with park glimpses. Three well-proportioned bedrooms sit down a private hallway, including a primary suite with two closets and an en-suite bath. Details include beamed ceilings, herringbone floors, and original brass hardware, all beautifully maintained. The building offers a full-time doorman, live-in super, and a central laundry room, with Riverside Park, the 1/2/3 trains, and the neighborhood's excellent schools all close by."
  },
  {
    title: 'Upper East Side Classic',
    price: 3750000,
    beds: 3,
    baths: 3,
    sqft: 3400,
    location: 'Upper East Side, Manhattan',
    type: 'apartment',
    condition: 'Excellent',
    images: [IMAGES[2]],
    featured: false,
    description:
      "Pre-war elegance meets modern luxury in this expansive three-bedroom on one of the Upper East Side's premier blocks. Herringbone floors run throughout, and two wood-burning fireplaces anchor the formal living and dining rooms. The chef's kitchen has been fully renovated with Gaggenau appliances, a large center island, and a breakfast nook overlooking a quiet courtyard. The primary suite includes a dressing room and a marble en-suite bath with a separate soaking tub and shower. Central Park, Madison Avenue's flagship boutiques, and the Metropolitan Museum are all within easy walking distance, and the building offers a 24-hour doorman and a live-in resident manager."
  },
  {
    title: 'Tribeca Loft Residence',
    price: 4200000,
    beds: 2,
    baths: 2.5,
    sqft: 2800,
    location: 'Tribeca, Manhattan',
    type: 'loft',
    condition: 'Renovated',
    images: [IMAGES[1]],
    featured: true,
    description:
      "An authentic Tribeca artist's loft with 14-foot ceilings, original cast-iron columns, and massive industrial windows that flood the 2,800-square-foot floor plan with light from two exposures. The kitchen was designed around a 12-foot marble island, with a full suite of professional-grade appliances for serious cooking and entertaining alike. Both bedrooms are oversized, with the primary suite featuring a custom walk-in closet and a spa-like bath with a walk-in rain shower and freestanding tub. The building retains its original cobblestone-fronted facade, and sits on one of Tribeca's most picturesque streets, moments from the neighborhood's Michelin-starred restaurants and Hudson River Park."
  },
  {
    title: 'SoHo Designer Duplex',
    price: 6800000,
    beds: 3,
    baths: 3,
    sqft: 3100,
    location: 'SoHo, Manhattan',
    type: 'duplex',
    condition: 'Renovated',
    images: [IMAGES[4]],
    featured: true,
    description:
      "An architect-designed duplex inside a boutique SoHo condominium, connected by a dramatic floating staircase that anchors the double-height living space. The custom Italian kitchen features book-matched stone surfaces and fully integrated appliances, opening onto a formal dining area beneath a wall of cast-iron windows. Upstairs, three bedrooms include a primary suite with a private terrace, a freestanding tub, and a custom dressing room. A private elevator opens directly into the unit, and the building offers a fitness center and 24-hour attended lobby. SoHo's cobblestone streets, flagship boutiques, and gallery scene are all at the doorstep."
  },
  {
    title: 'West Village Carriage House',
    price: 9800000,
    beds: 4,
    baths: 3.5,
    sqft: 3800,
    location: 'West Village, Manhattan',
    type: 'house',
    condition: 'Excellent',
    images: [IMAGES[3]],
    featured: true,
    description:
      "A rare freestanding carriage house on one of the West Village's most coveted cobblestone blocks, offering a scale and privacy almost impossible to find in Manhattan. Four floors include a double-height great room with a wood-burning fireplace, a chef's kitchen opening onto a landscaped garden courtyard, and a top-floor primary suite with a private terrace and skylights. A ground-level flex room with its own entrance works as a home office, studio, or guest suite. The property includes a private garage — vanishingly rare downtown — and sits equidistant from the Hudson River waterfront and the Village's best restaurants and jazz clubs."
  },
  {
    title: 'The Penthouse at Central Park',
    price: 18500000,
    beds: 4,
    baths: 5,
    sqft: 5200,
    location: 'Central Park South, Manhattan',
    type: 'penthouse',
    condition: 'Excellent',
    images: [IMAGES[0]],
    featured: true,
    description:
      "A full-floor penthouse with 360-degree views over Central Park, the Manhattan skyline, and both rivers — among the most dramatic vistas available anywhere in the city. Floor-to-ceiling windows wrap the entire residence, and a private wraparound terrace offers outdoor space on every exposure. The great room spans over 1,000 square feet alone, anchored by a fireplace and open to a chef's kitchen with a full suite of professional appliances. Four bedroom suites each have their own bath and custom closets, and the primary suite includes a private study and a spa bathroom with park views from the soaking tub. Full smart-home integration controls lighting, climate, shades, and security throughout. The building offers white-glove service: 24-hour doorman, concierge, private storage, and direct elevator access to the residence."
  }
]

// Runs on every start. Keeps the built-in demo catalog in sync with the list
// above WITHOUT touching anything users created:
//   - demo listings (no owner) are matched by title: updated if present, created if missing
//   - demo listings no longer in the list are removed (with their favorites/inquiries)
//   - listings that belong to a registered owner are never modified
module.exports = async function seed() {
  const titles = SEED_PROPERTIES.map((p) => p.title)
  let created = 0
  let updated = 0

  for (const data of SEED_PROPERTIES) {
    const existing = await prisma.property.findFirst({ where: { title: data.title, ownerId: null } })
    if (existing) {
      await prisma.property.update({ where: { id: existing.id }, data })
      updated++
    } else {
      await prisma.property.create({ data })
      created++
    }
  }

  const stale = await prisma.property.findMany({
    where: { ownerId: null, title: { notIn: titles } },
    select: { id: true }
  })
  if (stale.length) {
    const ids = stale.map((p) => p.id)
    await prisma.favorite.deleteMany({ where: { propertyId: { in: ids } } })
    await prisma.inquiry.deleteMany({ where: { propertyId: { in: ids } } })
    await prisma.property.deleteMany({ where: { id: { in: ids } } })
  }

  console.log(`Демо-каталог: создано ${created}, обновлено ${updated}, удалено устаревших ${stale.length}`)
}
