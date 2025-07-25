import { useNavigate } from "@tanstack/react-router";
import { usePokemonDetails } from "../api/pokeapi";
//useNavigate..페이지 이동 함수
//usePokemonDetails..name을 파라미터로 받아서 포켓몬 데이터를 가져오는 함수

// 타입별 색상 함수
function getTypeColor(typeName: string) {
  const typeColors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    poison: "bg-purple-500",
    flying: "bg-blue-300",
    bug: "bg-lime-600"
  };
  
  return typeColors[typeName];
}
//getTypeColor..타입 색을 가져오는 함수. typeColors..타입 이름을 키로 사용해서 색상을 가져오는 변수(const붙어서 상수)


export default function PokeCard({ name }: { name: string }) {
  const navigate = useNavigate();
  const { data: pokemon, isLoading, isError } = usePokemonDetails(name);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  // 포켓몬 데이터 확인 (개발용)
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

  return (
    <div
      onClick={() => navigate({ to: `/pokemon/${name}` })}
      className="hover:shadow-lg hover:translate-y-[-5px] border border-gray-400 p-2 w-[150px] h-[200px] m-[8px] rounded-[10px]"
    >
      <div className="divide-y divide-gray-400">
        <h3 className="text-center font-bold">{name}</h3>
        <div>
          <img src={pokemon.sprites.front_default} alt={name} className="w-full h-full" />
        </div>
      </div>
      <div className="flex space-x-2">
        {pokemon.types.map((typeInfo: any) => (
          <div 
            key={typeInfo.type.name}
            className={`text-center w-[60px] text-sm p-1 rounded-[5px] text-white font-bold ${getTypeColor(typeInfo.type.name)}`}
          >
            {typeInfo.type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
//onClick={() => navigate({ to: "/pokemon/$name" })}.. 클릭하면 해당 경로 페이지로 이동
//object-contain.. 가로세로비를 유지하면서, 요소의 콘텐츠 박스 내부에 들어가도록 크기를 맞춤 조절
//hover:shadow-lg hover:translate-y-[-5px].. 카드에 마우스를 올리면 올라가는 효과
//중괄호{}..Javascript를 쓸 때 사용, pokemon.types정보를 .map()함수를 사용해서 배열(현재 처리중인 정보 typeInfo(아무 타입이나),몇 번째인지 index(숫자 타입))로 만들어줌
//span.. 텍스트를 담는 태그, key={index}.. 배열의 인덱스를 키로 사용해서 고유한 값을 만듦

  // 첫 번째 반복 (index = 0)
  // typeInfo = {type: {name: "grass"}}
  // typeInfo.type.name = "grass"
  
  // 두 번째 반복 (index = 1)
  // typeInfo = {type: {name: "poison"}}
  // typeInfo.type.name = "poison"