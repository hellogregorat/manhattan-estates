import { createSlice } from '@reduxjs/toolkit'

const MAX_COMPARE = 3

const compareSlice = createSlice({
  name: 'compare',
  initialState: { ids: [] },
  reducers: {
    toggleCompare: (state, action) => {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((i) => i !== id)
      } else if (state.ids.length < MAX_COMPARE) {
        state.ids.push(id)
      }
    },
    clearCompare: (state) => {
      state.ids = []
    }
  }
})

export const { toggleCompare, clearCompare } = compareSlice.actions
export default compareSlice.reducer
