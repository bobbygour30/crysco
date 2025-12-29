import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Highlights from './components/Highlights'
import PopularProducts from './components/PopularProducts'
import NewArrivals from './components/NewArrivals'
import Clients from './components/Clients'
import Footer from './components/Footer'
import WhyChooseUs from './components/WhyChooseUs'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
      <Highlights />
      <WhyChooseUs />
      <PopularProducts />
      <NewArrivals />
      <Clients />
      <Footer />
    </div>
  )
}

export default App