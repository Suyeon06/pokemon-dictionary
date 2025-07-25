import { createFileRoute, useParams } from "@tanstack/react-router";
import { usePokemonDetails } from "../../api/pokeapi";

export const Route = createFileRoute("/pokemon/$name")({
  component: PokemonDetail,
});

export default function PokemonDetail() {
  const { name } = useParams({ from: "/pokemon/$name" });
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {/* 타입, 능력치 등 원하는 정보 추가 */}
    </div>
  );
}
