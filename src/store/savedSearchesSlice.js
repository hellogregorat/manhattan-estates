import { createSlice } from '@reduxjs/toolkit'

function load() {
  try {
    return JSON.parse(localStorage.getItem('savedSearches') || '[]')
  } catch {
    return []
  }
}

function persist(list) {
  localStorage.setItem('savedSearches', JSON.stringify(list))
}

const savedSearchesSlice = createSlice({
  name: 'savedSearches',
  initialState: { items: load() },
  reducers: {
    addSavedSearch: (state, action) => {
      const entry = { id: Date.now(), name: action.payload.name, filters: action.payload.filters }
      state.items.unshift(entry)
      persist(state.items)
    },
    removeSavedSearch: (state, action) => {
      state.items = state.items.filter((s) => s.id !== action.payload)
      persist(state.items)
    }
  }
})

export const { addSavedSearch, removeSavedSearch } = savedSearchesSlice.actions
export default savedSearchesSlice.reducer
