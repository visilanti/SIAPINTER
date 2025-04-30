import React, { useEffect, useState } from 'react';
// import axios from 'axios';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '081f7ce6e6msh039167f2bed2dabp104d8ajsna3aaefcdfdff'; // Ganti dengan API Key kamu
  const API_URL = 'https://api.freewebapi.com/job-search?query=developer&location=jakarta';

  useEffect(() => {
    // const fetchJobs = async () => {
    //   try {
    //     const response = await axios.get(API_URL, {
    //       headers: {
    //         Authorization: `Bearer ${API_KEY}`,
    //       },
    //     });

    //     // Sesuaikan berdasarkan bentuk data dari API
    //     const jobData = response.data.jobs || response.data.data || [];
    //     setJobs(jobData);
    //   } catch (err) {
    //     setError('Gagal mengambil data lowongan');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lowongan Kerja</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="text-gray-500 mt-2">{job.description.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobsPage;
