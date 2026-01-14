"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Music, Search, Settings, SquareLibrary, Stone } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
 const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Album",
    url: "/admin/album",
    icon: SquareLibrary ,
  },
  {
    title: "music",
    url: "#",
    icon: Music,
  },
  {
    title: "Genre",
    url: "/admin/genre",
    icon: Stone ,
  }
  
  
]
export function AdminSidebar() {
    const pathName = usePathname()

    
  

  return (
    <Sidebar>

        <SidebarHeader>
            <Link href="/admin">
          
          <div className="flex items-center space-x-3 p-3 ">
            <Music size={30} className="text-primary" />
            <span className="text-2xl font-bold">Iftiin </span>


          </div>
            </Link>
          <hr />
         
        </SidebarHeader>



      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathName == item.url}>
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

      <SidebarFooter>
          <hr />
        <div className="flex items-center space-x-3 p-3 ">
            <Music size={30} className="text-primary" />
            <span className="text-2xl font-bold">Iftiin </span>


          </div>

      </SidebarFooter>

    </Sidebar>
  )

}


