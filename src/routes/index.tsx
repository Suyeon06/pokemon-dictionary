import { createFileRoute } from "@tanstack/react-router";
import { usePokeApi } from "../api/pokeapi";
import PokeCard from "../components/card";

interface Pokemon {
  name: string;
  url: string;
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError } = usePokeApi();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const pokemons: Pokemon[] = data.results;
  console.log("Pokemons fetched:", pokemons);
  return pokemons.map((pokemon: Pokemon) => <PokeCard name={pokemon.name} />);
}
