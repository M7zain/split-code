'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Post from '@/app/ui/feed/Post';
import { postData as hardcodedData } from '@/constants';
import { PostsSkeleton } from '@/app/ui/skeletons';

const BestMatch = () => {
  const { isSignedIn, isLoaded } = useUser(); // Check if user state is loaded
  const router = useRouter();

  // State to hold fetched posts data
  const [posts, setPosts] = useState(hardcodedData); // Use hardcoded data as fallback initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/get-best-matches');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      
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
      console.error('Error fetching posts:', error);
      setError('Error fetching posts, displaying hardcoded data.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to sign-in page if the user is not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect=/feed`);
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetch posts after user is loaded
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchPosts();
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <PostsSkeleton/>;
  }

  return (
    <div className="h-[100vh]">
      {error && <div className="text-red-500">{error}</div>}
      {posts.map((data: any) => (
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
      ))}
    </div>
  );
};


export default BestMatch;
