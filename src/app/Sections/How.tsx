import React from 'react'
import { TracingBeam } from '../ui/tracing-beam'
import Image from 'next/image'
import cloud from "../../../public/how/cloud.svg"
const How = () => {
  return (
<section className='flex flex-col items-center justify-center px-[15vw] mt-20 ' id='How'>
        <h1 className='text-4xl lg:text-6xl  font-rb font-bold text-oliveGreen  '> 
          How Split Code Works? 
        </h1>

        <div className='flex  mt-20'>
                
                {/* Left side */}
                <div>
                 <Image src={cloud} alt="cloud image"/>


                                     {/* number of the step */}
                <div className='flex flex-col items-end mt-10'>   
                    {/* number of the step */}
                    <div className='flex items-center justify-center bg-splitOrange p-1 rounded-full w-10 h-10'>
                     <p className=' text-white text-center '>
                        2
                      </p>
                     </div>

                     <h3 className='font-rb text-lg font-bold text-nowrap'>
                        Freelancers Split Tasks
                     </h3>
                    <p className='font-rb text-sm text-right'>
                    We match your project with skilled developers who specialize
                    in each task, ensuring quality and efficiency
                    </p>


                </div>

                </div>
                 

                 {/* the tracing beam */}
                 <TracingBeam/>
                 
               

                 {/* Right side  */}

                <div>   
                    {/* number of the step */}
                    <div className='flex items-center justify-center bg-splitOrange p-1 rounded-full w-10 h-10'>
                     <p className=' text-white text-center '>
                        1
                      </p>
                     </div>

                     <h3 className='font-rb text-lg font-bold text-nowrap'>
                        Post Your Project
                     </h3>
                    <p className='font-rb text-sm'>
                    Describe your project needs, set your budget, 
                    and let us connect you with top freelancers.
                    </p>

                    <Image src={cloud} alt="cloud image" className='mt-10'/>


                </div>


                



        </div>
    </section>
  )
}

export default How