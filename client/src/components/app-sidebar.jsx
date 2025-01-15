import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useSelector } from "react-redux"
import SidebarTheme from "./ui/sidebar-theme"

// Menu items.


export function AppSidebar(props) {

  return (
 
  <Sidebar>
    <SidebarTheme>
    <SidebarContent className="backdrop-blur-sm  rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.07)] p-8 border border-white/10">
        <SidebarGroup>
          <SidebarGroupLabel >Sikshyalaya</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {props.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
               
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarTheme>
   
    </Sidebar>

  
  )
}
