'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { usePathname } from 'next/navigation'
import { ChevronsLeftRightEllipsisIcon, CircleSlash2Icon, Home, Inbox, Settings } from "lucide-react"
import { BookOpen } from "lucide-react"
import { CircleArrowOutDownLeft } from "lucide-react"

export default function Layout({ children }) {
  const pathname = usePathname()

  const adminItems = [
    {
      title: "Dashboard",
      url: "/teacher/dashboard",
      icon: Home,
    },
    {
        title: "Assignment",
        url: "/teacher/assignment",
        icon: BookOpen,
      },
      {
        title: "Attendance",
        url: "/teacher/attendance",
        icon: CircleArrowOutDownLeft,
      },
  ]
  return (
    <SidebarProvider  className="dark w-full">
      <AppSidebar items={adminItems} />
      <main  className="w-[100%]">
        <SidebarTrigger />
        <div className="m-12">
       
        {children}
        </div>
     
      </main>
    </SidebarProvider>
  )
}
