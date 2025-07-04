import { usePokemonDetails } from "../api/pokeapi";
export default function PokeCard(name: string) {
  const { data, isLoading, isError } = usePokemonDetails(name);
  return (
    <div className="card">
      {/* <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Types: {types.join(", ")}</p> */}
    </div>
  );
}
