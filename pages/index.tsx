import { GetStaticPropsResult } from "next";
export { Home as default } from "@/pages/Home";
import { fetchPokemonCategories, fetchPokemonsAll } from "@/utils/api";

export const getStaticProps = async (): Promise<GetStaticPropsResult<any>> => {
  const pokemonAll = await fetchPokemonsAll();
  const categories = await fetchPokemonCategories();
  return {
    props: {
      initialPokemons: pokemonAll,
      initialCategories: categories,
    },
    revalidate: 3600,
  };
};
