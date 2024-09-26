'use client'

import React, { useEffect, useState } from 'react'; 
import Image from 'next/image';

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

  useEffect(() => {
    fetchUserData(params.user_id);
  }, [params.user_id]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}  {/* Display error if there is one */}
      
      {userData && (
        <div key={userData.id}>
          <div className='flex flex-row items-center space-x-4'>
              <Image src={userData.imageUrl} width={100} height={100} alt={userData.id} className='w-28 md:w-36 rounded-full '/>
              <h1 className='font-rb text-2xl text-splitOrange '>{userData.firstName + " " + userData.lastName }</h1>
          </div>
          <hr className="h-px mt-3 md:mt-8 bg-slate-400 border-0"/>


          {/* Add more user details here */}
        </div>
      )}
    </div>
  );
}

export default UserPage;
