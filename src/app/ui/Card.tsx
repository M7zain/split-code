'use client'
import React from 'react'
import Image from 'next/image'
import SpotlightCard from './spotlight';
const Card = ({ imgURL, title, description }: { imgURL: string; title: string; description: string }) => {
  return (
    // <div className="border-2 border-splitOrange rounded-xl my-10 p-5 max-w-96 h-60 shadow-lg">
    <SpotlightCard className="rounded-xl my-10  p-5 max-w-96 h-60 shadow-lg" spotlightColor="rgba(251, 133, 0, 1)">
      <div className="h-full flex flex-col justify-evenly ">
        <div>
          <Image 
                loading='lazy'
                src={imgURL} 
                alt={title} />
        </div>
        <div>
          <h4 className="text-lg font-bold font-rb">{title}</h4>
          <p className="text-sm text-gray-700 font-rb font-light">{description}</p>
        </div>
      </div>
      </SpotlightCard>
    // </div>
  )
}

export default Card
