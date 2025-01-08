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

import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"



const TextAreaField = ({ plan, item, handleInputChange, productInfo }) => {
  const { toast } = useToast();
  const [value, setValue] = useState(productInfo?.[item.name] || "");

  // Set the maxLength based on the plan
  let maxLength = 350; // Default for Boost
  if (plan === "Basic") {
    maxLength = 150;
  }else if(plan === "Boost+"){
    maxLength = 1000;
  }

  // Handle input change and character limit validation
  const handleChange = (e) => {
    const newValue = e.target.value;

    // If the new value is empty, set the description to the default message
    if (newValue.trim() === "") {
      setValue("Ο Πωλητής δεν πρόσθεσε κάποια περιγραφή");
      handleInputChange(item.name, "Ο Πωλητής δεν πρόσθεσε κάποια περιγραφή");
    } else if (newValue.length <= maxLength) {
      setValue(newValue);
      handleInputChange(item.name, newValue); // Pass the updated value to the parent handler
    } else {
      // Show toast notification if the character limit is exceeded
      toast({
        variant: "destructive",
        title: `Όριο Χαρακτήρων ${maxLength}.`,
        description: `Η περιγραφή σας ξεπέρασε το όριο χαρακτήρων. Μπορείτε να καταχωρίσετε έως ${maxLength} χαρακτήρες.`,
      });
    }
  };

  return (
    <div>
      <Textarea
        onChange={handleChange}
        value={value}
        defaultValue={productInfo?.[item.name]}
        maxLength={maxLength} // This ensures the user can't type more than the maxLength
        placeholder="Γράψτε μια περιγραφή για το προϊόν..." // Optional: you can adjust the placeholder
      />
      <div className="text-right text-sm text-gray-500">
        {value.length}/{maxLength} χαρακτήρες
      </div>
    </div>
  );
};

export default TextAreaField;