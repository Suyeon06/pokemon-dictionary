import { Suspense } from 'react';
import { useNavigate } from "@tanstack/react-router";
import { usePokemonDetails } from "../api/pokeapi";
//useNavigate..페이지 이동 함수
//usePokemonDetails..name을 파라미터로 받아서 포켓몬 데이터를 가져오는 함수
//suspense.. 로딩중 상태를 표시하는 컴포넌트

// 타입별 색상 함수
function getTypeColor(typeName: string) {
  const typeColors: { [key: string]: string } = {
    normal: "bg-[#C0BC9C]",
    fire: "bg-[#EC9C70]",
    water: "bg-[#91ADEB]",
    grass: "bg-[#95D181]",
    poison: "bg-[#BE6EAA]",
    flying: "bg-[#BBAFEF]",
    bug: "bg-[#BACB60]",
    electric: "bg-[#F5DD62]",
    fairy: "bg-[#E8AEBB]",
    ground: "bg-[#E2C78D]",
    fighting: "bg-[#D06772]",
    ice: "bg-[#B4E2E8]",
    psychic: "bg-[#F983A8]",
    rock: "bg-[#CAB96A]",
    dark: "bg-[#92796D]",
    steel: "bg-[#CACBDE]",
    ghost: "bg-[#937FB2]",
    stellar: "bg-[#D4C3ED]",
    dragon: "bg-[#9988F6]",

  };
  
  return typeColors[typeName];
}
//getTypeColor..타입 색을 가져오는 함수. typeColors..타입 이름을 키로 사용해서 색상을 가져오는 변수(const붙어서 상수)


// 로딩 컴포넌트
function CardLoading() {
  return (
    <div className="border border-[#e8e8e8] p-2 w-[150px] h-[200px] m-[8px] rounded-[10px]">
      <div className="skeleton h-4 mb-2"></div>
      <div className="skeleton h-32"></div>
      <div className="flex space-x-2 mt-2">
        <div className="skeleton h-5 w-12"></div>
        <div className="skeleton h-5 w-12"></div>
      </div>
    </div>
  );
}

// 메인 카드 컴포넌트 (Suspense 사용)
function PokeCardContent({ name }: { name: string }) {
  const navigate = useNavigate();
  const { data: pokemon } = usePokemonDetails(name, { suspense: true }); // suspense 옵션 추가!

  // 포켓몬 ID 추출 (URL에서 마지막 숫자)
  const pokemonId = pokemon.id;

  // dream-world 이미지 경로 생성
  const dreamWorldImage = `/sprites/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  // 포켓몬 데이터 확인 (개발자 확인용)
  console.log(`=== ${name} 포켓몬 데이터 ===`);
  console.log("전체 데이터:", pokemon);
  console.log("이름:", pokemon.name);
  console.log("ID:", pokemonId);
  console.log("Dream World 이미지:", dreamWorldImage);
  console.log("타입:", pokemon.types);
  console.log("키:", pokemon.height);
  console.log("몸무게:", pokemon.weight);
  console.log("능력치:", pokemon.stats);
  console.log("능력:", pokemon.abilities);
  console.log("================================");

  return (
    <div
      onClick={() => navigate({ to: `/pokemon/${name}` })}
      className="hover:shadow-lg hover:translate-y-[-5px] duration-400 border border-[#e8e8e8] p-2 w-[150px] h-[200px] m-[8px] rounded-[10px] flex flex-col justify-between items-center"
    >
      <div className="divide-y divide-[#e8e8e8]">
        <h3 className="text-center font-bold text-[#2a2a2a]">{name}</h3>
        <div/>
      </div>
      <div>
          <img 
            src={dreamWorldImage} 
            alt={name} 
            className="h-[90px] object-contain max-w-[100px]"
          />
        </div>
      <div className="flex self-start space-x-2 pl-[2px]">
        {pokemon.types.map((typeInfo: any) => (
          <div 
            key={typeInfo.type.name}
            className={`text-center w-[60px] h-[20px] text-xs rounded-[4px] text-black font-normal ${getTypeColor(typeInfo.type.name)}`}
          >
            {typeInfo.type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
//dutaion..애니메이션 지속시간 

// Suspense로 감싼 메인 컴포넌트
export default function PokeCard({ name }: { name: string }) {
  return (
    <Suspense fallback={<CardLoading />}>
      <PokeCardContent name={name} />
    </Suspense>
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

//<suspense fallback={<CardLoading />}>.. 로딩중 상태를 표시할 컴포넌트(PokeCardContent)