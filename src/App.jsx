import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeMenu } from './store/uiSlice'
import { fetchFavorites } from './store/propertiesSlice'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollManager from './components/ScrollManager'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ListProperty from './pages/ListProperty'
import EditProperty from './pages/EditProperty'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  // Load which properties are favorited as soon as we know the user is logged
  // in, not only when they open their profile — otherwise hearts appear
  // "unfavorited" after any reload even though the favorite is saved server-side.
  useEffect(() => {
    if (token) dispatch(fetchFavorites())
  }, [dispatch, token])

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-property"
          element={
            <ProtectedRoute role="owner">
              <ListProperty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/property/:id/edit"
          element={
            <ProtectedRoute role="owner">
              <EditProperty />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
