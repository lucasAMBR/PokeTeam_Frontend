"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { usePokemonsByGeneration } from "@/hooks/UsePokemonsByGeneration";
import { api } from "@/lib/axios";
import { capitalizeFirstLetter } from "@/lib/text";
import { Pokemon } from "@/types/pokemon";
import { ReducedPokemon } from "@/types/PokemonReduced";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Trash, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateTeamDialogProps {
    team: Pokemon[],
    teamId: number
}

export function UpdateTeamDialog({ team, teamId }: UpdateTeamDialogProps) {

    const queryClient = useQueryClient();

    const [dialogSection, setDialogSection] = useState("remove");

    const [choosedGeneration, setChoosedGeneration] = useState("primeira");
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedPokemons, setSelectedPokemon] = useState<{ name: string; image_url: string; types: string[] }[]>([]);

    function handleOpen() {
        const simplified = team.map((p) => ({
            name: p.name,
            image_url: p.image_url,
            types: JSON.parse(p.types),
        }));
        setSelectedPokemon(simplified);
    }


    function getGenerationNumber(gen: string): number {
        switch (gen) {
            case "primeira":
                return 1;
            case "segunda":
                return 2;
            case "terceira":
                return 3;
            case "quarta":
                return 4;
            case "quinta":
                return 5;
            case "sexta":
                return 6;
            case "setima":
                return 7;
            case "oitava":
                return 8;
            case "nona":
                return 9;
            default:
                return 0;
        }
    }

    function addPokemonSelection(name: string, sprite: string, types: string[]) {
        if (selectedPokemons.length >= 5) {
            toast.error("Tamanho máximo da equipe atingido!");
            return;
        }

        setSelectedPokemon((prev) => [
            ...prev,
            {
                name,
                image_url: sprite,
                types
            }
        ]);

        toast.success(`${name} adicionado à equipe!`);
    }


    function removePokemon(index: number) {
        setSelectedPokemon((prev) => prev.filter((_, i) => i != index));
        toast.success("Pokemon removido da equipe")
    }

    async function handleUpdateTeamComp(teamId: number, pokemons: { name: string; image_url: string; types: string[] }[]) {
        try {
            const response = await api.put(`/teams/${teamId}/pokemons`, { pokemons: selectedPokemons }, {
                headers: {
                    Accept: "application/json",
                },
            });
            toast.success("Time atualizado com sucesso!")
            queryClient.invalidateQueries({ queryKey: ['teams'] });
        } catch (error) {
            toast.error("erro ao remover time!");
        }
    }

    const { data: pokemons, isLoading } = usePokemonsByGeneration(getGenerationNumber(choosedGeneration));

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button onClick={handleOpen} className="bg-blue-600 p-2 m-1 rounded-sm text-white cursor-pointer hover:bg-blue-700"><Edit /></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Alterar Time</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá alterar permanentemente o time.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <h3>Remover Membros</h3>
                <div className="flex flex-wrap gap-1 flex-row">
                    {selectedPokemons.map((pokemon, index) => (
                        <div className="dark:bg-stone-800 bg-gray-100 border border-gray-300 dark:border-transparent p-2 rounded-md flex flex-row items-center">
                            <Image width={30} height={30} alt="pokemon" src={pokemon.image_url} />
                            <p className="px-2">{capitalizeFirstLetter(pokemon.name)}</p>
                            <div className="cursor-pointer dark:bg-stone-700 bg-gray-400 p-1 rounded-full" onClick={() => removePokemon(index)}><X className="w-4 h-4 text-white" /></div>
                        </div>
                    ))}
                </div>
                <h3>Adicionar membros</h3>
                <div className="flex flex-wrap gap-1 flex-col">
                    <Select value={choosedGeneration} onValueChange={setChoosedGeneration}>
                        <SelectTrigger className="md:max-w-[200px] w-full">
                            <SelectValue placeholder="Selecione uma geração" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="primeira">Geração I</SelectItem>
                            <SelectItem value="segunda">Geração II</SelectItem>
                            <SelectItem value="terceira">Geração III</SelectItem>
                            <SelectItem value="quarta">Geração IV</SelectItem>
                            <SelectItem value="quinta">Geração V</SelectItem>
                            <SelectItem value="sexta">Geração VI</SelectItem>
                            <SelectItem value="setima">Geração VII</SelectItem>
                            <SelectItem value="oitava">Geração VIII</SelectItem>
                            <SelectItem value="nona">Geração IX</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="dark:bg-stone-700 bg-white border border-gray-300 dark:border-transparent p-2 rounded-md">
                        <Input placeholder="Insira o nome de um pokemon da respectiva geração" className="mb-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="h-[200px] overflow-y-auto flex flex-col gap-1">
                            {searchTerm == "" &&
                                <>
                                    {isLoading &&
                                        <p className="w-full h-full flex items-center justify-center">Carregando lista...</p>
                                    }
                                    {pokemons?.map((item) => (
                                        <div onClick={() => addPokemonSelection(item.name, item.sprite, item.types)} className="dark:bg-stone-900 bg-gray-300 hover:bg-gray-400 p-2 flex flex-row items-center gap-1 rounded-md dark:hover:bg-stone-800 cursor-pointer">
                                            <Image alt="pokemon" width={35} height={35} src={item.sprite} />
                                            {capitalizeFirstLetter(item.name)}
                                        </div>
                                    ))}
                                </>
                            }
                            {searchTerm != "" &&
                                <>
                                    {isLoading &&
                                        <p className="w-full h-full flex items-center justify-center">Carregando lista...</p>
                                    }
                                    {pokemons?.slice().filter(((pokemon: ReducedPokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))).map((item) => (
                                        <div onClick={() => addPokemonSelection(item.name, item.sprite, item.types)} className="dark:bg-stone-900 bg-gray-300 hover:bg-gray-400 p-2 flex flex-row items-center gap-1 rounded-md dark:hover:bg-stone-800 cursor-pointer">
                                            <Image alt="pokemon" width={35} height={35} src={item.sprite} />
                                            {capitalizeFirstLetter(item.name)}
                                        </div>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white" onClick={() => handleUpdateTeamComp(teamId, selectedPokemons)}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            <Toaster />
        </AlertDialog>
    );
}
