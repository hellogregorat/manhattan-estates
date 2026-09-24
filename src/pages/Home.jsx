import React from 'react'
import Hero from '../components/Hero'
import Filters from '../components/Filters'
import PropertyList from '../components/PropertyList'

export default function Home() {
  return (
    <>
      <Hero />
      <Filters />
      <PropertyList />
    </>
  )
}
