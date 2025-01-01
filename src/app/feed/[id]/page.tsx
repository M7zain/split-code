'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { toast } from 'react-toastify'; // Optional: Use a library like react-toastify for feedback

import Image from 'next/image';
import Modal from "@/app/ui/Modal"
import { PostSkeleton, UserSkeleton } from '@/app/ui/skeletons';
import Link from 'next/link';
import Button from '@/app/ui/Button';


const Page = ({ params }: { params: { id: string } }) => {
  const { isSignedIn, isLoaded, user } = useUser(); // Check if user is logged in
  const router = useRouter();

  // State to hold fetched post data
  const [post, setPost] = useState<any>(null);
  const [postOwner, setPostOwner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hasApplied, setHasApplied] = useState(false);


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

// Inside the component...
const applyToPost = async () => {
  try {
    const response = await fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: post.id,   // ID of the post being applied to
        user_id: user.id,   // ID of the logged-in user
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application.');
    }

    const result = await response.json();
    toast.success('Application submitted successfully!'); // Optional toast notification
    console.log(result.message);
  } catch (error) {
    console.error('Error applying to post:', error);
    toast.error('Failed to submit application. Please try again.'); // Optional toast notification
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
    return <PostSkeleton/>;
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

            <Link href={`/search/users/${postOwner.id}`} className='flex items-center space-x-3'>
              
              {/* Display user's photo */}
            <div className='relative overflow-hidden bg-black w-12 h-12 rounded-full'>
                  <Image src={postOwner.imageUrl} alt="user image" objectFit='cover' fill={true} />
            </div>



                  {/* Display Full name */}
                  <p>{postOwner.firstName +' '+  postOwner.lastName}</p>
            </Link>
  
            </div>
          ) : (
            <UserSkeleton/>
  )}

      </div>
            {/* check if the post owner id match logged user Id */}
            {user.id === post.user_id ? (
              
              <div>
              {/* edit button */}
            <button onClick={() => router.push(`/feed/${post.id}/edit`)} className='mr-4'>
              <CiEdit className='text-[#FB8500] text-[25px] sm:text-[35px] md:text-[45px]' />
            </button>


            <Modal post_id={post.id}/>

          </div>

       
            
          ) :        <p className='text-lg  font-rb text-oliveGreen '>{post.price ?  post.price : "Volunteer"}</p>}
      </div>
      
     <hr className="h-px mt-3 bg-slate-400 border-0"/>
      {post ? (
        <>
        <div className='flex flex-col space-y-5 mt-5'>
          <h2 className='mt-3 text-xl capitalize font-rb text-splitOrange'>{post.title}</h2>
          <p className='text-lg  font-rb text-oliveGreen '>{post.content}</p>
        
        { 
        !(user.id === postOwner) &&
          <div className='flex flex-row items-center justify-between '>
            {/* <Button href='/feed' buttonText='Apply'/> */}

 <button
  onClick={applyToPost}
  className="bg-splitOrange text-white px-4 py-2 rounded hover:bg-splitOrange"
>
  Apply
</button> 
          </div>
        }
  
    

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
