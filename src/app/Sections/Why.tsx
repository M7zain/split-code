import React from 'react'
import { cardInfo } from '@/constants'
import Card from '../ui/Card'

const Why = () => {
  return (
    <section className='flex flex-col items-center py-16 lg:px-[15vw] mt-20 px-[10vw] md: px-0' id='About'>
        
        <h1 className='text-4xl lg:text-6xl  font-rb font-bold text-oliveGreen  '> 
            Why <span className='text-splitOrange'>Split Code </span> ? 
        </h1>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-9 gap-x-20 mt-10'>
        { 
          cardInfo.map((item) => ( 
            <Card key={item.id} imgURL={item.imgURL} title={item.title} description={item.description}/> 
          ))
        }
      </div>


    

  

</section>
  )
}

export default Why