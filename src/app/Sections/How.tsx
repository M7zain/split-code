import React from 'react';
import { TracingBeam } from '../ui/tracing-beam';
import Image from 'next/image';
import { howLeft, howRight } from '@/constants';

const How = () => {
  return (
    <section className='flex flex-col items-center justify-center p-10 md:p-20 w-screen' id='How'>
      <h1 className='text-2xl md:text-4xl lg:text-6xl text-center font-rb font-bold text-oliveGreen'> 
        How <span className='text-splitOrange'>Split Code</span> Works?
      </h1>   

      <div className='flex flex-row justify-center items-center mt-10 md:mt-20 w-full'>
        
        {/* Left side */}
        <div className='flex flex-col items-end w-full md:w-1/2 '>
          {howLeft.map((item) => (
            <div key={item.id} className='flex flex-col items-end mb-10 md:mb-20'>
              <Image src={item.imgURL} alt={`${item.title} image`} className='w-36 h-36 md:w-40 md:h-40' />
              
              <div className='flex flex-col items-end my-10 md:my-20'>
                {/* number of the step */}
                <div className='flex items-center justify-center bg-splitOrange p-1 rounded-full w-8 h-8 md:w-10 md:h-10'>
                  <p className='text-white text-center'>
                    {item.id}
                  </p>
                </div>
                
                {/* title  */}
                <h3 className='font-rb text-lg font-bold text-right mt-3'>
                  {item.title}
                </h3>

                {/* description */}
                <p className='font-rb text-sm text-right max-w-xs mt-3'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tracing Beam */}
        <div className=' md:flex w-auto justify-center'>
          <TracingBeam />
        </div>

        {/* Right side */}
        <div className='flex flex-col items-start w-full md:w-1/2 mt-10 md:mt-0'>
          {howRight.map((item) => (
            <div key={item.id} className='flex flex-col items-start mb-10 md:mb-20'>
              {/* number of the step */}
              <div className='flex items-center justify-center bg-splitOrange p-1 rounded-full w-8 h-8 md:w-10 md:h-10'>
                <p className='text-white text-center'>
                  {item.id}
                </p>
              </div>

              {/* title  */}
              <h3 className='font-rb text-lg font-bold text-left mt-3'>
                {item.title}
              </h3>

              {/* description */}
              <p className='font-rb text-sm text-left max-w-xs mt-3'>
                {item.description}
              </p>

              <Image src={item.imgURL} alt={`${item.title} image`} className='w-36 h-36 md:w-40 md:h-40 my-10 md:my-20' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default How;
