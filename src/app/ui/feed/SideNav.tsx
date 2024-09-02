'use client'
import React, { useEffect } from 'react'
import logo from '../../../../public/logo.svg'
import userImage from '../../../../public/user.png'
import Image from 'next/image'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { CiCirclePlus } from "react-icons/ci";
import { BiBold } from 'react-icons/bi'

const SideNav = () => {

    const {isLoaded ,user} = useUser(); 
    const imgUrl = user?.imageUrl  || userImage; 

    if(!isLoaded){ 
        return null;
    }


  return (
    <div className='mt-14 flex flex-col'>
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
  )
}

export default SideNav