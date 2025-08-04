import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PokemonCard from "@/components/ui/pokemon-card";
import { useTeams } from "@/hooks/useTeams";
import { BadgeColorByType } from "@/lib/custom-badge";
import { formatDateBr } from "@/lib/date";
import { capitalizeFirstLetter } from "@/lib/text";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { DeleteTeamDialog } from "./delete-team-alert";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UpdateTeamDialog } from "./update-team-modal";

export default function PokemonList() {
    const router = useRouter()

    const { data: teams, isLoading } = useTeams();
    const queryClient = useQueryClient();

    async function handleDeleteTeam(id: number) {
        try {
            const response = await api.delete(`/teams/${id}`, {
                headers: {
                    Accept: "application/json",
                },
            });
            toast.success("Time deletado com sucesso!")
            queryClient.invalidateQueries({ queryKey: ['teams'] });
        } catch (error) {
            toast.error("erro ao remover time!");
        }
    }

    if (isLoading) {
        return (
            <div className="p-8 text-center text-lg font-medium">
                Carregando times...
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse">
            {teams?.length === 0 &&
                <div className="p-8 text-center text-lg font-medium w-full h-full flex flex-col justify-center items-center mt-4">
                    <h2 className="text-2xl font-semibold mb-4">Sem times por enquanto...</h2>
                    <Button className="max-w-[300px] cursor-pointer" onClick={() => router.push("/create")}>
                        Criar um time
                    </Button>
                </div>
            }
            {teams?.map((item) => (
                <div onClick={() => console.log(item)} key={item.id} className="bg-gray-200 dark:bg-stone-800 mb-4 mt-4 p-4 rounded-lg text-left border border-gray-300 dark:border-stone-900">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h2 className="text-2xl dark:text-white text-gray-800 font-semibold ml-2">{item.name}</h2>
                            <p className="mb-2 ml-2 text-gray-500 text-sm">Criado em: {formatDateBr(item.created_at)}</p>
                        </div>
                        <div className="flex gap-1">
                            <UpdateTeamDialog team={item.pokemons} teamId={item.id} />
                            <DeleteTeamDialog teamId={item.id} teamName={item.name} onConfirm={handleDeleteTeam} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap">
                        {item.pokemons.map((pokemon) => (
                            <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} image_url={pokemon.image_url} types={pokemon.types} />
                        ))}
                    </div>
                </div>
            ))}
            <Toaster />
        </div>
    )
}