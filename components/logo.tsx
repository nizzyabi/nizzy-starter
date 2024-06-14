import { Squircle } from 'lucide-react'

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <Squircle className="w-12 h-12 text-primary group-hover:-rotate-12 transition-all duration-300" />
      <span className="text-xl group-hover:translate-x-0.5 transition-all duration-300">
        YourCompany
      </span>
    </div>
  )
}
