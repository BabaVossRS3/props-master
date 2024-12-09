  import { Input } from '@/components/ui/input'
  import React from 'react'

  const InputField = ({item,handleInputChange}) => {
    return (
      <div>
        <Input type={item?.fieldType} name={item?.name} required={item?.required}
            onChange={(e)=>handleInputChange(item.name,e.target.value)} //apothikeyei to text-content tou input
        />
      </div>
    )
  }

  export default InputField