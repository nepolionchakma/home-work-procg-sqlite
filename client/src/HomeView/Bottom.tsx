import { Outlet } from "react-router-dom";
import Breadcurmb from "../components/Breadcrums/Breadcurmb";
import SideNav from "../Nav/SideBar/SideNav";
import { useNavContext } from "@/Context/NavContext";

const Bottom = () => {
  const { collapsed } = useNavContext();
  return (
    <div className=" mt-[3.4%]  ">
      <div className="w-full flex gap-2">
        <div className="fixed z-50">
          <SideNav />
        </div>
        <div
          className={`w-full duration-500 ${
            collapsed ? "ml-[5.5%] w-[94.1%]" : "ml-[21.5%] w-[78%] "
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
