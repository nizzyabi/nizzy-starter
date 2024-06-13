import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="space-y-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center lg:text-left ">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Clone. Build. Ship.
          </h2>
          <p className="mt-4 text-lg text-primary/50">
            Build your SaaS faster with our fully customizable template.
          </p>
          <div className="flex justify-center lg:justify-start items-center mt-4">
            <Link
              className="flex justify-center items-center w-40 transition duration-150 ease-in-out font-medium rounded-md px-4 py-2.5 text-secondary bg-primary"
              href="/overview"
            >
              <Sparkles className="mr-1 h-5 w-5" fill="secondary" /> Get Started
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/Q6jDdtbkMIU?si=YtgU89RhYiwt5-U5"
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="w-full max-w-2xl h-auto aspect-video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
