import { createSlice } from '@reduxjs/toolkit'

const MAX_ITEMS = 8

function load() {
  try {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
  } catch {
    return []
  }
}

function persist(list) {
  localStorage.setItem('recentlyViewed', JSON.stringify(list))
}

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState: { items: load() },
  reducers: {
    addRecentlyViewed: (state, action) => {
      const property = action.payload
      const entry = {
        id: property.id,
        title: property.title,
        price: property.price,
        image: property.images?.[0],
        location: property.location
      }
      state.items = [entry, ...state.items.filter((p) => p.id !== property.id)].slice(0, MAX_ITEMS)
      persist(state.items)
    }
  }
})

export const { addRecentlyViewed } = recentlyViewedSlice.actions
export default recentlyViewedSlice.reducer
