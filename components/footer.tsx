import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="flex justify-center bg-secondary dark:bg-secondary/50 py-6 w-full">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src="/yourlogo.svg" alt="Logo" width={50} height={80} />
        </Link>
        <span className="text-sm">
          &copy; 2024 YourCompany. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
