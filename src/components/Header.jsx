import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';

const Header = () => {

    const {user, isSignedIn} = useUser();

  return (
    <div className='flex justify-around items-center shadow-sm p-5'>
      <img src="src/assets/PROPS_logo-black.png" alt="PropsMaster" width={250} height={100} />

      <ul className=' hidden md:flex gap-12'>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Αρχική</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Αναζήτηση</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Προΐοντα</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Σχετικά Με Εμάς</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Επικοινωνία</li>
      </ul>

        {isSignedIn?
            <div className='flex items-center gap-5'>
                <UserButton/>
                <Button>Νέα Καταχώρηση</Button>
            </div>
            :      
            <Button>Νέα Καταχώρηση</Button>


        }

    </div>
  )
}

export default Header
