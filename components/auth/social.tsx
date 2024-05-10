'use client'

import { Button } from "@/components/ui/button"

export const Social = () => {
    // add onClick event to the button

    return (
        <div className="grid gap-2">
            <Button className="rounded-[5px] w-full border border-primary/20 bg-secondary text-primary hover:bg-primary/10">
                Login with Google
            </Button>
            <Button className="rounded-[5px] w-full border border-primary/20 bg-secondary text-primary hover:bg-primary/10">
                Login with Github
            </Button>
        </div>
    )
}