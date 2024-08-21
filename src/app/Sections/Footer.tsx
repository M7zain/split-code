'use client'

import React from 'react'
import footerLogo from "../../../public/logo.svg"
import { footerLinks , socialMedia } from '@/constants'
import Image from 'next/image'
const Footer = () => {
  return (
    <footer className='bg-slate-200 py-10 px-0 md:px-[25vw]'>
      <div className='flex max-lg:flex-col justify-between items-center mx-10'> 
       <div className='flex flex-col '>
       <Image src={footerLogo} alt="footer-logo " 
        width={200} height={200}/>
       
        <div className='flex mt-6'>
        {
          socialMedia.map((social) => (
             <Image src={social.src} alt={social.alt} className='bg-primary rounded-full p-2 mr-4 ' width={35} height={35}/>
          ))
        }
        </div>
       </div>
     

        <div className='flex  max-sm:flex-col'> 
        {
                footerLinks.map((link) => ( 
                  <div className='flex flex-col'>
                    <h4 className='font-montserrat text-primary mr-20 mt-10 mb-5 text-xl '>{link.title}</h4>
                    { link.links.map((linkGroup) => (
                      <a href={linkGroup.link} className='font-palaquin text-slate-gray 
                      text-sm leading-normal mt-2'>{linkGroup.name}</a>
                    ))}
                  </div>
                 
                ))
              }
       
        </div>
   
      </div>
      <div className='flex justify-center '>
        <p className='text-slate-gray font-palanquin mt-20 '>© Copy All rights reserved</p>
    
      </div>
     
    </footer>
  )
}

export default Footer