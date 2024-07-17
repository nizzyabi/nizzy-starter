'use client'
import { PanelRightClose } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from '@/components/sidebar'
import { useState } from 'react'

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false)

  const openSidebar = () => setOpen(true)
  const closeSidebar = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="sm:hidden pr-4 text-primary" onClick={openSidebar}>
        <PanelRightClose className="h-6 w-6 hover:text-primary/50 duration-300" />
      </SheetTrigger>
      <SheetContent side="left" className="p-6 border-none w-80 bg-secondary">
        <Sidebar closeSidebar={closeSidebar} />
      </SheetContent>
    </Sheet>
  )
}
