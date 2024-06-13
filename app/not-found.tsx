import { Error404 } from '@/components/icons'

export default function NotFound() {
  return (
    <main className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 relative">
        <Error404 className="w-[500px] h-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-primary/5 -z-10" />
        <div className="text-6xl">
          <span>Error</span> <span className="text-primary font-bold">404</span>
        </div>
        <span className="text-4xl">Page not found!</span>
      </div>
    </main>
  )
}
