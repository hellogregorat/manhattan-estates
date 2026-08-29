import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, closeMenu } from './store'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Filters from './components/Filters'
import PropertyList from './components/PropertyList'
import PropertyModal from './components/PropertyModal'
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch()
  const selectedProperty = useSelector(state => state.properties.selectedProperty)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') dispatch(closeModal())
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [dispatch])

  return (
    <div onClick={() => dispatch(closeMenu())}>
      <Navbar />
      <Hero />
      <Filters />
      <PropertyList />
      <Footer />
      {selectedProperty && <PropertyModal />}
    </div>
  )
}

export default App
