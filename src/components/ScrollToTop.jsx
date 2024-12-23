import React from 'react';
import { Button } from './ui/button';
import { FaArrowCircleUp } from "react-icons/fa";


function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scroll smooth
    });
  };

  return (
    <button className='fixed right-4 bottom-4 text-white rounded-full text-xl'>    
        <FaArrowCircleUp />
    </button>
  );
}

export default ScrollToTopButton;
