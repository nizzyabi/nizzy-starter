'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps {
    label: string
    href: string
}

export const BackButton = ({
    label,
    href
}: BackButtonProps) => {
    return (
        <Button
            variant="link"
            className="font-normal w-full mt-2"
            size="sm"
            asChild
        >
            <Link href={href}>
                <p className="hover:underline">{label}</p>
            </Link>
        </Button>
    )
}