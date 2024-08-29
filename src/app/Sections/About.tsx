import React from 'react'
import aboutUs from '../../../public/about.svg'
import Image from 'next/image'
import Button from '../ui/Button'
const About = () => {
  return (
    <section className='flex flex-col    items-center   bg-slate-200  py-16 lg:px-[15vw] mt-20' id='About'>
        <h1 className='text-4xl lg:text-6xl  font-rb font-bold text-oliveGreen  '> 
            About Us
        </h1>

        <div className='flex flex-col lg:flex-row items-center space-y-20 mt-10 px-10 '>
          <div className='flex flex-col items-center lg:items-start  space-y-20 lg:space-y-10 '>
             <p className='text-center lg:text-left text-balance font-rb font-light text-lg max-w-md'>
             Split-Code empowers freelancers by connecting them with exciting projects and a supportive community. We believe in the power of collaboration to elevate every project to its fullest potential. Join Code Split today and take your freelancing career to the next level.
             </p>
             <Image loading='lazy' src={aboutUs}  alt="two people looking at a dashboard" width={300} className='flex lg:hidden '/>
             
             <Button href='/sign-up' buttonText='Join Us' className='max-w-28 text-lg lg:text-xl'/>
          </div>
  
          <Image src={aboutUs} alt="two people looking at a dashboard" width={500} className='hidden lg:flex ml-10'/>

        </div>

      

    </section>
  )
}

export default About