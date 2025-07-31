import useSWR from "swr";
//swr폴더에서 useSWR을 가져와 이 파일에서 사용하게끔 불러오기(import)

const fetcher = (url: string) => fetch(url).then((res) => res.json());
//api호출 함수. fetch(url) 서버에 HTTP요청 보내기. .then(res)=>res.json() 응답을 받아서 JSON형태로 변환.
//url: string(문자열). 만약 age:number(숫자) 이렇게 타입을 지정

export function usePokeApi() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
    fetcher
  );
  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
}
//funtion usePokeApi.. usePokeApi라는 함수를 만들고 export.. 다른 파일에서 이 함수를 사용할 수 있게 내보내기
//useSWR(Api주소(url), 데이터 가져오는 방법(fetcher)).. fetcher을 이용해 데이터를 가져오고, 결과를 data, error, isLoading으로 나눠서 받기.
//return{ isError: error}.. error를 받으면 isError로 저장. 

export function usePokemonDetails(name: string, options?: { suspense?: boolean }) {
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher,
    options
  );
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
//name이라는 문자열을 받는 함수 usePokemonDetaios를 만들고 내보내기
//${name}은 문자열 안에 name을 넣기. 예를들어 name이 suyeon이면 https://~/suyeon 이렇게 됨.
//10번줄에서는 "url"쓰고 24번줄에서는 `url`쓰는 이유: 10번은 상수, 24번은 변수
