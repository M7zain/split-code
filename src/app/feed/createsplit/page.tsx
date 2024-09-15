'use client'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const SplitForm = () => {

    const {isLoaded ,isSignedIn} = useUser(); 
    const router = useRouter(); 

    useEffect(() => { 
      if (isLoaded && !isSignedIn) {
        router.push(`/sign-in?redirect=/feed`);
      }
    }, [isLoaded,isSignedIn, router])


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const position = formData.get('position') as string;
        const difficulty = formData.get('difficulty') as string;
    
        try {
          // Replace with your API endpoint and method
          const response = await fetch('/api/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, position, difficulty }),
          });
    
          if (!response.ok) {
            throw new Error('Error creating split');
          }
    
          // Handle successful creation
          alert('Split created successfully!');
        } catch (error) {
          console.error(error);
          alert('Error creating split');
        }
      };

  return (
    <div>  
        <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor='title'>Title:</label>
                <input type='text' id='title' name='title' required className='block border p-2 my-2 w-full' />
              </div>
              <div>
                <label htmlFor='position'>Position:</label>
                <input type='text' id='position' name='position' className='block border p-2 my-2 w-full' />
              </div>
              <div>
                <label htmlFor='content'>Content:</label>
                <textarea id='content' name='content' className='block border p-2 my-2 w-full'></textarea>
              </div>
              <div>
                <label htmlFor='difficulty'>Difficulty:</label>
                <input type='text' id='difficulty' name='difficulty' className='block border p-2 my-2 w-full' />
              </div>
              <button type='submit' className='bg-splitOrange text-white font-rb text-xl rounded-lg p-2 mt-4'>Submit</button>
            </form>
    </div>
  )
}

export default SplitForm