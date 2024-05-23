import { cn } from "@/lib/utils"
import Link from "next/link";
import { UserButton } from "./user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

{/* Sidebar links & title*/}
const sidebarPages = [
    {
        link: "/",
        title: "Home",
    },
    {
        link: "/profile",
        title: "Profile",
    },
    {
        
        link: "/services",
        title: "Services",
    },
    {
        link: "/settings",
        title: "Settings",
    },
]

const socials = [
    {
        link: "https://github.com/NizarAbiZaher",
        title: "Github"
    },
    {
        link: "https://www.youtube.com/@NizzyABI",
        title: "Youtube",
    },
    {
        link: "https://twitter.com/NizarAbiZaher",
        title: "Twitter",
    },
    {
        link: "https://www.linkedin.com/in/nizarabizaher/",
        title: "Tiktok",
    },
    {
        link: "https://www.instagram.com/nizarabizaher/",
        title: "Instagram",
    },
    {
        link:'https://discord.gg/nizar',
        title: "Discord",
    }
]
export const Sidebar = () => {
    const session = useCurrentUser()
    const Logout = () => {
        signOut()
    }
    return (
        <div className="flex flex-col justify-between pl-2">
            <div className="flex">
                <Image src='/yourlogo.png' alt='logo' height={1} width={30} />
                <p className="font-bold pt-1 ml-1">Nizzy Starter Kit</p>
            </div>

            <div className=" pt-8">
                <div className="space-y-4">
                    {!session && (
                        <Link href="/login" className="group flex py-2 w-full justify-start font-light cursor-pointer">
                            <div className="flex w-full pb-3">
                                <p className="mt-1 font-medium ">Sign Up</p>
                            </div>
                        </Link>
                    )}
                    <div className="ml-2">
                        <h1 className="font-semibold">Main</h1>
                        {sidebarPages.map((page) => (
                            <Link 
                                key={page.link} 
                                href={page.link} 
                                className={cn(
                                    "group flex py-1.5 w-full justify-start font-light cursor-pointer"
                            )}>
                                <div className="flex w-full">
                                    <p className=" font-normal   text-primary/40">{page.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="ml-2">
                        <h1 className="font-semibold">Socials</h1>
                        {socials.map((page) => (
                            <Link 
                                key={page.link} 
                                href={page.link} 
                                className={cn(
                                    "group flex w-full justify-start font-light cursor-pointer py-1.5"
                            )}>
                                <div className="flex w-full">
                                    <p className="font-normal   text-primary/40">{page.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {session && (
                        <Link href="/login" className="group flex py-2 w-full justify-start  cursor-pointer rounded ml-2">
                            <div className="flex  w-full pb-3" onClick={Logout}>
                                <p className="mt-1 font-semibold">Logout</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
