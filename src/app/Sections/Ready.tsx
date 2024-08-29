import React from 'react'
import  {join}  from '../../../public/images/index'
import Image from 'next/image'
import Button from '../ui/Button'
import Link from 'next/link'

const Ready = () => {
  return (
    <section className='flex flex-col    items-center  py-16 lg:px-[15vw] mt-20' >
        <h1 className='text-4xl lg:text-6xl  font-rb font-bold text-oliveGreen  '> 
                Ready to Start ?
        </h1>

        <div className='flex flex-col lg:flex-row items-center justify-center space-y-20 px-10 '>
          <div className='flex flex-col items-center lg:items-start  space-y-20 mt-10'>
             <p className='text-center lg:text-left text-balance font-rb font-light text-lg md:text-2xl max-w-md '>
             Whether you're a business ready to elevate your project or a freelancer eager to collaborate, Split Code is your gateway to success.
             </p>
             <Image src={join}  alt="two people looking at a dashboard" width={300} className='flex lg:hidden '/>
             
            <div className='flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-4 md:space-y-0 '>
                <Button href='/login' buttonText='Post a project' className='text-lg lg:text-xl '/>
               
               <Link href='/sign-up'>
               
                <button className='  p-3 w-52 rounded-lg capitalize border-splitOrange bg-white border-2 text-splitOrange text-lg lg:text-xl'>
                        Sign up as a freelancer
                </button>
               </Link>

            </div>
          
          </div>
  
          <Image src={join} alt="two people looking at a dashboard" width={400} className='hidden lg:flex ml-10'/>

        </div>

      

    </section>
  )
}

export default Ready