import { Link, useLocation } from "react-router-dom";
import { convertToTitleDictionary } from "./Services/SlugService";
import { ChevronRight } from "lucide-react";

const Breadcurmb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="py-2 w-full sticky top-0 bg-white">
      <nav>
        <ul className="flex ">
          <li className="text-url underline font-bold ">
            <Link to="/" className="flex gap-1">
              <span>Home</span>
            </Link>
          </li>
          {pathnames.map((value: string, index: number) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const title = convertToTitleDictionary(value);
            return (
              <li key={to} className="flex">
                <span className="mx-2">
                  <ChevronRight />
                </span>
                {last ? (
                  <span>{title}</span>
                ) : (
                  <span>{title}</span>
                  // <Link to={to} className="text-url">
                  //   {title}
                  // </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default Breadcurmb;
