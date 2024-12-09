// import React from 'react'
// import { Textarea } from "@/components/ui/textarea"

// const TextAreaField = (item,handleInputChange) => {
//   return (
//     <div>
//       <Textarea onChange={(e)=>handleInputChange(item.name,e.target.value)}required={item?.required}/>
//     </div>
//   )
// }

// export default TextAreaField

import React from 'react';
import { Textarea } from "@/components/ui/textarea";

const TextAreaField = ({ item, handleInputChange }) => { // Destructure the props
  return (
    <div>
      <Textarea 
        onChange={(e) => handleInputChange(item.name, e.target.value)} // Correctly pass values
        required={item?.required} 
      />
    </div>
  );
};

export default TextAreaField;
