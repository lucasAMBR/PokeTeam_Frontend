"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileSidebar, Sidebar } from "@/components/ui/sidebar";
import { usePokemonsByGeneration } from "@/hooks/UsePokemonsByGeneration";
import { useState } from "react";
import PokemonListByGeneration from "./_components/pokemon_list_by_generation";
import { ReducedPokemon } from "@/types/PokemonReduced";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { X } from "lucide-react";
import { ThemeButton } from "@/components/ui/theme-button";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/text";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function CreateTeam() {
    const router = useRouter();

    const [choosedGeneration, setChoosedGeneration] = useState<string>("primeira");

    const [teamName, setTeamName] = useState("");
    const [selectedPokemons, setSelectedPokemon] = useState<{ name: string; image_url: string; types: string[] }[]>([]);

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

    function createTeam() {
        try {
            const response = api.post("/teams", {
                name: teamName,
                pokemons: selectedPokemons
            })

            toast("Time criado com sucesso");

            router.push("/teams");
        } catch (error) {
            toast("Erro ao criar time, tente novamente mais tarde");
        }
    }

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex flex-col md:flex-row pt-14 md:pt-0">
            <Sidebar />
            <MobileSidebar />
            <div className="w-full p-6 max-h-screen overflow-y-auto">
                <h1 className="text-3xl font-bold">Criar Time</h1>
                <div className="mt-4 dark:bg-stone-700 bg-stone-200 p-4 rounded-lg">
                    <Label>Nome do Time</Label>
                    <Input className="mt-2 border border-stone-400 dark:border-stone-500" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                    <div className="bg-stone-300 dark:bg-stone-800 mt-4 rounded-md p-4">
                        <div className="flex flex-col md:flex-row gap-1">
                            <Select value={choosedGeneration} onValueChange={setChoosedGeneration}>
                                <SelectTrigger className="md:max-w-[200px] w-full border border-gray-400 dark:border-stone-700">
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
                            <Input placeholder="Pesquise um pokemon dessa geração por nome" className="mt-1 md:mt-0 border border-gray-400 dark:border-stone-700" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <p className="my-4">Pokemons escolhidos: {selectedPokemons.length} / 5</p>
                        {selectedPokemons.length === 0 &&
                            <p>Sem pokemons escolhido, selecione alguns na lista abaixo</p>
                        }
                        {selectedPokemons.length >= 1 &&
                            <div className="flex flex-col md:flex-row">
                                {selectedPokemons.map((pokemon, index) => (
                                    <div className="bg-stone-100 dark:bg-stone-900 p-2 m-1 rounded-md flex flex-rol justify-center items-center">
                                        <Image src={pokemon.image_url} width={30} height={30} alt="pokemon" className="m-1" />
                                        {capitalizeFirstLetter(pokemon.name)}
                                        <div className="bg-stone-300 dark:bg-stone-400 m-2 rounded-full p-1 cursor-pointer hover:bg-stone-300" onClick={() => removePokemon(index)}>
                                            <X className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                        <Button className="my-4 cursor-pointer" disabled={selectedPokemons.length === 0} onClick={createTeam}>Criar Equipe</Button>
                        <h2 className="text-xl font-semibold my-4">Pokemons da {`${choosedGeneration}`} geração:</h2>
                        <PokemonListByGeneration generation={choosedGeneration} searchTerm={searchTerm} addPokemonSelection={addPokemonSelection} />
                    </div>
                </div>
                <Toaster />
                <ThemeButton />
            </div>
        </div>
    )
}