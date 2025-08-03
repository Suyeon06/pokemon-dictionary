import { createFileRoute, useParams } from "@tanstack/react-router";
import { usePokemonDetails } from "../../api/pokeapi";
export const Route = createFileRoute("/pokemon/$name")({
  component: PokemonDetail,
});

export default function PokemonDetail() {
  const { name } = useParams({ from: "/pokemon/$name" });
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name);

  const pokemonId = pokemon.id;
  const dreamWorldImage = `/sprites/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="flex h-screen w-screen border-2 border-gray-400 rounded-[10px] items-center justify-evenly">
      <img src={dreamWorldImage} alt={pokemon.name} className="h-full"/>
      <div className="flex flex-col space-y-2">
        <div className="text-4xl font-bold">{pokemon.name}</div>
        <div className=" h-[300px] border-2 border-gray-400 rounded-[5px]">키:{pokemon.height}, 몸무게:{pokemon.weight}</div>
      </div>
      {/* 타입, 능력치 등 원하는 정보 추가 */}
    </div>
  );
}
