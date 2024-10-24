'use client'
import React, { useEffect, useState } from 'react'; 
import Image from 'next/image';
import Post from '@/app/ui/feed/Post';
import { PostsSkeleton } from '@/app/ui/skeletons';

interface User {
  id: string;
  imageUrl: string;
  firstName: string; 
  lastName: string; 
  email: string;
}

const UserPage = ({ params }: { params: { user_id: string } }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState([]);  // Initialize as an empty array
  const [loading, setLoading]  = useState(true); 
  
  const [error, setError] = useState<Error | null>(null);

  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);

  // Fetch user data
  const fetchUserData = async (user_id: string) => {
    try {
      const res = await fetch(`/api/user-data?user_id=${user_id}`);
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data: User = await res.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error as Error);
    }
  };

   // Fetch saved posts
   const fetchSavedPosts = async () => {
    try {
      const savedSplits = await fetch('/api/get-saved');
      if (savedSplits.status === 404) {
        setSavedPostIds([]);
      } else if (!savedSplits.ok) {
        throw new Error('Failed to fetch saved posts');
      } else {
        const saved = await savedSplits.json();
        const savedIds = saved.map((post: { id: string }) => post.id);
        setSavedPostIds(savedIds);
      }
    } catch (error) {
      console.error('Error fetching saved posts:', error);
      setError(error as Error);
    }
  };

  // Fetch user posts
  const fetchUserPosts = async (user_id: string) => {
    try {
      const res = await fetch(`/api/get-user-splits?visited_user_id=${user_id}`);
      if (!res.ok) throw new Error('Failed to fetch user posts');
      const data = await res.json();
      setUserPosts(data);
      
      await fetchSavedPosts(); 


    } catch (error) {
      console.error('Error fetching user posts:', error);
      setError(error as Error);
    } finally{ 

      setLoading(false); 

    }
  };

 
  useEffect(() => {

    fetchUserData(params.user_id);
    fetchUserPosts(params.user_id);

  }, [params.user_id]);

if(loading){ 
  return <PostsSkeleton/>
}
  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      
      {userData && (
        <div key={userData.id} className='mt-10 md:mt-5'>
          <div className='flex flex-row items-center space-x-4'>

          <div className='relative overflow-hidden bg-black w-28 md:w-34  h-28 md:h-28 rounded-full'>
            <Image src={userData.imageUrl} alt="user image" objectFit='cover' fill={true} />
          </div>
     
            {/* <Image src={userData.imageUrl} width={100} height={100} alt={userData.id} className='w-28 md:w-34 rounded-full'  /> */}
            <h1 className='font-rb text-2xl text-splitOrange'>
              {userData.firstName + " " + userData.lastName}
            </h1>
          </div>
          <hr className="h-px mt-8 bg-slate-400 border-0"/>
        </div>
      )}

      <div className='mt-10'>
        {userPosts && savedPostIds && userPosts.map((data: any) => (
          <Post
            key={data.id || data.title}
            date={data.created_at}
            title={data.title}
            position={data.position}
            description={data.content}
            difficulty={data.difficulty}
            id={data.id}
            user_id={data.user_id}
            isSaved={savedPostIds.includes(data.id)} // Pass saved state
          />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
