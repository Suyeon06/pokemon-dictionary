import { createFileRoute } from "@tanstack/react-router";
import { usePokeApi } from "../api/pokeapi";
import PokeCard from "../components/card";
///components/card.tsx에서 만든 카드 사용
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
    <div className="flex flex-col gap-[43px]">
      <div className="flex justify-center items-center my-[20px]">
        <img src="/pokeLogo.svg" alt="Pokemon Logo" className="w-[300px] h-[110px]"/>
      </div>

      <div
        className="flex items-center w-full h-[36px]"
      >
        <button
          className="flex w-auto h-full items-center justify-center rounded-l-[20px] border-l-[1px] border-b-[1px] border-t-[1px] border-l-0 border-[#E8E8E8] pr-[16px] pl-[16px] py-[10px] bg-[#F5F5F7]">
          <img
            src="/searchIcon.svg"
            alt="searchIcon"
            className="h-[16px] w-[16px] object-contain"
          />
        </button>
        <input
          placeholder="Search"
          className="flex w-full h-full rounded-r-[30px] border-[1px] border-[#E8E8E8] py-[10px] px-[20px] gap-[10px] text-[16px] leading-4 outline-none"
        />
        
      </div>
      <div className="flex flex-wrap">
        {pokemons.map((pokemon: Pokemon) => (
          <PokeCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}
