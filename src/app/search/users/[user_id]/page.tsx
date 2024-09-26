'use client'

import React, { useEffect, useState } from 'react'; 
import Image from 'next/image';
import Post from '@/app/ui/feed/Post';

interface User {
  id: string;
  imageUrl: string;
  firstName: string; 
  lastName : string; 
  email: string; 
  // Add other fields you expect from the API response
}

const UserPage = ({ params }: { params: { user_id: string } }) => {

  const [userData , setUserData ] = useState<User | null>(null);  // Initialize as a single user object or null
  const [error , setError ] = useState<Error | null>(null); // Initialize error state as null
  const [userPosts, setUserPosts ] = useState(null); 

  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);



  // Fetch user data from the API
  const fetchUserData = async (user_id: string) => {
    try {
      const res = await fetch(`/api/user-data?user_id=${user_id}`); // Fetch user data
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data: User = await res.json(); // Expect the response to be a single user object
      setUserData(data); 
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error as Error); // Handle error properly
    }
  };

  const fetchUserPosts = async (user_id: string) => { 
    try {
      const res = await fetch(`/api/get-user-splits?visited_user_id=${user_id}`); // Fetch user data
      if (!res.ok) {
        throw new Error('Failed to fetch user posts');
      }
      const data: User = await res.json(); // Expect the response to be a single user object
      setUserPosts(data); 


       // Set saved post IDs
       const savedSplits = await fetch('/api/get-saved'); 

       if(savedSplits.status === 404){ 
        setSavedPostIds([]);
       }
       else if (!savedSplits.ok) {
         throw new Error('Failed to fetch saving status');
       }else { 
        const saved = await savedSplits.json(); 
 
        const savedIds = saved.map((post: { id: string }) => post.id);
      
        setSavedPostIds(savedIds);

       }

    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error as Error); // Handle error properly
    }
  }

  useEffect(() => {
    fetchUserData(params.user_id);
    fetchUserPosts(params.user_id); 
  }, [params.user_id]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}  {/* Display error if there is one */}
 
      {userData && (
        <div key={userData.id} className='mt-10 md:mt-5'>
          <div className='flex flex-row items-center space-x-4'>
              <Image src={userData.imageUrl} width={100} height={100} alt={userData.id} className='w-28 md:w-34 rounded-full '/>
              <h1 className='font-rb text-2xl text-splitOrange '>{userData.firstName + " " + userData.lastName }</h1>
          </div>
          <hr className="h-px mt-8 bg-slate-400 border-0"/>
        </div>
      )}

      <div className='mt-10'>{
      userPosts && 
      userPosts.map((data: any) => (
        <Post
          key={data.id || data.title} // Use id if available, otherwise fallback to title
          date={data.created_at}
          title={data.title}
          position={data.position}
          description={data.content}
          difficulty={data.difficulty}
          id={data.id}
          user_id={data.user_id}
          isSaved={savedPostIds.includes(data.id)} // Pass saved state to the Post component
        />
      ))
    }
      </div>

    </div>
  );
}

export default UserPage;
