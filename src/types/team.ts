import { Pokemon } from "./pokemon";

export interface Team {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pokemons: Pokemon[];
}