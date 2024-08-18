import React from 'react'

const Button = ({buttonType , className }: {buttonType: string , className? : string} ) => {
  return (
    <button className={`${className} p-3 w-52 text-2xl rounded-lg ${buttonType === "Sign Up" ? "mx-3 bg-splitOrange text-white": buttonType ==="Login" ? "mx-3 border-splitOrange bg-white border-2 text-splitOrange" : "bg-splitOrange text-white"} `}>
        {buttonType}
    </button>
  )
}

export default Button