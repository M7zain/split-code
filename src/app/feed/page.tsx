'use client';
import React, { ReactElement, useEffect } from 'react';
import Layout from './layout';
import {useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Post from '../ui/feed/Post';
import { postData } from '@/constants';

const Feed = () => {
  const { isSignedIn, isLoaded } = useUser(); // Check if user state is loaded
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to login if not signed in
      router.push(`/sign-in?redirect=/feed`);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return <div className='h-[100vh]'>
      {
        postData.map((data) => ( 
          <Post date={data.date} title={data.title} position={data.position} description={data.description} difficulty={data.difficulty}/>
        ))
      }
  </div>;
};

Feed.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Feed;
