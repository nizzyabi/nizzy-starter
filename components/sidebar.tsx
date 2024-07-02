import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { Logo } from '@/components/logo'

{
  /* Sidebar links & title*/
}
const sidebarPages = [
  {
    link: '/',
    title: 'Home'
  },
  {
    link: '#profile',
    title: 'Profile'
  },
  {
    link: '#purchases',
    title: 'Purchases'
  }
]

const socials = [
  {
    link: 'https://github.com/NizarAbiZaher',
    title: 'Github'
  },
  {
    link: 'https://www.youtube.com/@NizzyABI',
    title: 'Youtube'
  },
  {
    link: 'https://twitter.com/NizarAbiZaher',
    title: 'Twitter'
  },
  {
    link: 'https://www.linkedin.com/in/nizarabizaher/',
    title: 'Tiktok'
  },
  {
    link: 'https://www.instagram.com/nizarabizaher/',
    title: 'Instagram'
  },
  {
    link: 'https://discord.gg/',
    title: 'Discord'
  }
]
export const Sidebar = () => {
  const session = useCurrentUser()
  const Logout = () => {
    signOut()
  }
  return (
    <div className="flex flex-col justify-between pl-2">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex pt-4">
        <ModeToggle />
      </div>
      <div className=" pt-3">
        <div className="space-y-4">
          <div className="ml-2">
            <h1 className="text-xl font-semibold">Main</h1>
            {sidebarPages.map((page) => (
              <Link
                key={page.link}
                href={page.link}
                className={cn(
                  'group flex py-1.5 w-full justify-start font-light cursor-pointer'
                )}
              >
                <div className="flex w-full">
                  <p className="font-normal text-foreground/75">{page.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="ml-2">
            <h1 className="text-xl font-semibold">Socials</h1>
            {socials.map((page) => (
              <Link
                key={page.link}
                href={page.link}
                className={cn(
                  'group flex w-full justify-start font-light cursor-pointer py-1.5'
                )}
              >
                <div className="flex w-full">
                  <p className="font-normal text-foreground/75">{page.title}</p>
                </div>
              </Link>
            ))}
          </div>
          {session ? (
            <Link
              href="/login"
              className="group flex py-2 w-full justify-start cursor-pointer rounded ml-2 font-bold text-xl"
              onClick={Logout}
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/login"
              className="group flex pt-2 w-full justify-start font-light cursor-pointer"
            >
              <div className="flex w-full ml-2 pb-3">
                <p className="font-semibold ">Sign Up</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
