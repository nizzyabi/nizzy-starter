'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user"
import { CreditCard, Github, LogOut, Settings, Twitter, UserIcon, Youtube } from "lucide-react"
import Link from "next/link"
import { logout } from '@/actions/logout'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const UserButton = () => {
    const userButtonItems = [
        {
            label: "Profile",
            href: "/profile",
            icon: UserIcon
        },
        {
            label: "Payments",
            href: "/payments",
            icon: CreditCard
        },
        {
            label: "Settings",
            href: "/settings",
            icon: Settings
        }
    ]
    const router = useRouter();
    const session = useCurrentUser();
    const onClick = () => {
        router.push('/register')
      }
    const Logout = () => {
        signOut();
        router.push('/login')
    }
    return (
       <>
        {!session ? (
            <div>
                <Link href='/register' className='flex md:hidden items-center justify-center  rounded-lg cursor-pointer transition duration-300 hover:bg-primary/10 px-2 py-2'>
                    <LogOut className='h-5.5 w-5'/>
                </Link>
          
                <Button
                    type="submit"
                    onClick={onClick}
                    className="px-5 rounded-[5px] hidden md:flex"
                >
                    Get Started
                </Button>
            </div>
        ):(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* User Avatar / Logo */}
                    <Avatar className="cursor-pointer">
                    <AvatarImage 
                        src={session.image ? session.image : ''} 
                        alt="pfp" 
                        
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></AvatarFallback>   
                </Avatar>
            </DropdownMenuTrigger>
            {/* Content */}
            <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Main Icons */}
                <DropdownMenuGroup>
                    {userButtonItems.map((item, index) => (
                        <DropdownMenuItem key={index}>
                            <Link href={item.href} className="flex">
                                <item.icon className="mr-2 mt-0.5 h-4 w-4"/>
                                <span>{item.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                {/* Socials */}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="flex" href='https://yourgithublink.com'>
                        <Github className="mr-2 mt-0.5 h-4 w-4"/>
                        <span>GitHub</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex" href='https://youryoutubelink.com'>
                        <Youtube className="mr-2 mt-0.5 h-4 w-4"/>
                        <span>Youtube</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex" href='https://yourtwitterlink.com'>
                        <Twitter className="mr-2 mt-0.5 h-4 w-4"/>
                        <span>Twitter</span>
                    </Link>
                </DropdownMenuItem>
                {/* Logout Button */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={Logout} className="cursor-pointer">
                    <LogOut className="mr-2 mt-0.5 h-4 w-4"/>
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        )
       }
       </>
    )
}