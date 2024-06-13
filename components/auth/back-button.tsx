'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface BackButtonProps {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className="w-full mt-2 text-blue-500"
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}
