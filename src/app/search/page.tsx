'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';

const Search = () => {
  const search = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Debounce input changes and update search query after a delay
  useEffect(() => {
    if (!searchQuery) return; // Avoid running on initial render

    const timeoutId = setTimeout(() => {
      fetchUserData(); // Fetch data after debounce
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timeoutId); // Clear timeout if input changes before debounce period
    };
  }, [searchQuery]);

  // Handle the input change and set the state
  const handleInputChange = () => {
    setSearchQuery(search.current.value); // Update searchQuery directly
  };

  // Fetch user data from the API
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/get-users?searchQuery=${searchQuery}`);
      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await res.json();
      setUsers(data); // Set the fetched user data
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='font-rb font-normal text-2xl text-slate-400 capitalize '>Search for a user: </h1>
      <input
        type="text"
        ref={search}
        placeholder="search"
        id="searchQuery"
        onChange={handleInputChange} 
        className='border-2 border-slate-300 enabled:border-splitOrange focus:border-splitOrange p-4 rounded-full mb-7 mt-5 w-full md:w-auto' 
      />

    
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {users && users.length > 0 && (
        <div>
          {users.map((user) => (
            <div className='flex items-center w-full p-3 hover:bg-slate-200 rounded-xl '>
                <Image src={user.imageUrl} alt={user.firstName+' '+ user.lastName} height={50} width={50} className='rounded-full'/> 
                <p key={user.id} className='ml-2' >{user.firstName+" " + user.lastName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
