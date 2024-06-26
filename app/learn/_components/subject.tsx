import { db } from '@/lib/db'
import Link from 'next/link'

export default async function Subject() {
  const subjectData = await db.subject.findMany();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {subjectData.map((subject, subjectIdx) => (
        <Link key={`${subject.id}`} href={`/learn/${subject.id}`} className={`${subjectIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
        cursor-pointer hover:bg-gray-100 p-6 rounded shadow `}>
          <h2 className="font-bold text-lg text-red-400 mb-2">{subject.name}</h2>
          <p className="text-gray-700 mb-2">{subject.value}</p>
          <p className="text-gray-500">{subject.description}</p>
        </Link>
      ))}
    </div>
  );
}