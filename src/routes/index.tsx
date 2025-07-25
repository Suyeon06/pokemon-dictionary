import { createFileRoute } from "@tanstack/react-router";
import { usePokeApi } from "../api/pokeapi";
import PokeCard from "../components/card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError } = usePokeApi();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  type Pokemon = {
    name: string;
    url: string;
  };

  const pokemons: Pokemon[] = data.results;
  return (
    <div className="flex flex-wrap">
      {pokemons.map((pokemon: Pokemon) => (
        <PokeCard key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
}
