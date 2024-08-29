import {  SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex felx-col justify-center items-center mt-40 md:mt-10'>

     <SignUp/>
    </div>
  )
}

export default page