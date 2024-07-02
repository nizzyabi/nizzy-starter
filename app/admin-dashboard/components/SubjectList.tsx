import React, { useState, useEffect } from 'react';
import { Subject } from '@prisma/client';
import Link from 'next/link'

interface SubjectListProps {
  onEdit: (subject: Subject) => void;
  refreshTrigger: number;
}

export default function SubjectList({ onEdit, refreshTrigger }: SubjectListProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, [refreshTrigger]);

  const fetchSubjects = async () => {
    const response = await fetch('/api/subjects');
    const data = await response.json();
    setSubjects(data);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapters</th>
      </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
      {subjects.map((subject) => (
        <tr key={subject.id}>
          <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
          <td className="px-6 py-4 whitespace-nowrap">{subject.value}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button onClick={() => onEdit(subject)} className="text-indigo-600 hover:text-indigo-900">Manage Subject
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Link href={`/management/chapter/${subject.id}`} className="text-green-600 hover:text-green-900">
              Manage Chapters
            </Link>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}