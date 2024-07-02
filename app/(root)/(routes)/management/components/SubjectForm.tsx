'use client';

import React, { useState, useEffect } from 'react';
import { Subject } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user'
import NotFound from '@/app/not-found'

interface SubjectFormProps {
  subject?: Subject;
  onSubmit: (subject: Omit<Subject, 'id'>) => void;
}

export default function SubjectForm({ subject, onSubmit }: SubjectFormProps) {
  const [formData, setFormData] = useState({ name: '', value: '', description: '' });
  const user = useCurrentUser()

  if (!user || user.role !== 'ADMIN') {
    return <NotFound />
  }
  useEffect(() => {
    if (subject) {
      setFormData({ name: subject.name, value: subject.value, description: subject.description });
    }
  }, [subject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Subject Fields</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1"> Name </label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Default input" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1"> Value </label>
            <input type="text" name="value" id="value" value={formData.value} onChange={handleChange} placeholder="Active input" className="w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1"> Description </label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Default textarea" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>
      <div>
        <button type="submit" className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {subject ? 'Update Subject' : 'Create Subject'}
        </button>
      </div>
    </form>
  );
}