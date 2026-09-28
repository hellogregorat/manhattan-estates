import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import propertiesReducer from './propertiesSlice'
import uiReducer from './uiSlice'
import savedSearchesReducer from './savedSearchesSlice'
import recentlyViewedReducer from './recentlyViewedSlice'
import compareReducer from './compareSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertiesReducer,
    ui: uiReducer,
    savedSearches: savedSearchesReducer,
    recentlyViewed: recentlyViewedReducer,
    compare: compareReducer
  }
})
