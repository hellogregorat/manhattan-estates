export const NEIGHBORHOOD_COORDS = {
  Inwood: [40.8677, -73.9212],
  'Washington Heights': [40.8417, -73.9393],
  'East Village': [40.7265, -73.9815],
  'Greenwich Village': [40.7336, -74.0027],
  'Murray Hill': [40.748, -73.976],
  "Hell's Kitchen": [40.7638, -73.9918],
  'Lower East Side': [40.715, -73.9843],
  'Financial District': [40.7075, -74.0113],
  Harlem: [40.8116, -73.9465],
  'Midtown East': [40.7549, -73.9707],
  Chelsea: [40.7465, -74.0014],
  NoHo: [40.7264, -73.9932],
  'Flatiron District': [40.741, -73.9896],
  'Gramercy Park': [40.7368, -73.986],
  'Upper West Side': [40.787, -73.9754],
  'Upper East Side': [40.7736, -73.9566],
  Tribeca: [40.7163, -74.0086],
  SoHo: [40.7233, -74.003],
  'West Village': [40.7358, -74.0036],
  'Central Park South': [40.7659, -73.9776]
}

export function getNeighborhoodName(location) {
  return location.split(',')[0].trim()
}

// Deterministic small offset per property so multiple listings in the same
// neighborhood don't render on the exact same map pixel.
export function getCoordinates(property) {
  const base = NEIGHBORHOOD_COORDS[getNeighborhoodName(property.location)] || [40.7549, -73.984]
  const seed = property.id || 0
  const jitterLat = (((seed * 37) % 100) / 100) * 0.012 - 0.006
  const jitterLng = (((seed * 53) % 100) / 100) * 0.012 - 0.006
  return [base[0] + jitterLat, base[1] + jitterLng]
}

// A lightweight, transparent stand-in for a real automated valuation model —
// NOT a real appraisal. Averages $/sqft among other listings in the same
// neighborhood (falling back to all listings) and applies a small
// deterministic adjustment so the same property always shows the same number.
export function estimateValue(property, allProperties) {
  const neighborhood = getNeighborhoodName(property.location)
  const comparable = allProperties.filter(
    (p) => getNeighborhoodName(p.location) === neighborhood && p.id !== property.id
  )
  const pool = comparable.length ? comparable : allProperties.filter((p) => p.id !== property.id)
  if (!pool.length || !property.sqft) return null

  const avgPricePerSqft = pool.reduce((sum, p) => sum + p.price / (p.sqft || 1), 0) / pool.length
  const seed = property.id || 0
  const adjustment = 0.94 + (((seed * 13) % 100) / 100) * 0.12 // roughly -6% to +6%, deterministic
  return Math.round((avgPricePerSqft * property.sqft * adjustment) / 1000) * 1000
}

// Generates a plausible-looking price trend ending at the current listing
// price. Illustrative only — there is no real transaction history behind it.
export function generatePriceHistory(property) {
  const seed = property.id || 1
  const monthsAgoPoints = [12, 9, 6, 3, 0]
  const drift = 0.03 + ((seed * 7) % 10) / 100 // 3-13% total drift over the year

  return monthsAgoPoints.map((monthsAgo, i) => {
    const fraction = monthsAgo / 12
    const noise = (((seed * (i + 3)) % 7) - 3) / 100 // +/-3% wobble, deterministic
    const price = Math.round((property.price * (1 - drift * fraction + noise)) / 1000) * 1000
    const date = new Date()
    date.setMonth(date.getMonth() - monthsAgo)
    return { date, price }
  })
}
