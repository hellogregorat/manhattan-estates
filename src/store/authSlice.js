import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

const savedUser = JSON.parse(localStorage.getItem('user') || 'null')
const savedToken = localStorage.getItem('token') || null

export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await api.post('/auth/register', payload)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await api.post('/auth/login', payload)
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    token: savedToken,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => [registerUser.fulfilled.type, loginUser.fulfilled.type].includes(action.type),
        (state, action) => {
          state.user = action.payload.user
          state.token = action.payload.token
          state.status = 'succeeded'
          state.error = null
          localStorage.setItem('token', action.payload.token)
          localStorage.setItem('user', JSON.stringify(action.payload.user))
        }
      )
      .addMatcher(
        (action) => [registerUser.rejected.type, loginUser.rejected.type].includes(action.type),
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload || 'Ошибка авторизации'
        }
      )
      .addMatcher(
        (action) => [registerUser.pending.type, loginUser.pending.type].includes(action.type),
        (state) => {
          state.status = 'loading'
          state.error = null
        }
      )
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
