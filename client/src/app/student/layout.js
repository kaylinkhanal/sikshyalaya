import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Home, Inbox, Settings } from "lucide-react"
import CartItems from "@/components/cart-items"
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
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar items={studentItems} />
      <main>
        <SidebarTrigger />
        {children}
        <CartItems/>
      </main>
    </SidebarProvider>
  )
}
