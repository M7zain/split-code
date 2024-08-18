import React from 'react'
import Image from 'next/image'
import heroImage from '../../../public/coding.svg'
import Button from '@/app/ui/Button'

const Hero = () => {
  return (
    <section className='flex flex-col md:flex-row p-10 items-center justify-center  mt-40 md:mt-10 md:px-[15vw] ' id='home'>
     
      <div className='w-full text-balance flex flex-col items-center md:items-start'>
        <h1 className=' text-4xl md:text-6xl leading-relaxed font-rb font-bold text-oliveGreen text-center md:text-left '>Empower Your Projects with Collaborative Development</h1>
       
        {/* mobile image */}
        <Image src={heroImage} alt='coding infront of a pc holding a cup of coffee '  width={400} height={400} className='flex md:hidden my-10'/>

        <p className='text-lg md:text-xl leading-relaxed mt-14 font-rb font-light '>Join a community of skilled freelancers and bring your software ideas to life—efficiently and expertly.</p>
      
        <Button buttonType='Get Started' className='mt-10' />

      </div>
      {/* Desktop image */}
      <Image src={heroImage} alt='coding infront of a pc holding a cup of coffee '   width={750} height={750} className='hidden md:flex' />
    </section>
  )
}

export default Hero