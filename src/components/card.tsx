import { useNavigate } from "@tanstack/react-router";
import { usePokemonDetails } from "../api/pokeapi";
//useNavigate..페이지 이동 함수
//usePokemonDetails..name을 파라미터로 받아서 포켓몬 데이터를 가져오는 함수
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
      className="hover:shadow-lg hover:translate-y-[-5px] border border-gray-400 w-[150px] h-[200px] m-[8px] rounded-[10px]"
    >
      <div className="divide-y divide-gray-400">
        <h3 className="text-center">{name}</h3>
        <div>
          <img src={pokemon.sprites.front_default} alt={name} className="w-full h-full" />
        </div>
      </div>
      <div className="flex justify-center bg-gray-200">
        {pokemon.types.map((typeInfo: any, index: number) => (
          <span key={index} className="text-center">{typeInfo.type.name}</span>
        ))}
      </div>
    </div>
  );
}
//onClick={() => navigate({ to: "/pokemon/$name" })}.. 클릭하면 해당 경로 페이지로 이동
//object-contain.. 가로세로비를 유지하면서, 요소의 콘텐츠 박스 내부에 들어가도록 크기를 맞춤 조절
//hover:shadow-lg hover:translate-y-[-5px].. 카드에 마우스를 올리면 올라가는 효과