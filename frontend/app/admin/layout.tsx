"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import React, { useState, useEffect } from "react";
import { AdminSidebar } from "./_components/amdminSidebar";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    useEffect(() => {
        const checkScreen = () => {
           
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkScreen(); 
        window.addEventListener('resize', checkScreen); 
        
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

 
    if (isDesktop === null) return null;

    return (
        <SidebarProvider defaultOpen={isDesktop}>
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
            
                <div className="p-4 lg:hidden">
                    <SidebarTrigger />
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}

export default AdminLayout;