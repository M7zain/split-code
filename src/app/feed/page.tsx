'use client';
import React, { ReactElement, useEffect } from 'react';
import Layout from './layout';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

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
    // Optionally, show a loading spinner while checking auth status
    return <div>Loading...</div>;
  }

  return <div>
        feed
        <SignOutButton/>

  </div>;
};

Feed.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Feed;
