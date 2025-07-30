import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-between">
        <Link to="/" className="[&.active]:font-semibold text-[20px] text-[#2a2a2a]">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          <div className="w-auto h-auto gap-[5px] flex items-center">
            <span className="font-semibold text-[20px] text-[#878787]">Sign In</span>
            <img src="/loginIcon.svg" alt="login icon" className="w-[28px] h-[28px]"/>
          </div>
        </Link>
      </div>
       
      <hr />
      

      <div className="flex flex-wrap items-center mx-[200px] my-[40px]">
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