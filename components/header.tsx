import { PlayIcon, RocketIcon, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export const Header = () => {
    return (
        <div>
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center space-y-12">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Clone. Build. Ship.</h2>
              <p className="mt-4 text-xl">
              Build your SaaS faster with our fully customizable template.
              </p>
              <div className="flex justify-center items-center mt-4">
                <Link
                    className="flex justify-center items-center w-40 transition duration-150 ease-in-out font-medium rounded px-4 py-1.5 text-secondary bg-primary"
                    href="/overview"
                >
                   <Sparkles className="mr-1 h-5 w-5"/> Get Started
                </Link>
            </div>
            </div>
            
            <p>Join 1000+ developers already shipping</p>
          </div>
          <div className="hidden md:block rounded-lg shadow-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <iframe
                title="Product Video"
                src="https://www.youtube.com/embed/VIDEO_ID" // Replace VIDEO_ID with your video ID or video URL
                width="640"
                height="360"
                className="object-cover w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="mt-20 flex justify-center space-x-8">
          <img
            alt="Next.js"
            height="24"
            src="/placeholder.svg"
            style={{
              aspectRatio: "80/24",
              objectFit: "cover",
            }}
            width="80"
          />
          <img
            alt="Stripe Logo"
            height="24"
            src="/placeholder.svg"
            style={{
              aspectRatio: "80/24",
              objectFit: "cover",
            }}
            width="80"
          />
          <img
            alt="Resend"
            height="24"
            src="/placeholder.svg"
            style={{
              aspectRatio: "80/24",
              objectFit: "cover",
            }}
            width="80"
          />
          <img
            alt="DB"
            height="24"
            src="/placeholder.svg"
            style={{
              aspectRatio: "80/24",
              objectFit: "cover",
            }}
            width="80"
          />
        </div>
      </div>
    )
}