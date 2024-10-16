import React from 'react'
import { CiSaveDown2 } from "react-icons/ci";

const NoPosts = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full space-y-5'>
        <p className='text-lg md:text-2xl font-rb text-oliveGreen '>No saved Splits yet!</p>
        <CiSaveDown2 className='text-splitOrange text-[55px] sm:text-[70px] md:text-[100px]'/>

    </div>
  )
}

export default NoPosts