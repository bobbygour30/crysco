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
import ProductDetails from './components/ProductDetails'
import KitchenTowelDetails from './components/KitchenTowelDetails'
import KitchenTissueDetails from './components/KitchenTissueDetails'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProductDetails />
      <KitchenTowelDetails />
      <KitchenTissueDetails />
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