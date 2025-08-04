"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { ThemeButton } from "@/components/ui/theme-button";
import { useTeams } from "@/hooks/useTeams";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import { toast } from "sonner";
import { MobileSidebar, Sidebar } from "@/components/ui/sidebar";
import { Edit, Trash } from "lucide-react";
import PokemonList from "./_components/pokemon-list";

export default function TeamsPage() {

    return (
        <div className="flex flex-col md:flex-row pt-14 md:pt-0 bg-gray-100 dark:bg-transparent">
            <Sidebar />
            <MobileSidebar />
            <div className="w-full p-6 max-h-screen overflow-y-auto">
                <h1 className="text-3xl font-bold">Seus Times</h1>
                <PokemonList />
                <ThemeButton />
            </div>
        </div>
    );
}