"use client"

import React from 'react'
import logo from '../../../public/logo.svg'
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const Navbar = () => {

  const [isOpen, setIsOpen ] = useState(false);

  
  return (
    <>
  {/* Desktop Nav */}
    <nav className=' hidden md:flex justify-between md:items-center p-10 md:mx-[15vw] '>
           <Image src={logo} alt='company logo' className='w-40'/>
        
            <div className={` hidden lg:flex justify-evenly w-full text-2xl font-rb font-bold text-oliveGreen`} >
             <Link href="#home">Home</Link>
             <Link href="#About">About</Link>
             <Link href="#How">How it works</Link>
           </div>
            

           <Button buttonType={"Sign Up"}/>
           <Button buttonType={"Login"}/>
        


    </nav>


    {/* mobile Nav */}
    <nav className=' flex flex-col md:hidden p-7 bg-white drop-shadow-lg  rounded-b-2xl fixed  top-0 left-0 right-0 '>
           

            <div className='flex justify-between '>
              <Image src={logo} alt='company logo' className='w-32'/>
              <button onClick={() => setIsOpen(!isOpen)}> 
                 {
                  isOpen ? <IoClose size={50}/> : <FiMenu size={50} />
                 }
              </button>
            </div>

            <div className={`${isOpen? "max-h-[300px] opacity-100 " : "max-h-0 opacity-0 "} transition-all ease-in duration-300   flex flex-col items-center justify-evenly w-full text-2xl font-rb font-bold text-oliveGreen overflow-hidden`}
             style={{ transitionProperty: "max-height, opacity" }} >
             <Link href="#home">Home</Link>
             <Link href="#About">About</Link>
             <Link href="#How">How it works</Link>
           </div>

           

    </nav>


    </>
  )
}

export default Navbar