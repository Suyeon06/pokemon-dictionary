import { createFileRoute } from "@tanstack/react-router";
import { usePokeApi } from "../api/pokeapi";
import PokeCard from "../components/card";
///components/card.tsx에서 만든 카드 사용
import { useState } from "react";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [page, setPage]=useState<number>(1);
  const pages:number[]=[]
  const { data, isLoading, isError } = usePokeApi(page);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  for (let i=Math.floor((page-1)/10)*10+1;i<=Math.floor((page-1)/10)*10+10;i=i+1){ pages.push(i)}
  console.log(pages);
  

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
      
      <div className="flex items-center gap-[10px]">
        <button 
        className="w-0 h-0 border-t-[10px] border-b-[10px] border-r-[10px] border-t-transparent border-b-transparent border-r-gray-700"
        onClick={()=>setPage(page -1)}
        disabled={1>=page}></button>
        {pages.map((pageNumber)=>(
          <button
            onClick={()=>setPage(pageNumber)}>{pageNumber}</button>
        ))}
        <button 
        className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent border-l-gray-700"
        onClick={()=>setPage(page +1)}></button>
      </div>
    </div>

    
  );
}
