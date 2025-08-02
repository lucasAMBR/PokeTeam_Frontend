"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { ThemeButton } from "@/components/ui/theme-button";
import { useTeams } from "@/hooks/useTeams";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import { toast } from "sonner";
import { MobileSidebar, Sidebar } from "@/components/ui/sidebar";

export default function TeamsPage() {
    const { data: teams} = useTeams();

    function exibName(name:string){
        toast(`clicou em: ${name}`)
    }

    const BadgeColorByType = (type: string): string => {
        switch (type.toLowerCase()) {
            case "normal":
                return "bg-gray-400 text-white";
            case "fire":
                return "bg-red-600 text-white";
            case "water":
                return "bg-blue-600 text-white";
            case "grass":
                return "bg-green-600 text-white";
            case "electric":
                return "bg-yellow-400 text-black";
            case "ice":
                return "bg-cyan-300 text-black";
            case "fighting":
                return "bg-red-800 text-white";
            case "poison":
                return "bg-purple-600 text-white";
            case "ground":
                return "bg-yellow-700 text-white";
            case "flying":
                return "bg-indigo-300 text-black";
            case "psychic":
                return "bg-pink-500 text-white";
            case "bug":
                return "bg-lime-600 text-white";
            case "rock":
                return "bg-yellow-800 text-white";
            case "ghost":
                return "bg-purple-800 text-white";
            case "dragon":
                return "bg-indigo-800 text-white";
            case "dark":
                return "bg-gray-800 text-white";
            case "steel":
                return "bg-gray-500 text-white";
            case "fairy":
                return "bg-pink-300 text-black";
            default:
                return "bg-zinc-500";
        }
    };

    function capitalizeFirstLetter(str: string): string {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function formatDateBr(rawDate: string): string {
        const date = new Date(rawDate);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam do zero
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }


    return (
    <div className="flex flex-col md:flex-row pt-14 md:pt-0">
        <Sidebar />
        <MobileSidebar />
        <div className="w-full p-6">
            <h1 className="text-3xl font-bold">Seus Times</h1>
            {teams?.map((item) => (
                <div key={item.id} className="bg-gray-200 dark:bg-stone-800 mb-4 mt-4 p-4 rounded-lg text-left">
                    <h2 className="text-2xl font-bold ml-2">{item.name}</h2>
                    <p className="mb-2 ml-2">Criado em: {formatDateBr(item.created_at)}</p>
                    <div className="flex flex-col md:flex-row flex-wrap">
                    {item.pokemons.map((pokemon) => (
                        <Card className="flex-1 m-1 flex text-center min-w-[300px] transition-transform duration-300 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:scale-105">
                            <CardHeader className="text-xl font-semibold">
                                {capitalizeFirstLetter(pokemon.name)}
                            </CardHeader>
                            <div className="flex justify-center">
                                <div className="bg-stone-600 p-4 rounded-full w-[100px] h-[100px] flex justify-center items-center">
                                    <Image width={80} height={80} alt="pokemon" src={pokemon.image_url} />
                                </div>
                            </div>
                            <CardContent>
                                {JSON.parse(pokemon.types).map((type: string)=>(
                                    <Badge variant="secondary" className={`${BadgeColorByType(type)} m-1 px-4 py-1`}>{capitalizeFirstLetter(type)}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                </div>
            ))}
            <Toaster
                position="top-right"
                toastOptions={{
                    classNames: {
                        toast: "bg-red-800 text-white border border-zinc-700",
                        description: "text-sm text-zinc-400",
                        actionButton: "bg-red-600 text-white",
                    },
                }}
            />
            <ThemeButton />
        </div>
    </div>
  );
}