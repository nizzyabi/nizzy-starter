'use client';

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Subject } from '@prisma/client';

export default function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subject')
      const data = await response.json()
      setSubjects(data)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {subjects.map((subject, subjectIdx) => (
        <Link key={`${subject.id}`} href={`/learn/${subject.id}`}
              className={`${subjectIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
        cursor-pointer hover:bg-gray-100 p-6 rounded shadow `}>
          <h2 className="font-bold text-lg text-red-400 mb-2">{subject.name}</h2>
          <p className="text-gray-700 mb-2">{subject.value}</p>
          <p className="text-gray-500">{subject.description}</p>
        </Link>
      ))}
    </div>
  )
}