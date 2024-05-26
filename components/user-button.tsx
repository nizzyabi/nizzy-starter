'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { Book, CreditCard, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const UserButton = () => {
    const userButtonItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Docs",
            href: "/docs",
            icon: Book,
        },
        {
            label: "Billing",
            href: "/payments",
            icon: CreditCard,
        },
        {
            label: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ];

    // Random gradient colors for Avatar
    const gradientClasses = [
        "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500",
        "bg-gradient-to-r from-red-500 to-orange-500",
        "bg-gradient-to-r from-amber-500 to-pink-500",
        "bg-gradient-to-r from-violet-200 to-pink-200",
        "bg-gradient-to-r from-emerald-400 to-cyan-400",
        "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    ];

    const getRandomGradient = () => {
        const randomIndex = Math.floor(Math.random() * gradientClasses.length);
        return gradientClasses[randomIndex];
    };

    const [gradientClass, setGradientClass] = useState(getRandomGradient());

    const router = useRouter();
    const session = useCurrentUser();

    const onClick = () => {
        router.push('/register');
    };
    const Logout = () => {
        signOut();
        router.push('/login');
    };

    // Set a new random gradient each time the component mounts
    useEffect(() => {
        setGradientClass(getRandomGradient());
    }, []);

    return (
        <>
            {!session ? (
                <div>
                    <Link href='/register' className='flex md:hidden items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:bg-primary/10 px-2 py-2'>
                        <LogOut className='h-5.5 w-5' />
                    </Link>

                    <Button
                        type="submit"
                        onClick={onClick}
                        className="px-5 rounded-[5px] hidden md:flex"
                    >
                        Get Started
                    </Button>
                </div>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {/* User Avatar / Logo */}
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                                src={session.image ? session.image : ''}
                                alt="pfp"
                            />
                            <AvatarFallback className={gradientClass}></AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    {/* Content */}
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuLabel className="py-0 pt-1">{session?.name}</DropdownMenuLabel>
                        <DropdownMenuLabel className="opacity-70 text-sm font-normal">{session?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* Main Icons */}
                        <DropdownMenuGroup>
                            {userButtonItems.map((item, index) => (
                                <DropdownMenuItem key={index}>
                                    <Link href={item.href} className="flex">
                                        <item.icon className="mr-2 mt-0.5 h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        {/* Logout Button */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={Logout} className="cursor-pointer">
                            <LogOut className="mr-2 mt-0.5 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
};

export default UserButton;
