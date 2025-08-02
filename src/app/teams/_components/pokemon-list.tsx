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

export default function PokemonList(){
    
    const { data: teams, isLoading} = useTeams();
    const queryClient = useQueryClient();

    async function handleDeleteTeam(id: number){
        try{
            const response = await api.delete(`/teams/${id}`, {
                headers: {
                    Accept: "application/json",
                },
            });
            toast.success("Time deletado com sucesso!")
            queryClient.invalidateQueries({queryKey: ['teams']});
        }catch(error){
            toast.error("erro ao remover time!");
        }
    }

    if(isLoading){
        return (
            <div className="p-8 text-center text-lg font-medium">
                Carregando times...
            </div>
        );
    }

    return(
        <div>
            {teams?.length === 0 &&
                <div className="p-8 text-center text-lg font-medium w-full h-full flex flex-col justify-center items-center mt-4">
                    <h2 className="text-2xl font-semibold mb-4">Sem times por enquanto...</h2>
                    <Button className="max-w-[300px] cursor-pointer">
                        Criar um time
                    </Button>
                </div>
            }
            {teams?.map((item) => (
                <div key={item.id} className="bg-gray-200 dark:bg-stone-800 mb-4 mt-4 p-4 rounded-lg text-left">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold ml-2">{item.name}</h2>
                            <p className="mb-2 ml-2">Criado em: {formatDateBr(item.created_at)}</p>
                        </div>
                        <div>
                            <button className="bg-blue-600 p-2 m- rounded-sm text-white cursor-pointer hover:bg-blue-900"><Edit /></button>
                            <DeleteTeamDialog teamId={item.id} teamName={item.name} onConfirm={handleDeleteTeam}/>
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