import React from 'react'
import Link from 'next/link'
const Button = ({href , buttonText , className }: {href : string, buttonText: string , className? : string} ) => {
  return (

   <Link href={href}> 
  
        <button className={`${className} p-3 w-52  text-xl md:text-2xl rounded-lg ${buttonText === "Sign Up" ? "mx-3 bg-splitOrange text-white": buttonText ==="Login" ? "mx-3 border-splitOrange bg-white border-2 text-splitOrange" : "bg-splitOrange text-white"} `}>
            {buttonText}
        </button> 

    </Link>
  )
}

export default Button