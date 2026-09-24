import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { menuOpen: false },
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen
    },
    closeMenu: (state) => {
      state.menuOpen = false
    }
  }
})

export const { toggleMenu, closeMenu } = uiSlice.actions
export default uiSlice.reducer
