import { Outlet } from "react-router-dom";
import Breadcurmb from "../components/Breadcrums/Breadcurmb";
import SideNav from "../Nav/SideBar/SideNav";

const Bottom = () => {
  return (
    <div className="flex gap-2 fixed w-full mt-[54px] ">
      <div>
        <SideNav />
      </div>
      <div className="w-full overflow-y-scroll">
        <Breadcurmb />
        <Outlet />
      </div>
    </div>
  );
};
export default Bottom;
