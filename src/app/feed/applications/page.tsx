'use client';

import React, { useEffect, useState } from 'react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/applications');
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(data.applications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (applications.length === 0) {
    return <div>No applications found for your posts.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Applications</h1>
      <ul className="space-y-4">
        {applications.map((app: any) => (
          <li key={`${app.post_id}-${app.applicant_id}`} className="border rounded-lg p-4 shadow-md">
            <h2 className="font-semibold text-lg">{app.post_title}</h2>
            <p>
              <strong>Applicant:</strong> {app.first_name} {app.last_name} 
            </p>
            <p>
              <strong>Applied At:</strong> {new Date(app.applied_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
