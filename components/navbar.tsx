import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { UserButton } from "@/components/user-button";
import { MobileSidebar } from "@/components/mobile-sidebar";

export const navPages = [
    {
        title: "Dashboard",
        link: "/dashboard",
    },
    {
        title: "Pricing",
        link: "#pricing",
    },
    {
        title: "Items",
        link: "#items",
    },
]

export const Navbar = () => {
    
    return (
        <nav className="top-0 w-full z-50 transition pb-20">
            <div className="max-w-[1600px] mx-auto px-4 py-2">
                <div className="flex justify-between items-center">
                    <MobileSidebar />
                    {/* Logo */}
                    <Link href="/">
                        <Image src="/yourlogo.png" alt="Logo" width={80} height={80} />
                    </Link>
                    {/* Links, Theme, & User */}
                    <div className="hidden sm:flex h-[40px] items-center text-lg md:text-lg font-medium mr-2 gap-4  transition-all">
                        <div className="flex items-center h-full text-base font-medium">
                            {navPages.map((page, index) => (
                                <Link key={index} href={page.link} className="flex items-center hover:bg-primary/10 h-full transition duration-300 px-4 rounded-lg">
                                    {page.title}
                                </Link>
                            ))}
                        </div>
                        <div className="flex h-full gap-6">
                            <ModeToggle />
                            <UserButton />
                        </div>   
                    </div>
                </div>
            </div>
        </nav>
    )
}