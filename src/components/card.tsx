import { usePokemonDetails } from "../api/pokeapi";
export default function PokeCard({ name }: { name: string }) {
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  return (
    <div className="border w-[100px] h-[140px] m-[8px] p-[4px]">
      <div className="w-[100px] h-[100px]">
        <img src={pokemon.sprites.front_default} alt={name} />
      </div>
      <h3>{name}</h3>
    </div>
  );
}
