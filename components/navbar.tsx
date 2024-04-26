import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/components/user-button";

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
        <nav className="fixed top-0 w-full z-50 transition">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/">
                        <h1 className="group text-2xl font-bold ">
                            <span>
                                your
                            </span>
                            <span className="ransition-all duration-300 ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 ">
                                logo
                            </span>
                        </h1>
                    </Link>
                    {/* Links, Theme, & User */}
                    <div className="md:flex h-[40px] items-center text-lg md:text-lg font-medium mr-2 gap-4 navbar transition-all">
                        <div className="flex items-center lg:gap-4 h-full text-base lg:text-lg font-medium">
                            {pages.map((page, index) => (
                                <Link key={index} href={page.link} className="flex items-center hover:opacity-50 h-full transition duration-300 px-4 rounded-lg">
                                    {page.title}
                                </Link>
                            ))}
                        </div>
                        <div className="flex h-full gap-6 no-wrap">
                            <ModeToggle />
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}