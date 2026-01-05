import React from 'react'   
import Hero from '../components/Hero'
import ProductDetails from '../components/ProductDetails'
import KitchenTowelDetails from '../components/KitchenTowelDetails'
import KitchenTissueDetails from '../components/KitchenTissueDetails'
import AboutSection from '../components/AboutSection'
import Highlights from '../components/Highlights'
import WhyChooseUs from '../components/WhyChooseUs'
import PopularProducts from '../components/PopularProducts'
import NewArrivals from '../components/NewArrivals'
import Clients from '../components/Clients'
const HomePage = () => {
  return (
    <div>
    
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
    
    </div>
  )
}

export default HomePage