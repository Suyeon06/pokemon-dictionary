import { usePokemonDetails } from "../api/pokeapi";
//api폴더의 pokeapi.ts파일에서 usePokemonDetails 함수를 가져와 이 파일에서 사용하게끔 불러오기(import)

export default function PokeCard({ name }: { name: string }) {
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name);
//문자열로 된 name 정보를 PokeCard에 전달(ex: bulbasaur)
//bulbasaur의 정보를 가져오는 함수 usePokemonDetails를 호출하고, 그 결과를 pokemon으로 저장.
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  //isLoading이 true면 Loading... 표시
 
  console.log(`=== ${name} 포켓몬 데이터 ===`);
  console.log("전체 데이터:", pokemon);
  console.log("이름:", pokemon.name);
  console.log("이미지:", pokemon.sprites.front_default);
  console.log("타입:", pokemon.types);
  console.log("키:", pokemon.height);
  console.log("몸무게:", pokemon.weight);
  console.log("능력치:", pokemon.stats);
  console.log("능력:", pokemon.abilities);
  console.log("================================");
  //console(개발자도구F12)에 해당 정보를 출력(개발자가 데이터를 확인하기 위해)

  return (
    <div className="border border-gray-400 w-[150px] h-[200px] m-[8px] p-[4px] rounded-[10px]">
      <div className="divide-y divide-gray-400">
        <h3 className="text-center">{name}</h3>
        <div>
          <img src={pokemon.sprites.front_default} alt={name} className="w-full h-full object-contain"/>
        </div>
      </div>
      <div className="flex flex-col rounded-b-[10px]">type</div>
    </div>
  );
  //return.. 화면에 표시할 부분
}
