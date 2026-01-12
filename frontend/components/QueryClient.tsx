"use client"
import {
 
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

const queryClient = new QueryClient();


const AppQueryClient = ({ children }:Readonly<{
  children: React.ReactNode;
}>) => {
    return (
        <QueryClientProvider client={queryClient}>
           <ThemeProvider
                     attribute="class"
                     defaultTheme="dark"
                     enableSystem
                     disableTransitionOnChange
                   >
                   {children}
                     <Toaster position="top-right" />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
export default AppQueryClient;


