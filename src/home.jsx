import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearched from './components/MostSearched'
import Footer from './components/Footer'

const Home = () => {
  return (
    <div>
      {/* {Header} */}
      <Header/>
      {/* { Hero } */}
      <Hero/>
      {/* { Κατηγοριες εικονιδιων κατω απο hero } */}
      <Category/>
      {/* most searched */}
      <MostSearched/>
      {/* {Footer} */}
      <Footer/>
    </div>
  )
}

export default Home
