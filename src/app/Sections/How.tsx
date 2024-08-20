import React from 'react'
import { TracingBeam } from '../ui/tracing-beam'
import Image from 'next/image'
import cloud from "../../../public/images/cloud.svg"

import { howLeft, howRight } from '@/constants'

const How = () => {
  return (
<section className='flex flex-col items-center justify-center px-[15vw] lg:px-[30vw]  mt-20 ' id='How'>
        <h1 className='text-4xl lg:text-6xl  font-rb font-bold text-oliveGreen  '> 
          How Split Code Works? 
        </h1>

        <div className='flex  mt-20'>
                
                {/* Left side */}
                <div >
                  {
                    howLeft.map((item) => (


                  <div key={item.id} className='flex flex-col items-end  '>
                        <Image src={item.imgURL} alt="cloud image" />
                        
                        <div className='flex flex-col items-end my-20'>
                        {/* number of the step */}
                        <div className='flex items-center justify-center bg-splitOrange p-1 rounded-full w-10 h-10'>
                          <p className=' text-white text-center '>
                            {item.id}
                          </p>
                        </div>

                        <h3 className='font-rb text-lg font-bold text-nowrap'>
                          {item.title}
                        </h3>
                        <p className='font-rb text-sm text-right'>
                          {item.description}
                        </p>


                        </div>
                  </div>
                    ))
                  }


                </div>


                
                 

                 {/* the tracing beam */}
                 <TracingBeam/>
                 
               

                 {/* Right side  */}

                <div>   
                  { 
                    howRight.map((item) => ( 
                      <div key={item.id}>
                         {/* number of the step */}
                    <div className='flex items-center justify-center bg-splitOrange p-1 rounded-full w-10 h-10'>
                     <p className=' text-white text-center '>
                        {item.id}
                      </p>
                     </div>

                     <h3 className='font-rb text-lg font-bold text-nowrap'>
                        {item.title}
                     </h3>
                    <p className='font-rb text-sm'>
                    Describe your project needs, set your budget, 
                    and let us connect you with top freelancers.
                    </p>

                    <Image src={item.imgURL} alt="cloud image" className='my-20'/>

                      </div>
                    )) 
                  }
                   

                </div>


                



        </div>
    </section>
  )
}

export default How