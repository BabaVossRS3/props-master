import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const DropdownField= ({item,handleInputChange,productInfo}) => {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item?.required}
        defaultValue={productInfo?.[item?.name]}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={productInfo?.[item?.name] || item?.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  
}

export default DropdownField
