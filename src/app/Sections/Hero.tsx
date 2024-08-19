import React from 'react'
import Image from 'next/image'
import heroImage from '../../../public/coding.svg'
import Button from '@/app/ui/Button'

const Hero = () => {
  return (
    <section className='flex flex-col md:flex-row p-10 items-center justify-center   md:px-[15vw]  min-h-screen md:min-h-0 ' id='home'>
     
      <div className='w-full text-balance flex flex-col items-center justify-center  md:items-start'>
        <h1 className=' text-xl md:text-4xl lg:text-6xl leading-relaxed font-rb font-bold text-oliveGreen text-center md:text-left '>Empower Your Projects with Collaborative Development</h1>
       
        {/* mobile image */}
        <Image src={heroImage} alt='coding infront of a pc holding a cup of coffee '  width={350} height={350} className='flex md:hidden'/>

        <p className='text-sm md:text-lg lg:text-xl text-pretty  text-center md:text-start leading-relaxed mt-7 md:mt-14 font-rb font-light '>Join a community of skilled freelancers and bring your software ideas to life—efficiently and expertly.</p>
      
        <Button buttonType='Get Started' className='mt-7 md:mt-10' />

      </div>
      {/* Desktop image */}
      <Image src={heroImage} alt='coding infront of a pc holding a cup of coffee '   width={750} height={750} className='hidden md:flex' />
    </section>
  )
}

export default Hero