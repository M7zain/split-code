'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Field = {
  field_id: number;
  name: string;
};

type Language = {
  lang_id: number;
  name: string;
};

const Preferences = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [fields, setFields] = useState<Field[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedField, setSelectedField] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const fetchFieldsAndLanguages = async () => {
        try {
          const response = await fetch('/api/get-fields-languages');
          const data = await response.json();
          if (data && data.fields && data.languages) {
            setFields(data.fields);
            setLanguages(data.languages);
          } else {
            console.error('Invalid data structure:', data);
          }
        } catch (error) {
          console.error('Error fetching fields and languages:', error);
        }
      };
      fetchFieldsAndLanguages();
    }
  }, [isLoaded, isSignedIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedField && selectedLanguage) {
      try {
        const response = await fetch('/api/user-preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            field_id: selectedField,
            lang_id: selectedLanguage,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success('Preferences saved successfully!');
        } else {
          toast.error(data.error || 'An error occurred.');
        }
      } catch (error) {
        console.error('Error submitting preferences:', error);
        toast.error('An error occurred.');
      }
    } else {
      toast.warn('Please select both a field and a language.');
    }
  };

  return (
    <div>
      {isLoaded ? (
        isSignedIn ? (
          <div>
            <h2>Welcome, {user?.firstName}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="field">Field:</label>
                <select
                  id="field"
                  name="field"
                  className="block border p-2 my-2 w-full"
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                >
                  <option value="">Select a Field</option>
                  {fields.map((field) => (
                    <option key={field.field_id} value={field.field_id}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="language">Programming Language:</label>
                <select
                  id="language"
                  name="language"
                  className="block border p-2 my-2 w-full"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="">Select a Programming Language</option>
                  {languages.map((language) => (
                    <option key={language.lang_id} value={language.lang_id}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="mt-4 px-4 py-2 bg-splitOrange text-white">
                Save Preferences
              </button>
            </form>
          </div>
        ) : (
          <div>Please sign in</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Preferences;
