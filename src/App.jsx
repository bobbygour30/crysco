import React from 'react'
import Navbar from './components/Navbar'

import Footer from './components/Footer'

import { Routes , Route} from 'react-router-dom'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<TermsAndConditions />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App