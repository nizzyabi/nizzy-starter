'use client'
import { cn } from '@/lib/utils'
interface AvatarCirclesProps {
  className?: string
}

export default function AvatarCircles({ className }: AvatarCirclesProps) {
  return (
    <div
      className={cn(
        'z-10 flex items-center justify-center -space-x-4 rtl:space-x-reverse pt-3',
        className
      )}
    >
      <img
        className="h-9 w-9 rounded-full border-2 border-secondary"
        src="/testimonials/john-doe.jpg"
        alt=""
      />
      <img
        className="h-9 w-9 rounded-full border-2 border-secondary"
        src="/testimonials/john-doe.jpg"
        alt=""
      />
      <img
        className="h-9 w-9 rounded-full border-2 border-secondary"
        src="/testimonials/john-doe.jpg"
        alt=""
      />
      <img
        className="h-9 w-9 rounded-full border-2 border-secondary"
        src="/testimonials/john-doe.jpg"
        alt=""
      />
      <img
        className="h-9 w-9 rounded-full border-2 border-secondary"
        src="/testimonials/john-doe.jpg"
        alt=""
      />
    </div>
  )
}
