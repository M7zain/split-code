import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Login = () => {
  return (
    <div className='flex felx-col justify-center items-center mt-40 md:mt-10'>
      <SignIn/>
   </div>
  )
}

export default Login