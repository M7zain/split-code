'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SplitForm = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [fields, setFields] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(`/sign-in?redirect=/feed`);
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    // Fetch fields and languages from the API
    const fetchFieldsAndLanguages = async () => {
      try {
        const response = await fetch('/api/get-fields-languages');
        const data = await response.json();
        setFields(data.fields);
        setLanguages(data.languages);
      } catch (error) {
        console.error('Error fetching fields and languages:', error);
      }
    };
    fetchFieldsAndLanguages();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const position = formData.get('position') as string;
    const difficulty = formData.get('difficulty') as string;
    const field = formData.get('field') as string | null;
    const language = formData.get('language') as string | null;

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, position, difficulty, field, language }),
      });

      if (!response.ok) {
        throw new Error('Error creating split');
      }

      router.push('/feed');
    } catch (error) {
      console.error(error);
      alert('Error creating split');
    }
  };

  return (
    <div  className="pb-20">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required className="block border p-2 my-2 w-full" />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" name="position" className="block border p-2 my-2 w-full" />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" className="block border p-2 my-2 w-full"></textarea>
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" name="difficulty" className="block border p-2 my-2 w-full">
            <option value="Easy">Easy</option>
            <option value="Mid">Mid</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="field">Field:</label>
          <select id="field" name="field" className="block border p-2 my-2 w-full">
            <option value="">Select a Field</option>
            {fields.map((field: any) => (
              <option key={field.field_id} value={field.field_id}>
                {field.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language">Programming Language:</label>
          <select id="language" name="language" className="block border p-2 my-2 w-full">
            <option value="">Select a Programming Language</option>
            {languages.map((language: any) => (
              <option key={language.lang_id} value={language.lang_id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-splitOrange w-full lg:w-auto text-white font-rb text-xl rounded-lg p-2 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SplitForm;
