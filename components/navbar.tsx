import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/components/user-button";
import Image from "next/image";

export default function Navbar() {
    const pages = [
        {
            title: "About",
            link: "/about",
        },
        {
            title: "Services",
            link: "/services",
        },
        {
            title: "Items",
            link: "/items",
        },
    ]
    return (
        <nav className="fixed top-0 w-full z-50 transition navbar">
            <div className="max-w-[1500px] mx-auto px-4 py-2">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/">
                        <Image src="/yourlogo.png" alt="Logo" width={80} height={80} />
                    </Link>
                    {/* Links, Theme, & User */}
                    <div className="hidden sm:flex h-[40px] items-center text-lg md:text-lg font-medium mr-2 gap-4  transition-all">
                        <div className="flex items-center h-full text-base font-medium">
                            {pages.map((page, index) => (
                                <Link key={index} href={page.link} className="flex items-center hover:opacity-50 h-full transition duration-300 px-4 rounded-lg">
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