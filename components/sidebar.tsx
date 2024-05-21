import { cn } from "@/lib/utils"
import Link from "next/link";
import { UserButton } from "./user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

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
    {
        link: "https://github.com/NizarAbiZaher",
        title: "Github"
    },
    {
        link: "https://www.youtube.com/@NizzyABI",
        title: "Youtube",
    },
    {
        link:'https://discord.gg/nizar',
        title: "Community",
    }
]
export const Sidebar = () => {
    const router = useRouter()
    const session = useCurrentUser()
    const Logout = () => {
        logout();
        router.push('/login')
    }
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="space-y-4 pt-8">
                <div className="space-y-1">
                    {!session && (
                        <Link href="/login" className="text-sm group flex py-2 w-full justify-start font-light cursor-pointer rounded">
                            <div className="flex border-b border-primary/70 w-full pb-3">
                                <p className="mt-1 text-lg font-normal hover:text-primary/50 duration-300">Sign Up</p>
                            </div>
                        </Link>
                    )}
                    {sidebarPages.map((page) => (
                        <Link 
                        key={page.link} 
                        href={page.link} 
                        className={cn(
                            "text-sm group flex py-2 w-full justify-start font-light cursor-pointer rounded"
                        )}>
                            <div className="flex border-b border-primary/70 w-full pb-3 ">
                                <p className="mt-1 text-lg font-normal hover:text-primary/50 duration-300">{page.title}</p>
                            </div>
                        </Link>
                    ))}
                    {session && (
                        <Link href="/login" className="text-sm group flex py-2 w-full justify-start font-light cursor-pointer rounded">
                            <div className="flex border-b border-primary/70 w-full pb-3" onClick={Logout}>
                                <p className="mt-1 text-lg font-normal hover:text-primary/50 duration-300">Logout</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            {session && (
                <div className="flex">
                    <Avatar>
                        <AvatarImage 
                        src={session?.image ? session.image : ''} 
                        alt="pfp"  
                        />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"/>
                    </Avatar>
                    <p className="mt-3 ml-2 font-medium">{session?.name}</p>
                </div>
            )}
        </div>
    )
}
