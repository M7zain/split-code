'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { CiEdit } from "react-icons/ci";


const Page = ({ params }: { params: { id: string } }) => {
  const { isSignedIn, isLoaded , user } = useUser(); // Check if user is logged in
  const router = useRouter();

  // State to hold fetched post data
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch post from the API
  const fetchSplit = async (id: string) => {
    try {
      const response = await fetch(`/api/get-split?id=${id}`); // Send the id as a query parameter
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await response.json();
      setPost(data[0]); // Assuming the API returns an array, get the first element
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Error fetching post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      router.push(`/sign-in?redirect=/feed`);
    } else if (isSignedIn && isLoaded && params.id) {
      fetchSplit(params.id); // Fetch the post using the id from params
    }
  }, [isLoaded, isSignedIn, params.id, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Posted on: {post.created_at}</p>
         { user.id === post.user_id? 
          <button onClick={() => router.push(`/feed/${post.id}/edit`)}>
             <CiEdit className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />
          </button>: 
          null
          }
        </div>
      ) : (
        <div>No post found</div>
      )
      }
    </div>
  );
};

export default Page;
