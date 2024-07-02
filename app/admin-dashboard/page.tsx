'use client';

import React, { useState } from 'react';
import { Subject } from '@prisma/client';
import SubjectList from '@/app/admin-dashboard/components/SubjectList'
import SubjectForm from '@/app/admin-dashboard/components/SubjectForm'


export default async function AdminDashboard() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('subjects');


  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setSelectedSubject(undefined);
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = async (subjectData: Omit<Subject, 'id'>) => {
    try {
      if (selectedSubject) {
        // Update existing subject
        const response = await fetch(`/api/subjects/${selectedSubject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subjectData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedSubject = await response.json();
      } else {
        // Create new subject
        await fetch('/api/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subjectData),
        });
      }
      setSelectedSubject(undefined);
      setIsFormVisible(false);
      // Trigger refresh of the subject list
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error submitting subject:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 backdrop-blur-2xl">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard - Subject Management</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Subject List</h2>
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="border-t border-gray-200">
                <SubjectList
                  onEdit={handleEdit}
                  refreshTrigger={refreshTrigger}
                />
              </div>
            </div>
            {isFormVisible && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedSubject ? 'Edit Subject' : 'Add New Subject'}
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <SubjectForm subject={selectedSubject} onSubmit={handleSubmit} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}