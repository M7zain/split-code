import React from 'react'
import Image from 'next/image'

const Card = ({imgURL , title , description} : {imgURL :string , title:string, description:string}) => {
  return (
    <div>
        <Image src={imgURL} alt={title}/> 
        <h4>{title}</h4>
        <p>
            {description}
        </p>
    </div>
  )
}

export default Card