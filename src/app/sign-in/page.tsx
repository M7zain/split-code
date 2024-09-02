import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Login = () => {
  return (
    <div className='flex felx-col justify-center items-center h-screen'>
      <SignIn/>
   </div>
  )
}

export default Login