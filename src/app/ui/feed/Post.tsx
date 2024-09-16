'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


const Post = ({date , title, position, description , difficulty , id } : { date : string , title : string , position : string, description : string ,difficulty: string , id: string }) => {
 
  const [like , setLike] = useState(false);



  function timeAgo(timestamp: string): string {
    const postDate = new Date(timestamp);
    const now = new Date();
    
    const secondsAgo = Math.floor((now.getTime() - postDate.getTime()) / 1000); // difference in seconds
  
    if (secondsAgo < 60) {
      return `${secondsAgo}s ago`; // Less than 1 minute ago
    }
  
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo}min ago`; // Less than 1 hour ago
    }
  
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo}h ago`; // Less than 1 day ago
    }
  
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo}d ago`; // Less than 1 week ago
    }
  
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo}w ago`; // Less than 1 month ago
    }
  
    const monthsAgo = Math.floor(weeksAgo / 4.35); // Approximate month duration
    if (monthsAgo < 12) {
      return `${monthsAgo}mo ago`; // Less than 1 year ago
    }
  
    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo}y ago`; // More than 1 year ago
  }
  
  
  return (

    <div className='bg-white hover:bg-slate-200 p-3 rounded-lg'>

    <div className='flex justify-between '>
    <div className='flex flex-col max-w-md text-balance'>
        <p className='font-rb text-gray-400 text-sm md:text-lg '>
           {timeAgo(date)}
        </p>

      <Link href={`/feed/${id}`}>
        <h2 className='font-rb text-splitOrange hover:underline text-lg md:text-xl '>{title}</h2>
      </Link>
      
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