'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import Image from 'next/image';


const Page = ({ params }: { params: { id: string } }) => {
  const { isSignedIn, isLoaded, user } = useUser(); // Check if user is logged in
  const router = useRouter();

  // State to hold fetched post data
  const [post, setPost] = useState<any>(null);
  const [postOwner, setPostOwner] = useState<any>(null);
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

  // Fetch user data from the API
  const fetchUserData = async (user_id: string) => {
    try {
      const res = await fetch(`/api/user-data?user_id=${user_id}`); // Fetch user data
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await res.json();
      setPostOwner(data); // Set the fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data.');
    }
  };

  const deletePost = async (post_id: string) => {
    try {
      const response = await fetch(`/api/delete-split?id=${post_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Error deleting post');
      }
  
      router.push('/feed');  // Redirect to feed after deletion
      // Handle successful deletion
      alert("Post deleted successfully");
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting post');
    }
  };
  

  // Fetch the post data when the component mounts
  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      router.push(`/sign-in?redirect=/feed`);
    } else if (isSignedIn && isLoaded && params.id) {
      fetchSplit(params.id); // Fetch the post using the id from params
    }
  }, [isLoaded, isSignedIn, params.id, router]);

  // Fetch the post owner's user data once the post has been fetched
  useEffect(() => {
    if (post && post.user_id) {
      fetchUserData(post.user_id); // Fetch user data based on the user_id from post
    }
  }, [post]);

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

      {/* post details section */}
      <div className='flex justify-between items-center'>
          {/* <h1 className='text-lg font-rb font-normal text-oliveGreen'>Post Details</h1> */}
          <div>
      {postOwner ? (
            <div className="flex items-center space-x-4">

              {/* Display user's photo */}
              <Image 
                src={postOwner.imageUrl} 
                alt="User's profile picture" 
                className="rounded-full"
                width={50} 
                height={50}
                />

                  {/* Display Full name */}
                  <p>{postOwner.firstName +' '+  postOwner.lastName}</p>
   
  
            </div>
          ) : (
            <p>Loading post owner data...</p>
          )}

      </div>
            {/* check if the post owner id match logged user Id */}
            {user.id === post.user_id ? (
              
              <div className='space-x-3'>
              {/* edit button */}
            <button onClick={() => router.push(`/feed/${post.id}/edit`)}>
              <CiEdit className='text-[#FB8500] text-[25px] sm:text-[35px] md:text-[45px]' />
            </button>

            {/* Delete button */}
            <button onClick={() => deletePost(post.id) } >
                <MdDeleteOutline  className='text-[#FB8500] text-[25px] sm:text-[35px] md:text-[45px]' />
            </button>
          </div>
            
          ) : null}
      </div>
      
     <hr className="h-px mt-3 bg-slate-400 border-0"/>
      {post ? (
        <>
        <div className='flex flex-col space-y-5'>
          <h2 className='mt-3 text-xl capitalize font-rb text-splitOrange'>{post.title}</h2>
          <p className='text-lg  font-rb text-oliveGreen '>{post.content}</p>
          <p className='text-sm font-rb text-slate-500'>Posted on: {post.created_at}</p>
        </div>

        
        </>
      ) : (
        <div>No post found</div>
      )}
    </div>
  );
};

export default Page;
