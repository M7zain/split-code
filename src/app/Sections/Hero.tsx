import React from 'react'
import Image from 'next/image'
import heroImage from '../../../public/coding.svg'
import Button from '@/app/ui/Button'

const Hero = () => {
  return (
    <section className='flex p-10 items-center justify-center mt-10 mx-[15vw]' id='home'>
      <div className='w-full text-balance  '>
        <h1 className='text-6xl leading-relaxed font-rb font-bold text-oliveGreen'>Empower Your Projects with Collaborative Development</h1>
       
        <p className='text-xl leading-relaxed mt-14 font-rb font-light'>Join a community of skilled freelancers and bring your software ideas to life—efficiently and expertly.</p>
      
        <Button buttonType='Get Started' className='mt-10' />

      </div>
      <Image src={heroImage} alt='coding infront of a pc holding a cup of coffee '  width={750} height={750}/>
    </section>
  )
}

export default Hero