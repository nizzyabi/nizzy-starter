'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const Social = () => {
    const onClick = (provider: 'google' | 'github') => {
        signIn(provider, { 
            callbackUrl: '/'
        })
    }
    return (
        <div className="flex gap-2 mt-3">
            <Button 
                className="rounded-[5px] w-full border border-primary/20 bg-secondary text-primary hover:bg-primary/10 text-md"
                onClick={() => onClick('google')}
            >
                <FaGoogle className="mr-2"/> Google
            </Button>
            <Button 
                className="rounded-[5px] w-full border border-primary/20 bg-secondary text-primary hover:bg-primary/10 text-md" 
                onClick={() => onClick('github')}
            >
                <FaGithub className="mr-2"/> Github
            </Button>
        </div>
    )
}