import { usePokemonsByGeneration } from "@/hooks/UsePokemonsByGeneration";
import { Pokemon } from "@/types/pokemon";
import MiniPokemonCard from "./mini-pokemon-card";
import { it } from "node:test";
import { useState } from "react";
import { ReducedPokemon } from "@/types/PokemonReduced";

interface PokemonListByGenerationProps {
    generation: string;
    searchTerm: string;
    addPokemonSelection: (name: string, sprite: string, types: string[]) => void
}

export default function PokemonListByGeneration({
    generation,
    searchTerm,
    addPokemonSelection
}: PokemonListByGenerationProps) {

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

    const { data: pokemons, isLoading } = usePokemonsByGeneration(getGenerationNumber(generation));

    if (isLoading) {
        return (
            <div className="p-8 text-center text-lg font-medium">
                Carregando pokemons...
            </div>
        );
    }

    return (
        <div className="flex flex-row flex-wrap">
            {searchTerm == ""
                ?
                <>
                    {pokemons?.map((item) => (
                        <MiniPokemonCard id={item.id} name={item.name} sprite={item.sprite} types={item.types} addPokemonSelection={addPokemonSelection} />
                    ))}
                </>
                :
                <>
                    {pokemons?.slice().filter((pokemon: ReducedPokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                        <MiniPokemonCard id={item.id} name={item.name} sprite={item.sprite} types={item.types} addPokemonSelection={addPokemonSelection} />
                    ))}
                </>
            }
        </div>
    )
}