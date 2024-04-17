import { ITypical } from "@/types/pokemon";

export const getSearchedPokemon = (pokemons: ITypical[], query: string) => {
  const data = pokemons?.filter((pokemon) =>
    pokemon?.name.includes(query.toLocaleLowerCase())
  );
  return data;
};

export const searchPokemons = (
  query: string,
  pokemons: ITypical[]
): Promise<ITypical[]> => {
  return new Promise((resolve) => {
    const matchingPokemons = pokemons.filter(({ name }) =>
      name.includes(query.toLowerCase())
    );
    setTimeout(() => {
      resolve(matchingPokemons);
    }, 500);
  });
};
