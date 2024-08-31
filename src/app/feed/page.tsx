import React, { ReactElement } from 'react'
import Layout from './layout'


  const Feed = () => {
    return (
      <div>feed</div>
    )
  }


Feed.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }
   

export default Feed


