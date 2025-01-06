import { ReactNode } from "react";
import { DashboardHeader } from "./components/header";
import { ModalProvider } from "@/context/modal";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
           
                <DashboardHeader />
                {children}
          
        </>
    )
}