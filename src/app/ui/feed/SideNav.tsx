'use client'
import React, { useEffect } from 'react'
import logo from '../../../../public/logo.svg'
import userImage from '../../../../public/user.png'
import Image from 'next/image'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { CiCirclePlus , CiSearch ,CiHome ,CiSettings  } from "react-icons/ci";




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
<div className=' md:hidden  justify-evenly items-center p-3 bg-slate-200 drop-shadow-2xl rounded-t-3xl fixed bottom-0 left-0 right-0 z-20'>

  <div className='flex justify-evenly items-center w-full flex-row space-x-5 '>

  <CiHome  className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />

  <CiSearch  className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />

  <button className='bg-splitOrange text-white font-rb text-xl rounded-xl p-2 flex flex-row justify-center items-center'>
    <CiCirclePlus className='text-[35px] sm:text-[45px] md:text-[50px]' />
  </button>

  <CiSettings  className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />

  {/* <div className='relative bg-black w-[35px] h-[35px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden'>
    <Image src={imgUrl} alt="user image" layout="fill" objectFit="cover" />
  </div> */}

  <UserButton/>


  </div>
</div>


    </>
  )
}

export default SideNav