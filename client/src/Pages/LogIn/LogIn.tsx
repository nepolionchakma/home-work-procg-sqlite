// import { useAuthContext } from "@/Context/AuthContext";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import "../../../src/App.css";
const LogIn = () => {
  return (
    <div className="w-[1200px] h-screen flex justify-center mx-auto">
      <div className="flex justify-center mx-auto relative">
        <div className="flex items-center justify-center px-[174px]">
          <LeftSide />
        </div>
        <div className="w-[400px] flex items-center justify-center">
          <RightSide />
        </div>
      </div>
    </div>
  );
};
export default LogIn;

// <div className="flex items-center justify-center">
//   <img
//     src="https://www.dukan.me/_nuxt/img/progress_loader.8f32937.gif"
//     alt=""
//   />
// </div>
