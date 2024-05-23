import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <div className="space-y-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center text-center lg:text-left ">
                    <h2 className="text-4xl font-extrabold sm:text-5xl">Clone. Build. Ship.</h2>
                    <p className="mt-4 text-lg text-primary/50">
                        Build your SaaS faster with our fully customizable template.
                    </p>
                    <div className="flex justify-center lg:justify-start items-center mt-4">
                        <Link
                            className="flex justify-center items-center w-40 transition duration-150 ease-in-out font-medium rounded px-4 py-1.5 text-secondary bg-primary"
                            href="/overview"
                        >
                            <Sparkles className="mr-1 h-5 w-5" /> Get Started
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center md:h-full">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/PHI7F9AQhBI?si=ueaPGvDQM6GDL-ne" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                </div>
            </div>
        </div>
    );
};
