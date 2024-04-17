import { useRouter } from "next/router";
import PokemonDetails from "@/components/pokemonDetails";
import { usePokemonDetails } from "@/queries";
import { Container, Loader } from "@/styles/common";
export const PokemonDetail: React.FC<any> = ({ initialPokemon }) => {
  const router = useRouter();
  const { pokemonName } = router.query;
  const {
    data: pokemon,
    isLoading,
    isError,
  } = usePokemonDetails(pokemonName as string, initialPokemon);
  console.log("pokemonName", pokemonName);

  return (
    <Container style={{ height: "100vh" }}>
      {isLoading && <Loader />}
      {isError && <p>Some thing went Wrong</p>}
      {pokemon && <PokemonDetails pokemon={pokemon} />}
    </Container>
  );
};
