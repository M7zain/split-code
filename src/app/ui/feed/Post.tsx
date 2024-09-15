'use client'
import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


const Post = ({date , title, position, description , difficulty} : { date : string , title : string , position : string, description : string ,difficulty: string}) => {
 
  const [like , setLike] = useState(false);
  
  return (
    <div className='bg-white hover:bg-slate-200 p-3 rounded-lg'>

    <div className='flex justify-between '>
    <div className='flex flex-col max-w-md text-balance'>
        <p className='font-rb text-gray-400 text-sm md:text-lg '>
           {date}
        </p>
        <h2 className='font-rb text-splitOrange text-lg md:text-xl '>{title}</h2>
        <p className='font-rb text-gray-400 text-sm md:text-lg '>{position}</p>
        <p className='font-rb text-oliveGreen  text-clip '>{description}</p>
    </div>

      <div className='flex flex-col items-center justify-around  '>
            <button onClick={() => setLike(!like)}>
              { 
                like ?
                <FaHeart className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]'/>
                :
                <CiHeart className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />

              }
            </button>
            <p className='font-rb text-oliveGreen font-bold'>{difficulty}</p>
        </div>

    
    </div>
    <hr className="h-px my-5 bg-oliveGreen border-0"/>

    </div>
  )
}

export default Post