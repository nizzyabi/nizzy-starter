import { cn } from "@/lib/utils"
import Link from "next/link";

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
        
        link: "/payments",
        title: "Payments",
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
    return (
        <div className="space-y-4 flex flex-col h-full mt-12" >
            <div className="space-y-2">
                {sidebarPages.map((page, index) => (
                    <Link 
                    key={page.link} 
                    href={page.link} 
                    className={cn(
                        "text-sm group flex py-2 w-full justify-start font-light cursor-pointer rounded "
                    )}>
                        <div className="flex border-b border-primary/70 w-full pb-3 ">
                                <p className="mt-1 text-lg font-normal hover:text-primary/90 duration-300">{page.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}