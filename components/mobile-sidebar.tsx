'use client'
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"

{/* Button to trigger sidebar contents */}
export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="sm:hidden pr-4 text-primary">
                <Menu className="h-8 w-8 hover:text-slate-100/50 duration-300"/>
            </SheetTrigger>
            <SheetContent side="left" className="p-6 border-none w-80">
               <Sidebar />
            </SheetContent>
        </Sheet>
    )
}