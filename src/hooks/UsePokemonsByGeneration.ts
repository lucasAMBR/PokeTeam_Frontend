import { api } from "@/lib/axios";
import { ReducedPokemon } from "@/types/PokemonReduced";
import { useQuery } from "@tanstack/react-query";

export function usePokemonsByGeneration(generation: number) {
  return useQuery<ReducedPokemon[]>({
    queryKey: ["pokemons", generation],
    queryFn: async () => {
      const { data } = await api.get<ReducedPokemon[]>(`/pokemons/geracao/${generation}`);
      return data;
    },
    enabled: !!generation,
  });
}
