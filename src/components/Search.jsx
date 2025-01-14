import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BsSearch } from "react-icons/bs";
import { CategoriesList, PriceSell } from '@/Shared/Data';
import { Link } from 'react-router-dom';

const Search = () => {
  const [category, setCategory] = useState();
  const [typeoflist, setTypeOfList] = useState();
  const [price, setPrice] = useState();

  // Generate query string based on selected values
  const generateSearchParams = () => {
    let searchParams = [];

    if (category) {
      searchParams.push(`category=${encodeURIComponent(category)}`);
    }

    if (typeoflist) {
      searchParams.push(`typeoflist=${encodeURIComponent(typeoflist)}`);
    }

    if (price) {
      searchParams.push(`price=${encodeURIComponent(price)}`);
    }

    return searchParams.join('&');
  };

  return (
    <div className="w-full p-5 md:w-[60%]">
      <div className=" bg-white bg-opacity-90 rounded-sm sm:rounded-md flex flex-col md:flex-row gap-4 md:gap-6 p-5 md:p-5 items-center justify-between">
        {/* Category Selector */}
        <div className="w-full md:w-auto">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
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
        </div>

        <Separator orientation="vertical" className="hidden md:block" />

        {/* Type of Listing Selector */}
        <div className="w-full md:w-auto">
          <Select onValueChange={(value) => setTypeOfList(value)}>
            <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
              <SelectValue placeholder="Αγορά/Ενοικίαση" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Αγορά">Αγορά</SelectItem>
              <SelectItem value="Ενοικίαση">Ενοικίαση</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="hidden md:block" />

        {/* Price Selector */}
        <div className="w-full md:w-auto">
          <Select onValueChange={(value) => setPrice(value)}>
            <SelectTrigger className="outline-none md:border-none w-full shadow-none text-lg">
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
        </div>

        {/* Search Button for Small Screens */}
        <Link to={`/search?${generateSearchParams()}`} className="w-full md:hidden">
          <button className="bg-primary text-white w-full py-3 rounded-md text-lg font-medium hover:scale-105 transition-all">
            Αναζήτηση
          </button>
        </Link>

        {/* Search Icon for Large Screens */}
        <Link to={`/search?${generateSearchParams()}`} className="hidden md:flex md:justify-end md:w-[10%]">
          <BsSearch className="text-[40px] cursor-pointer bg-primary rounded-full p-3 text-white searchIcon hover:scale-105 transition-all w-full" />
        </Link>
      </div>
    </div>
  );
};

export default Search;