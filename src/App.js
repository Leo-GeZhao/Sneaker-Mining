import React from 'react'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Search from './components/Search/Search'
import Sneaker from './components/Sneaker/Sneaker'

const App = () => {
  return (
    <>
        <Header/>
        <main>
            <Search/>
            <Sneaker/>
        </main>
        <Footer/>
    </>
    
  )
}

export default App
