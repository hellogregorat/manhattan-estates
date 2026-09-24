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
    description: 'Bright one-bedroom steps from Inwood Hill Park, with new appliances and views over the treeline — a great entry point onto the island.'
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
    description: 'Sun-drenched two-bedroom with partial Hudson River views, in a well-maintained prewar elevator building.'
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
    description: 'Character-filled walk-up flat on a quiet tree-lined block, exposed brick, updated kitchen, moments from Tompkins Square Park.'
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
    description: 'Ground-floor studio with a private garden patio on one of the Village\'s most storied blocks.'
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
    description: 'Corner two-bedroom with oversized windows on three exposures, in a full-service doorman building.'
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
    description: 'High-floor loft with open-plan living, floor-to-ceiling windows, and skyline views toward the Hudson.'
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
    description: 'New-construction two-bedroom with a private balcony, in-unit washer/dryer, and a rooftop lounge.'
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
    description: 'High-floor residence with sweeping harbor and skyline views, full-service building with pool and spa.'
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
    description: 'Landmark brownstone shell with original details intact — a rare opportunity for a full custom restoration.'
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
    description: 'High-floor two-bedroom moments from Grand Central, floor-to-ceiling windows and a 24-hour doorman.'
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
    description: 'Converted 1913 warehouse condo with soaring ceilings, oversized windows, and a private landscaped roof deck.'
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
    description: 'Classic cast-iron loft with 12-foot ceilings and oversized windows on a cobblestone NoHo block.'
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
    description: 'Full-floor loft conversion in a landmark building, exposed beams and a chef\'s kitchen island.'
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
    description: 'Rare key-access to Gramercy Park. Fully renovated with custom millwork and a wood-burning fireplace.'
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
    description: 'Classic seven overlooking a tree-lined street near Riverside Park, with formal dining room and windowed kitchen.'
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
    description: "Pre-war elegance meets modern luxury. Herringbone floors, marble fireplaces, and a chef's kitchen with Gaggenau appliances."
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
    description: 'Authentic artist loft with 14-foot ceilings, original cast-iron columns, and massive industrial windows overlooking cobblestone streets.'
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
    description: 'Architect-designed duplex in a boutique condo. Floating staircase, custom Italian kitchen, and private elevator access.'
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
    description: 'Rare freestanding carriage house on a cobblestone block, with a private garage and a landscaped garden courtyard.'
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
    description: 'Breathtaking full-floor penthouse with 360° views of Central Park. Floor-to-ceiling windows, private terrace, and smart home integration.'
  }
]

module.exports = async function seed() {
  const count = await prisma.property.count()
  if (count === 0) {
    await prisma.property.createMany({ data: SEED_PROPERTIES })
    console.log(`Добавлено ${SEED_PROPERTIES.length} демонстрационных объектов`)
  }
}
