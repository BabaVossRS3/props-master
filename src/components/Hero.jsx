import Search from './Search'
import React from 'react'

const Hero = () => {
  return (
    <div className='HeroPage'>
      <div className="flex flex-col items-center p-10 py-20 gap-6 h-[600px] w-full bg-[#D6C0B3]">
        <h2 className='hero-h2 text-lg'>Ο Κόσμος των Αντίκων στα Χέρια σας</h2>
        <h2 className='hero-h2-2 text-[40px] font-bold'> Βρείτε την Ιδανική Αντίκα</h2>
        
        <Search/>
      </div>
    </div>
  )
}

export default Hero
