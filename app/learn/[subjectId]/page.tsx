import { db } from '@/lib/db'
import Link from 'next/link'

export default async function LearnDetails({
                                             params,
                                           }: {
  params:{ subjectId:string };
})   {

  const { subject, chapters } =
    await fetchSubjectAndChapters(params.subjectId);


  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">{`Subject: ${subject.name}`}</h1>
      <h2 className="font-bold text-xl mb-4">Chapters list:</h2>
      <div className="flex flex-col gap-4">
        {chapters.map((chapter, index) => (
          <Link key={`${chapter.id}`} href={`/learn/${chapter.subjectId}/chapter/${chapter.id}`} >
          <div
            key={index}
            className="border border-gray-300 rounded-md p-4 cursor-pointer hover:border-blue-500">
            <p className="text-center">{chapter.name}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>

)
}

async function fetchSubjectAndChapters(subjectId: string) {
  // Load the subject data
  const subject = await db.subject.findUnique({
    where: { id: subjectId }
  });
  if(!subject) {
    //@TODO fix it! Change for the 404 page
    throw new Error('Subject not found');
  }
  // Now load the chapters related to this subject
  const chapters = await db.chapter.findMany({
    where: { subjectId: subjectId }
  });
    if(!chapters) {
      //@TODO fix it! Change for the 404 page
      throw new Error('Chapter not found');
    }

  return { subject, chapters };
}
