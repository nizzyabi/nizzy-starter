import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import React from 'react'

export const Header = () => {
  return (
    <div className="space-y-20 mt-32">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-center lg:text-left ">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Clone. Build. Ship.
          </h2>
          <p className="mt-4 text-lg text-foreground">
            Build your SaaS faster with our fully customizable template.
          </p>
          <div className="flex justify-center lg:justify-start items-center mt-4">
            <Link href="/overview">
              <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Get Started</span>
              </Button>
            </Link>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 relative">
            <div className="absolute top-0 left-0 bg-red-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            <div className="absolute top-0 left-0 bg-yellow-400 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            <div className="absolute top-0 left-0 bg-green-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            <div className="absolute top-0 left-0 bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
