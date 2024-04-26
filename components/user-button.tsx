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
import { UserIcon } from "lucide-react"
import Link from "next/link"


export default function UserButton() {
    const userButtonItems = [
        {
            label: "Profile",
            href: "/profile",
            icon: UserIcon
        }
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>   
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {userButtonItems.map((item, index) => (
                        <DropdownMenuItem key={index}>
                            <Link href={item.href} className="flex">
                                <item.icon className="mr-2 h-4 w-4"/>
                                <span>{item.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}