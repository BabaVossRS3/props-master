import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import logo from '@/assets/PROPS_logo-black.png';

const Header = () => {

    const {user, isSignedIn} = useUser();

  return (
    <div className='flex justify-around items-center shadow-sm p-5'>
      <Link to={'/'}>     
        <img src={logo} alt="PropsMaster" width={250} height={100} />
      </Link>

      <ul className=' hidden md:flex gap-12'>
        <Link to={'/'}>
          <li className='menu-li font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Αρχική</li>
        </Link>
        <Link to={'/search'}>
          <li className='menu-li font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Αναζήτηση</li>
        </Link>
        <Link to={'/listings'}>
          <li className='menu-li font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Αγγελίες</li>
        </Link>
        <Link to={'/about'}>
          <li className='menu-li font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Σχετικά Με Εμάς</li>
        </Link>
        <Link to={'/contact'}>
          <li className='menu-li font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Επικοινωνία</li>
        </Link>
      </ul>

        {isSignedIn?
            <div className='flex items-center gap-5'>
                <UserButton/>
                <Link to={'/addListing'}>
                  <Button className=''>Νέα Καταχώρηση</Button>
                </Link>
            </div>
            :      
            <Link to={'/addListing'}>
              <Button>Νέα Καταχώρηση</Button>
            </Link>


        }

    </div>
  )
}

export default Header
