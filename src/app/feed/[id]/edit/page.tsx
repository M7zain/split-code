'use client'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditSplit = ({ params }: { params: { id: string } }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // State to hold fetched post data
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [access, setAccess] = useState(false);

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

  useEffect(() => {
    // Ensure the user is signed in before fetching post data
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect=/feed`);
    } else if (isLoaded && isSignedIn && params.id) {
      fetchSplit(params.id);
    }
  }, [isLoaded, isSignedIn, params.id, router]);

  useEffect(() => {
    // Check user access once the post and user are both available
    if (post && user) {
      if (post.user_id === user.id) {
        setAccess(true);
      } else {
        router.push('/feed'); // Redirect if the user is not the owner
      }
    }
  }, [post, user, router]);

  const handleFormEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const position = formData.get('position') as string;
    const difficulty = formData.get('difficulty') as string;

    try {
      const response = await fetch(`/api/edit-split?id=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: params.id, title, content, position, difficulty }),
      });

      if (!response.ok) {
        throw new Error('Error editing split');
      }

      // Handle successful update
      router.push('/feed');
    } catch (error) {
      console.error(error);
      alert('Error editing split');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Only show the form if access is granted
  return (
    <div>
      {access && (
        <form onSubmit={handleFormEdit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="block border p-2 my-2 w-full"
              value={post?.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              className="block border p-2 my-2 w-full"
              value={post?.position}
              onChange={(e) => setPost({ ...post, position: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              className="block border p-2 my-2 w-full"
              value={post?.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            ></textarea>
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              name="difficulty"
              className="block border p-2 my-2 w-full"
              value={post?.difficulty}
              onChange={(e) => setPost({ ...post, difficulty: e.target.value })}
            >
              <option value="Easy">Easy</option>
              <option value="Mid">Mid</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <button type="submit" className="bg-splitOrange text-white font-rb text-xl rounded-lg p-2 mt-4">
            Edit Split
          </button>
        </form>
      )}
    </div>
  );
};

export default EditSplit;
