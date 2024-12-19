import React from 'react'
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { GiBuyCard } from "react-icons/gi";
import { FaEuroSign } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { SiMaterialformkdocs } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";


const iconMap={
    MdOutlineFeaturedPlayList:<MdOutlineFeaturedPlayList />,
    GiBuyCard:<GiBuyCard />,
    FaEuroSign:<FaEuroSign />,
    MdOutlineCategory:<MdOutlineCategory />,
    AiOutlineSafetyCertificate:<AiOutlineSafetyCertificate />,
    MdDateRange:<MdDateRange />,
    HiOutlineClipboardDocumentList:<HiOutlineClipboardDocumentList />,
    SiMaterialformkdocs:<SiMaterialformkdocs />,
    IoIosColorPalette:<IoIosColorPalette />,
    TbFileDescription:<TbFileDescription />,
    IoPersonOutline:<IoPersonOutline />,
    FaPhone:<FaPhone />,
    IoLocation:<IoLocation />
}

const IconField = ({icon}) => {
  return (
    <div className='text-orange-500 bg-orange-100 p-1.5 rounded-full align-middle'>
      {iconMap[icon]}
    </div>
  )
}

export default IconField
