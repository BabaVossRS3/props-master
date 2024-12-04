import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Separator } from "@/components/ui/separator"
  import { BsSearch } from "react-icons/bs";


const Search = () => {
  return (
    <div className='searchBar p-2 md:p-5 bg-white rounded-md flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
        <Select>
            <SelectTrigger  className='outline-none md:border-none w-full shadow-none text-lg'>
                <SelectValue placeholder="Κατηγορία" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>
        <Separator orientation='vertical' className='hidden md:block' />
        <Select>
            <SelectTrigger  className='outline-none md:border-none w-full shadow-none text-lg'>
                <SelectValue placeholder=" Αγορά/Ενοικίαση" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">Αγορά</SelectItem>
                <SelectItem value="dark">Ενοικίαση</SelectItem>
            </SelectContent>
        </Select>
        <Separator orientation='vertical' className='hidden md:block' />
        <Select>
            <SelectTrigger  className='outline-none md:border-none w-full shadow-none text-lg'>
                <SelectValue placeholder="Τιμή" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">0€ - 50€</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>
        <div className="">
            <BsSearch className='text-[40px] cursor-pointer bg-primary rounded-full p-3 color-white searchIcon hover:scale-105 transition-all'/>
        </div>

    </div>
  )
}

export default Search
