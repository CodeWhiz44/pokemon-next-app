import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonsByCategory,
  fetchPokemonDetails,
  fetchPokemonCategories,
  fetchPokemonsAll,
} from "../utils/api";
import { IPokemon, ITypical } from "../types/pokemon";
import { QueryKey } from "@/types/query";

export const usePokemonsByCategory = (categoryId: string) => {
  return useQuery<ITypical[], Error>({
    queryKey: [QueryKey.POKEMONS_BY_CATEGORY, categoryId],
    queryFn: () => fetchPokemonsByCategory(categoryId),
  });
};

export const usePokemonDetails = (
  pokemonId: string,
  initialData?: IPokemon
) => {
  return useQuery<IPokemon, Error>({
    queryKey: [QueryKey.POKEMON_DETAILS, pokemonId],
    queryFn: () => fetchPokemonDetails(pokemonId),
    initialData: initialData,
  });
};

export const usePokemonCategories = (initialData?: ITypical[]) => {
  return useQuery<ITypical[], Error>({
    queryKey: [QueryKey.POKEMON_CATEGORIES],
    queryFn: fetchPokemonCategories,
  });
};

export const usePokemonsAll = (initialData?: ITypical[]) => {
  return useQuery<ITypical[], Error>({
    queryKey: [QueryKey.POKEMONS_BY_CATEGORY],
    queryFn: () => fetchPokemonsAll(),
    initialData: initialData,
  });
};
