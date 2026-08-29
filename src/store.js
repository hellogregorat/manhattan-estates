import { configureStore, createSlice } from '@reduxjs/toolkit'

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    items: [
      {
        id: 1,
        title: 'The Penthouse at Central Park',
        price: 18500000,
        beds: 4,
        baths: 5,
        sqft: 5200,
        location: 'Central Park South, Manhattan',
        type: 'penthouse',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        featured: true,
        description: 'Breathtaking full-floor penthouse with 360° views of Central Park. Floor-to-ceiling windows, private terrace, and smart home integration.'
      },
      {
        id: 2,
        title: 'Tribeca Loft Residence',
        price: 4200000,
        beds: 2,
        baths: 2.5,
        sqft: 2800,
        location: 'Tribeca, Manhattan',
        type: 'loft',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        featured: true,
        description: 'Authentic artist loft with 14-foot ceilings, original cast-iron columns, and massive industrial windows overlooking cobblestone streets.'
      },
      {
        id: 3,
        title: 'Upper East Side Classic',
        price: 8750000,
        beds: 3,
        baths: 3,
        sqft: 3400,
        location: 'Upper East Side, Manhattan',
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        featured: false,
        description: 'Pre-war elegance meets modern luxury. Herringbone floors, marble fireplaces, and a chef\'s kitchen with Gaggenau appliances.'
      },
      {
        id: 4,
        title: 'Brooklyn Heights Townhouse',
        price: 12500000,
        beds: 5,
        baths: 4.5,
        sqft: 6100,
        location: 'Brooklyn Heights, Brooklyn',
        type: 'townhouse',
        image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
        featured: true,
        description: 'Landmark Greek Revival townhouse with restored original details, English garden, and carriage house.'
      },
      {
        id: 5,
        title: 'SoHo Designer Duplex',
        price: 6800000,
        beds: 3,
        baths: 3,
        sqft: 3100,
        location: 'SoHo, Manhattan',
        type: 'duplex',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        featured: false,
        description: 'Architect-designed duplex in a boutique condo. Floating staircase, custom Italian kitchen, and private elevator access.'
      },
      {
        id: 6,
        title: 'Williamsburg Waterfront',
        price: 3200000,
        beds: 2,
        baths: 2,
        sqft: 1900,
        location: 'Williamsburg, Brooklyn',
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
        featured: false,
        description: 'Floor-to-ceiling glass walls frame stunning East River views. Building amenities include rooftop pool and private cinema.'
      }
    ],
    filters: {
      type: 'all',
      priceRange: 'all',
      search: ''
    },
    selectedProperty: null,
    favorites: [],
    menuOpen: false
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    selectProperty: (state, action) => {
      state.selectedProperty = action.payload
    },
    closeModal: (state) => {
      state.selectedProperty = null
    },
    toggleFavorite: (state, action) => {
      const id = action.payload
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id)
      } else {
        state.favorites.push(id)
      }
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
    closeMenu: (state) => {
      state.menuOpen = false
    }
  }
})

export const { setFilter, selectProperty, closeModal, toggleFavorite, toggleMenu, closeMenu } = propertiesSlice.actions

export const store = configureStore({
  reducer: {
    properties: propertiesSlice.reducer
  }
})
