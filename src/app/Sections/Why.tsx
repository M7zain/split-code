import React from 'react'
import { cardInfo } from '@/constants'
import Card from '../ui/Card'

const Why = () => {
  return (
    <section className='flex flex-col    items-center    py-16 lg:px-[15vw] mt-20' id='About'>
        
        <h1 className='text-4xl lg:text-6xl  font-rb font-bold text-oliveGreen  '> 
            Why <span className='text-splitOrange'>Split Code </span> ? 
        </h1>

        { 

          cardInfo.map((item) => ( 
            <Card imgURL={item.imgURL} title={item.title} description={item.description}/> 
          ))
        }

    

  

</section>
  )
}

export default Why