import { AxiosResponse } from "axios";
import { getApiClient } from "@/modules/axios";

export const fetchPokemonCategories = async () => {
  const { data } = await getApiClient().get(`/type`);
  return data.results;
};

export const fetchPokemonsAll = async () => {
  const { data } = await getApiClient().get(`/pokemon?limit=100000&offset=0`);
  return data.results;
};

export const fetchPokemonsByCategory = async (categoryId: string) => {
  const data = await getApiClient()
    .get(`/type/${categoryId}`)
    .then((res: AxiosResponse) => res.data.pokemon?.map((e: any) => e.pokemon));
  console.log("here", data);
  return data;
};

export const fetchPokemonDetails = async (pokemonId: string) => {
  const { data } = await getApiClient().get(`/pokemon/${pokemonId}`);
  return {
    id: data.id,
    name: data.name,
    stats: data.stats,
    types: data.types,
    weight: data.weight,
  };
};
