import React from 'react';
import { FaArrowCircleUp } from "react-icons/fa";

function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scroll smooth
    });
  };

  return (
    <button
      onClick={handleScrollToTop} // Add the click handler
      className='fixed right-4 bottom-4 text-white rounded-full text-xl bg-orange-400 p-3 shadow-md hover:scale-110 transition-all' // Add some styling
    >
      <FaArrowCircleUp />
    </button>
  );
}

export default ScrollToTopButton;
