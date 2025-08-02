"use client"
import { MobileSidebar, Sidebar } from "@/components/ui/sidebar";

export default function CreateTeam(){
    return(
            <div className="flex flex-col md:flex-row pt-14 md:pt-0">
                <Sidebar />
                <MobileSidebar />
                <div className="w-full p-6 max-h-screen overflow-y-auto">
                    <h1 className="text-3xl font-bold">Criar Time</h1>
                </div>
            </div>
    )
}