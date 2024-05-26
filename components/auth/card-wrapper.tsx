'use client'

import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"
import { BackButton } from "@/components/auth/back-button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

interface CardWrapperProps {
    children: React.ReactNode
    headerTitle: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export const CardWrapper = ({
    children,
    headerTitle,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="mx-auto max-w-sm bg-secondary/90 border border-primary/20 rounded-[5px] px-7 mt-12 md:mt-[60px]">

            <CardHeader>
                <Header title={headerTitle} />
            </CardHeader>

            <div>{children}</div>

            {showSocial && (
                <div>
                    <Social />
                </div>
            )}

            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}