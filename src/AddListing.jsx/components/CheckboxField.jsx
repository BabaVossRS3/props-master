import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const CheckboxField = ({ item, handleInputChange, productInfo }) => {
  return (
    <div className="">
        <Checkbox
            type={item?.fieldType}
            name={item?.name}
            required={item?.required}
            defaultChecked={productInfo?.[item.name]}  // Use 'defaultChecked' for checkbox
            onChange={(e) => handleInputChange(item.name, e.target.checked)} // Updated to handle boolean value
            className="custom-checkbox"  // Add the custom class
        />
    </div>
  );
}

export default CheckboxField;
