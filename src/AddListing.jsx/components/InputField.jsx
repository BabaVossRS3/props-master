  import { Input } from '@/components/ui/input'
  import React from 'react'

  const InputField = ({item,handleInputChange,productInfo}) => {
    return (
      <div>
        <Input type={item?.fieldType} name={item?.name} required={item?.required} defaultValue={productInfo?.[item.name]}
            onChange={(e)=>handleInputChange(item.name,e.target.value)} //apothikeyei to text-content tou input
        />
      </div>
    )
  }

  export default InputField
