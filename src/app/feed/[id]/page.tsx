import React from 'react'

const page = ({ params } : { params: string}) => {


  

  return (
    <div>
      the post details
      {params.id}
    </div>
  )
}

export default page