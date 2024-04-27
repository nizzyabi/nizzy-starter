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
import { CreditCard, Github, LogOut, Settings, Twitter, UserIcon, Youtube } from "lucide-react"
import Link from "next/link"


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
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* User Avatar / Logo */}
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>   
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
                <DropdownMenuItem>
                    <LogOut className="mr-2 mt-0.5 h-4 w-4"/>
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}