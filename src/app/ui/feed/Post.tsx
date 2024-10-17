import Link from 'next/link';
import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

interface PostProps {
  date: string;
  title: string;
  position: string;
  description: string;
  difficulty: string;
  id: string;
  user_id: string;
  isSaved: boolean; 
}

const Post: React.FC<PostProps> = ({ date, title, position, description, difficulty, id, user_id, isSaved }) => {
  const [save, setSave] = useState<boolean>(isSaved); 

  const saveSplit = async () => {
    try {
      const response = await fetch('/api/save-split', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: id }),
      });

      if (!response.ok) {
        throw new Error('Error saving split');
      }
      setSave(true); 
    } catch (error) {
      console.error(error);
      // Consider a better way to notify the user here
    }
  };

  const deleteSplit = async () => {
    try {
      const response = await fetch('/api/save-split', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: id }),
      });

      if (!response.ok) {
        throw new Error('Error deleting split');
      }
      setSave(false); 
    } catch (error) {
      console.error(error);
      // Consider a better way to notify the user here
    }
  };

  const handleLikeClick = async () => {
    // Optimistic UI update
    setSave((prev) => !prev);

    if (save) {
      await deleteSplit();
    } else {
      await saveSplit();
    }
  };

  function timeAgo(timestamp: string): string {
    const postDate = new Date(timestamp);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo}min ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo}h ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) return `${daysAgo}d ago`;
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) return `${weeksAgo}w ago`;
  
    // Handle months and years accurately
    const yearDiff = now.getFullYear() - postDate.getFullYear();
    const monthDiff = now.getMonth() - postDate.getMonth();
    const dayDiff = now.getDate() - postDate.getDate();
  
    let monthsAgo = yearDiff * 12 + monthDiff;
    if (dayDiff < 0) monthsAgo--;  // Correct if we haven't passed the same day in the current month yet
  
    if (monthsAgo < 12) return `${monthsAgo}mo ago`;
    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo}y ago`;
  }
  

  return (
    <div className='bg-white hover:bg-slate-200 p-3 rounded-lg'>
      <div className='flex justify-between'>
        <div className='flex flex-col max-w-md text-balance'>
          <p className='font-rb text-gray-400 text-sm md:text-lg'>{timeAgo(date)}</p>
          <Link href={`/feed/${id}`}>
            <h2 className='font-rb text-splitOrange hover:underline text-lg md:text-xl'>{title}</h2>
          </Link>
          <p className='font-rb text-gray-400 text-sm md:text-lg'>{position}</p>
          <p className='font-rb text-oliveGreen text-clip'>{description}</p>
        </div>
        <div className='flex flex-col items-center justify-around'>
          <button onClick={handleLikeClick}>
            {save ? (
              <FaHeart className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />
            ) : (
              <CiHeart className='text-[#FB8500] text-[35px] sm:text-[45px] md:text-[50px]' />
            )}
          </button>
          <p className='font-rb text-oliveGreen font-bold'>{difficulty}</p>
        </div>
      </div>
      <hr className="h-px my-5 bg-oliveGreen border-0" />
    </div>
  );
}

export default Post;
