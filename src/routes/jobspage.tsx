import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    // Simulasi loading dan data dummy
    const timer = setTimeout(() => {
      const dummyJobs: Job[] = [
        {
          id: '1',
          title: 'Frontend Developer',
          company: 'Tech Nusantara',
          location: 'Jakarta',
          description:
            'Bertanggung jawab untuk membangun dan memelihara antarmuka pengguna menggunakan React dan Tailwind CSS.',
        },
        {
          id: '2',
          title: 'Backend Engineer',
          company: 'Data Kita Corp',
          location: 'Bandung',
          description:
            'Mengembangkan RESTful API dan mengelola database untuk mendukung aplikasi web kami.',
        },
        {
          id: '3',
          title: 'UI/UX Designer',
          company: 'Creative Labs',
          location: 'Remote',
          description:
            'Merancang user experience yang intuitif dan visual design yang menarik untuk aplikasi mobile.',
        },
      ];

      setJobs(dummyJobs);
      setLoading(false);
    }, 1000); // Simulasi delay 1 detik

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lowongan Kerja</h1>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
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
