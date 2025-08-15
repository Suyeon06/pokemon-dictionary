import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex justify-between absolute w-full">
        <Link to="/" className="[&.active]:font-semibold text-[19px] pl-[10px] pt-1 text-[#2a2a2a]">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          <div className="h-autogap-[5px] flex items-center">
            <span className="font-semibold pt-1 text-[19px] pr-[10px] text-[#2a2a2a]">Sign In </span>
          </div>
        </Link>
      </div>
       
      <hr className="border-[#e8e8e8]"/>
      

      <div className="flex items-center justify-center pt-[35px]">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});
//link to="/"..클릭하면 "/"(홈 주소)로 이동 
//[&.active]: ..클래스 활성화
//<hr />..가로 구분선(className붙여서 스타일링 가능)
//<Outlet />..자식 컴포넌트 들어갈 자리
//7번째줄 w-screen 쓰면 우측 스크롤바를 포함한 전체 너비라 ui가 넘침. -> w-full사용
