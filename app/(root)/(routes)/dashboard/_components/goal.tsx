import { Progress } from '@/components/ui/progress'
import { Target } from 'lucide-react'

export type GoalDataProps = {
  value: number
  goal: number
}

export default function GoalDataCard(props: GoalDataProps) {
  return (
    <div className="rounded-[5px] p-5 bg-secondary/90">
      <section className="flex justify-between gap-2 text-primary pb-2">
        <p>Goal Progress</p>
        <Target className="h-4 w-4" />
      </section>
      <div className="gap-3 pt-2">
        <section className="flex justify-between gap-3 ">
          <div className=" w-full rounded-full">
            <Progress
              value={props.value}
              className="border border-primary/20 bg-primary/20 h-2"
            />
          </div>
        </section>
        <div className="flex justify-between text-sm opacity-50 pt-3">
          <p>Goal: ${props.goal}</p>
          <p className="">${Math.round(props.value)} made</p>
        </div>
      </div>
    </div>
  )
}
