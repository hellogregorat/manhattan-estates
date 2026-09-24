import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

export const fetchProperties = createAsyncThunk('properties/fetchAll', async () => {
  return await api.get('/properties')
})

export const fetchPropertyById = createAsyncThunk('properties/fetchOne', async (id) => {
  return await api.get(`/properties/${id}`)
})

export const createProperty = createAsyncThunk('properties/create', async (formData, { rejectWithValue }) => {
  try {
    return await api.postForm('/properties', formData)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchMyListings = createAsyncThunk('properties/mine', async () => {
  return await api.get('/properties/mine')
})

export const fetchFavorites = createAsyncThunk('properties/favorites', async () => {
  return await api.get('/properties/favorites/mine')
})

export const toggleFavorite = createAsyncThunk('properties/toggleFavorite', async (id) => {
  const res = await api.post(`/properties/${id}/favorite`, {})
  return { id, favorited: res.favorited }
})

export const sendInquiry = createAsyncThunk('properties/inquire', async ({ id, message }) => {
  return await api.post(`/properties/${id}/inquire`, { message })
})

export const fetchMyInquiries = createAsyncThunk('properties/mineInquiries', async () => {
  return await api.get('/properties/mine/inquiries')
})

export const updateProperty = createAsyncThunk('properties/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    return await api.putForm(`/properties/${id}`, formData)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const deleteProperty = createAsyncThunk('properties/delete', async (id, { rejectWithValue }) => {
  try {
    await api.del(`/properties/${id}`)
    return id
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    current: null,
    myListings: [],
    favorites: [],
    favoriteIds: [],
    inquiries: [],
    filters: { type: 'all', priceRange: 'all', beds: 'all', neighborhood: 'all', sort: 'newest', search: '' },
    status: 'idle',
    error: null
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.current = action.payload
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.myListings = action.payload
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload
        state.favoriteIds = action.payload.map((p) => p.id)
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { id, favorited } = action.payload
        if (favorited) {
          if (!state.favoriteIds.includes(id)) state.favoriteIds.push(id)
        } else {
          state.favoriteIds = state.favoriteIds.filter((f) => f !== id)
          state.favorites = state.favorites.filter((f) => f.id !== id)
        }
      })
      .addCase(fetchMyInquiries.fulfilled, (state, action) => {
        state.inquiries = action.payload
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.myListings.push(action.payload)
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const updated = action.payload
        state.items = state.items.map((p) => (p.id === updated.id ? updated : p))
        state.myListings = state.myListings.map((p) => (p.id === updated.id ? updated : p))
        if (state.current?.id === updated.id) state.current = updated
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const id = action.payload
        state.items = state.items.filter((p) => p.id !== id)
        state.myListings = state.myListings.filter((p) => p.id !== id)
      })
  }
})

export const { setFilter } = propertiesSlice.actions
export default propertiesSlice.reducer
