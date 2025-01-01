'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';

import Image from 'next/image';
import Modal from "@/app/ui/Modal"
import { PostSkeleton, UserSkeleton } from '@/app/ui/skeletons';
import Link from 'next/link';

const Page = ({ params }: { params: { id: string } }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [postOwner, setPostOwner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSplit = async (id: string) => {
    toast.info('Fetching post data...');
    try {
      const response = await fetch(`/api/get-split?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      setPost(data[0]);
      toast.success('Post data loaded successfully!');
    } catch (err) {
      console.error('Error fetching post:', err);
      toast.error('Failed to fetch post data.');
      setError('Error fetching post.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (user_id: string) => {
    try {
      const res = await fetch(`/api/user-data?user_id=${user_id}`);
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setPostOwner(data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      toast.error('Failed to fetch user data.');
      setError('Error fetching user data.');
    }
  };

  const applyToPost = async () => {
    toast.info('Submitting application...');
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: post.id,
          user_id: user.id,
        }),
      });
      if (!response.ok) throw new Error('Failed to submit application.');
      const result = await response.json();
      toast.success('Application submitted successfully!');
      console.log(result.message);
    } catch (err) {
      console.error('Error applying to post:', err);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      toast.warn('Redirecting to sign-in...');
      router.push(`/sign-in?redirect=/feed`);
    } else if (isSignedIn && isLoaded && params.id) {
      fetchSplit(params.id);
    }
  }, [isLoaded, isSignedIn, params.id, router]);

  useEffect(() => {
    if (post && post.user_id) fetchUserData(post.user_id);
  }, [post]);

  if (!isLoaded || !isSignedIn) return <div>Loading...</div>;

  if (loading) return <PostSkeleton />;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className='flex justify-between items-center'>
        {postOwner ? (
          <Link href={`/search/users/${postOwner.id}`} className='flex items-center space-x-3'>
            <div className='relative overflow-hidden bg-black w-12 h-12 rounded-full'>
              <Image src={postOwner.imageUrl} alt="user image" objectFit='cover' fill={true} />
            </div>
            <p>{postOwner.firstName + ' ' + postOwner.lastName}</p>
          </Link>
        ) : <UserSkeleton />}
        {user.id === post.user_id ? (
          <div>
            <button onClick={() => router.push(`/feed/${post.id}/edit`)} className='mr-4'>
              <CiEdit className='text-[#FB8500] text-[25px] sm:text-[35px] md:text-[45px]' />
            </button>
            <Modal post_id={post.id} />
          </div>
        ) : <p className='text-lg font-rb text-oliveGreen '>{post.price ? post.price : "Volunteer"}</p>}
      </div>
      <hr className="h-px mt-3 bg-slate-400 border-0" />
      {post ? (
        <>
          <div className='flex flex-col space-y-5 mt-5'>
            <h2 className='mt-3 text-xl capitalize font-rb text-splitOrange'>{post.title}</h2>
            <p className='text-lg font-rb text-oliveGreen'>{post.content}</p>
            {user.id !== postOwner?.id && (
              <button
                onClick={applyToPost}
                className="bg-splitOrange  text-white px-4 py-2 rounded hover:bg-splitOrange"
              >
                Apply
              </button>
            )}
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
