import { Outlet } from "react-router-dom";
import Breadcurmb from "../components/Breadcrums/Breadcurmb";
import SideNav from "../Nav/SideBar/SideNav";
import { useNavContext } from "@/Context/NavContext";

const Bottom = () => {
  const { collapsed } = useNavContext();
  return (
    <div className=" mt-[3.9%]  ">
      <div className="w-full flex gap-2">
        <div className="fixed">
          <SideNav />
        </div>
        <div
          className={`w-full duration-500   ${
            collapsed ? "ml-[80px]" : "ml-[300px]"
          }`}
        >
          <Breadcurmb />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Bottom;
