import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'
import { UserButton } from '@/components/user-button'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { Logo } from '@/components/logo'

export const navPages = [
  {
    title: 'Dashboard',
    link: '/dashboard'
  },
  {
    title: 'Pricing',
    link: '/#pricing'
  },
  {
    title: 'Items',
    link: '/#items'
  }
]

export const Navbar = () => {
  return (
    <nav className="top-0 w-full z-50 transition">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <MobileSidebar />
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>
          {/* Links, Theme, & User */}
          <div className="hidden sm:flex h-[40px] items-center text-lg md:text-lg font-medium gap-4 transition-all">
            <div className="flex items-center h-full text-base font-medium">
              {navPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.link}
                  className="flex items-center hover:text-primary hover:bg-primary/10 h-full transition duration-300 px-4 rounded-md"
                >
                  {page.title}
                </Link>
              ))}
            </div>
            <div className="flex h-full gap-4">
              <ModeToggle />
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
