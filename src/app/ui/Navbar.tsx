"use client"

import React, { useState } from 'react'
import logo from '../../../public/logo.svg'
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className='hidden md:flex justify-between items-center p-10 space-x-4 lg:mx-[15vw]'>
        <Image 
          src={logo} 
          alt='company logo' 
          className='w-40' 
          priority
        />

        <div className='hidden md:hidden lg:hidden 2xl:flex  justify-evenly w-full text-2xl font-rb font-bold text-oliveGreen'>
          <Link href="#home">Home</Link>
          <Link href="#About">About</Link>
          <Link href="#How">How it works</Link>
        </div>

        <div className='flex space-x-4'>
          <Button buttonType="Sign Up" />
          <Button buttonType="Login" />
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className='flex flex-col md:hidden p-5 bg-white drop-shadow-lg rounded-b-2xl fixed top-0 left-0 right-0'>
        <div className='flex justify-between'>
          <Image 
            src={logo} 
            alt='company logo' 
            className='w-28 md:w-32' 
            priority
          />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <IoClose size={35} /> : <FiMenu size={35} />}
          </button>
        </div>

        <div className={`${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"} transition-all ease-in-out duration-300 flex flex-col items-center justify-evenly w-full text-2xl font-rb font-bold text-oliveGreen overflow-hidden`}>
          <Link href="#home">Home</Link>
          <Link href="#About">About</Link>
          <Link href="#How">How it works</Link>

          <div className='flex space-x-4 mt-3'>
          <Button buttonType="Sign Up" className='w-32' />
          <Button buttonType="Login" className='w-32' />
        </div>
        
        </div>


      </nav>
    </>
  )
}

export default Navbar
