'use client'
import React, { useEffect } from 'react'
import logo from '../../../../public/logo.svg'
import userImage from '../../../../public/user.png'
import Image from 'next/image'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { CiCirclePlus } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { FaHome,FaSearch } from "react-icons/fa";




const SideNav = () => {

    const {isLoaded ,user} = useUser(); 
    const imgUrl = user?.imageUrl  || userImage; 

    if(!isLoaded){ 
        return null;
    }


  return (
    <>
   {/* desktop sidebar */}
    <div className='hidden mt-14 md:flex md:flex-col'>
        <Image src={logo} alt="Split code logo" width={150}/>

        <div className='w-full flex items-center bg-slate-200 rounded-xl mt-24 drop-shadow-xl p-4'> 
                    
                    <div className='relative overflow-hidden bg-black w-16 h-16 rounded-full'>
                         <Image src={imgUrl}  alt="user image" objectFit='cover' fill={true} />
                    </div>
                    
                    <div>
                        <p className='font-rb text-splitOrange font-normal ml-5'>{user?.fullName}</p>
                    </div>

           
        </div>

        <div className='flex flex-col w-full bg-slate-200 rounded-xl mt-10 drop-shadow-xl p-4 '> 

                <button className='bg-splitOrange text-white font-rb text-xl rounded-lg p-3 flex flex-row justify-center items-center '>
                    <CiCirclePlus size={30} className='mr-5'/>
                    Add a Split
                </button>

                <div className='font-rb text-xl mt-4'>
                    
                    <SignOutButton/>
                    <hr className="h-px my-3 bg-gray-400 border-0"/>
                    <p>
                    My Splits
                    </p>
                    <hr className="h-px my-3 bg-gray-400 border-0"/>
                    <p>
                        Preferences
                    </p>
                    <hr className="h-px my-3 bg-gray-400 border-0"/>
                    <p>
                    Contribute to projects
                    </p>
                </div>
        </div>
    </div>

{/* mobile bottom nav */}
<div className='flex md:hidden flex-row justify-between items-center p-5 bg-slate-200 drop-shadow-2xl rounded-t-3xl fixed bottom-0 left-0 right-0 z-20'>

  <FaHome className='text-[#FB8500] sm:text-[35px] md:text-[45px] lg:text-[55px]' />

  <FaSearch className='text-[#FB8500] sm:text-[35px] md:text-[40px] lg:text-[50px]' />

  <button className='bg-splitOrange text-white font-rb text-xl rounded-xl p-3 flex flex-row justify-center items-center'>
    <CiCirclePlus className='sm:text-[35px] md:text-[45px] lg:text-[55px]' />
  </button>

  <IoIosSettings className='text-[#FB8500] sm:text-[35px] md:text-[45px] lg:text-[55px]' />

  <div className='relative overflow-hidden bg-black sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full'>
    <Image src={imgUrl} alt="user image" objectFit='cover' fill={true} />
  </div>

</div>


    </>
  )
}

export default SideNav