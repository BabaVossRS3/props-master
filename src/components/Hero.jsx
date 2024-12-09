import Search from './Search'
import React from 'react'

const Hero = () => {
  return (
    <div className='HeroPage mb-16'>
      <div className="flex flex-col items-center p-10 py-20 gap-4 h-[400px] w-full ">
        <h2 className='hero-h2 text-lg text-[#F5F5DC]'>Ο Κόσμος των Αντίκων στα Χέρια σας</h2>
        <h2 className='hero-h2-2 text-[40px] text-[#F5F5DC] font-bold'> Βρείτε την Ιδανική Αντίκα</h2>
        
        <Search/>
      </div>
    </div>
  )
}

export default Hero
