import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import propertiesReducer from './propertiesSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertiesReducer,
    ui: uiReducer
  }
})
