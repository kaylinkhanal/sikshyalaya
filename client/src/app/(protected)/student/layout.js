import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Home, Inbox, Settings } from "lucide-react"
import CartItems from "@/components/cart-items"
import AssignmentProvider from "./assignmentProvider"
import { NotificationIcon } from "@/components/notification"

const studentItems = [
  {
    title: "Dashboard",
    url: "students/dashboard",
    icon: Home,
  },
  {
    title: "Course",
    url: "/students/course",
    icon: Inbox,
  },
  {
    title: "Assignments",
    url: "/student/assignments",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]




export default function Layout({ children }) {
  return (
    <AssignmentProvider>
    <SidebarProvider>
      <AppSidebar items={studentItems} />
      <main>
        <SidebarTrigger />
        {children}

        <CartItems/>
        <div className="absolute right-32 top-6">
        <NotificationIcon/>
          </div> 
      </main>
    </SidebarProvider>
    </AssignmentProvider>

  )
}
