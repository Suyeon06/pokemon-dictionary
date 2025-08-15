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
    <div className="flex flex-col gap-[8px] items-center justify-start w-[75%] h-screen">
      {/* 로고 */}
      <div className="flex justify-center items-center mb-[10px]">
        <img src="/pokeLogo.svg" alt="Pokemon Logo" className="h-[90px]"/>
      </div>

      {/* search bar */}
      <div className="flex items-center w-[70%] h-[30px]">
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

      {/* 포켓몬 카드 */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] w-[75%]">
        {pokemons.map((pokemon: Pokemon) => (
          <PokeCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>

      {/* pagination bar*/}
      <div className="flex items-center gap-1 mt-[10px]">
        <button 
        className="bg-[#fdfdfd] border-1 border-[#fdfdfd] text-[#2a2a2a] p-[5px] h-[30px] rounded-[10px] text-[12px] hover:bg-[#fff8cc] hover:border-1 hover:border-[#fadd69] "
        onClick={()=>setPage(Math.floor((page-1)/10)*10)}
        disabled={10>=page}>PREV
        </button>

          {pages.map((pageNumber)=>(
            <button
              onClick={()=>setPage(pageNumber)}
              className={`${pageNumber === page ? "bg-[#fadd69] text-[#2a2a2a] text-[13px] w-[30px] h-[30px] rounded-[10px]" : "bg-[#fdfdfd] text-[#2a2a2a] text-[13px] w-[30px] h-[30px] rounded-[10px] hover:bg-[#fff8cc] hover:border-1 border-[#fadd69]"}`}>
              {pageNumber}
            </button>
          ))}

        <button 
        className="bg-[#fdfdfd] border-1 border-[#fdfdfd] text-[#2a2a2a] p-[5px] h-[30px] rounded-[10px] text-[12px] hover:bg-[#fff8cc] hover:border-1 hover:border-[#fadd69] "
        onClick={()=>setPage(Math.floor((page-1)/10)*10+11)}>NEXT
        </button>
      </div>
    </div>

    
  );
}
