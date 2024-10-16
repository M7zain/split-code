'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Post from '@/app/ui/feed/Post';
import { PostsSkeleton } from '@/app/ui/skeletons';
import NoPosts from '@/app/ui/NoPosts';

const SavedSplits = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);

  // Fetch posts and saved post IDs from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/get-saved');
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
      //setError('Error fetching posts, displaying hardcoded data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect=/feed`);
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchPosts();
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <PostsSkeleton />;
  }

  return (
    <div className="h-[100vh]">
      {error && <div className="text-red-500">{error}</div>}
     
     
      {posts.length === 0 ?
      
      <NoPosts/>
      
      :  (posts.map((data: any) => (
        <Post
          key={data.id || data.title}
          date={data.created_at}
          title={data.title}
          position={data.position}
          description={data.content}
          difficulty={data.difficulty}
          id={data.id}
          user_id={data.user_id}
          isSaved={savedPostIds.includes(data.id)} // Pass saved state to the Post component

        />
      ))) }
    </div>
  );
};

export default SavedSplits;
