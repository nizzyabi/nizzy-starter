import Subject from '@/app/learn/_components/subject'

export default async function LearnPage() {

  return (
    <div className="space-y-20 mt-32">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center lg:text-left ">
          <p className="mt-4 text-lg text-foreground">
            Choose a subject which u would to learn.
          </p>
        </div>
      </div>
      <Subject/>
    </div>
  )
}