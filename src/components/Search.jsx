import React from 'react'
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BsSearch } from "react-icons/bs";
import { CategoriesList, PriceSell} from '@/Shared/Data';
import { Link } from 'react-router-dom';


const Search = () => {
  // Exoume thema me thn kathgoriopoihsh sthn anazhthsh mesw search bar. Diavazei kanonika 
  // kai gurizei content apo database alla den filtrarei mesw category , filtrarei mono mesw
  // typeoflist . Ousiastika exoume ena filtrarisma alla oxi swsto .
  const [category,setCategory] = useState();
  const [typeoflist,setTypeOfList] = useState();
  const [price,setPrice] = useState();


  
  return (
    <div className='searchBar p-2 md:p-5 bg-white rounded-md flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
        
      <Select onValueChange={(value)=>setCategory(value)}>
          <SelectTrigger  className='outline-none md:border-none w-full shadow-none text-lg'>
              <SelectValue placeholder="Κατηγορία" />
          </SelectTrigger>
          <SelectContent>
            {CategoriesList.map((maker, index) => (
              <SelectItem key={`${maker.id}-${index}`} value={maker.name}>
                {maker.name}
              </SelectItem>
            ))}
          </SelectContent>
      </Select>

      <Separator orientation='vertical' className='hidden md:block' />

      <Select onValueChange={(value)=>setTypeOfList(value)}>
          <SelectTrigger  className='outline-none md:border-none w-full shadow-none text-lg'>
              <SelectValue placeholder=" Αγορά/Ενοικίαση" />
            </SelectTrigger>
          <SelectContent>
                <SelectItem value="Αγορά">Αγορά</SelectItem>
                <SelectItem value="Ενοικίαση">Ενοικίαση</SelectItem>
            </SelectContent>
      </Select>

      <Separator orientation='vertical' className='hidden md:block' />


      <Select onValueChange={(value)=>setPrice(value)}>
        <SelectTrigger className='outline-none md:border-none w-full shadow-none text-lg'>
          <SelectValue placeholder="Τιμή" />
        </SelectTrigger>
        <SelectContent>
          {PriceSell.map((maker, index) => (
            <SelectItem key={`${maker.id}-${index}`} value={maker.price}>
              {maker.price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Link to={`/search?category=${encodeURIComponent(category)}&typeoflist=${encodeURIComponent(typeoflist)}&price=${encodeURIComponent(price)}`}>
        <BsSearch className="text-[40px] cursor-pointer bg-primary rounded-full p-3 color-white searchIcon hover:scale-105 transition-all" />
      </Link>
    </div>
  )
}

export default Search


