import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useNavContext } from "../Context/NavContext";

import Breadcurmb from "../components/Breadcrums/Breadcurmb";
import { LeftNav } from "./Navs.json";
interface INav {
  id: number;
  label: string;
  icon: React.ImgHTMLAttributes<HTMLImageElement> | String | React.ReactNode;
  in_navs?: {
    id: number;
    name: string;
    icon: React.ImgHTMLAttributes<HTMLImageElement> | String | React.ReactNode;
    link: string;
  }[];
}
[];

const LeftSideNav: React.FC = () => {
  const { collapsed } = useNavContext();
  const location = useLocation();
  const navs: INav[] = LeftNav;

  //SubMenu Active ..........
  const getMenuItemStyle = (path: string): React.CSSProperties => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? "red" : "inherit",
      backgroundColor: isActive ? "#D3E2FD" : "",
    };
  };

  // const getMenuItemClassName = (path: string): string => {
  //   const isActive = location.pathname === path;
  //   const isPending = false;
  //   return isActive ? "active" : isPending ? "pending" : "";
  // };

  //SubMenu Active Check
  const [subMenuActiveValue, setSubMenuActiveValue] = useState<string>("");
  const path = location.pathname;
  useEffect(() => {
    if (
      path === "/risk-management" ||
      path === "/control-management" ||
      path === "/issue-management"
    ) {
      setSubMenuActiveValue("Finance");
    } else if (
      path === "/continuous-control-management" ||
      path === "/result-management"
    ) {
      setSubMenuActiveValue("Continuous monitoring");
    } else if (path === "/setup-and-administration") {
      setSubMenuActiveValue("Tools");
    } else setSubMenuActiveValue("No SubMenu");
  }, [path]);

  return (
    <div className="flex gap-5 fixed mt-[54px] w-full ">
      <div>
        <Sidebar collapsed={collapsed} transitionDuration={1000}>
          <div className="bg-nav h-screen">
            <Menu transitionDuration={600}>
              {navs.map((nav) => (
                <div key={nav.id}>
                  <SubMenu
                    icon={
                      <img
                        className="h-6 w-6"
                        src={nav.icon as string}
                        alt="icon"
                      />
                    }
                    label={nav.label}
                    className={`${
                      subMenuActiveValue === nav.label && "bg-menu_active"
                    }`}
                  >
                    {nav.in_navs?.map((in_nav) => (
                      <MenuItem
                        key={in_nav.id}
                        component={<NavLink to={in_nav.link} />}
                        icon={
                          <img
                            className="h-6 w-6"
                            src={in_nav.icon as string}
                            alt="icon"
                          />
                        }
                        style={getMenuItemStyle(in_nav.link)}
                        // className={getMenuItemClassName(in_nav.link)}
                      >
                        {in_nav.name}
                      </MenuItem>
                    ))}
                  </SubMenu>
                </div>
              ))}

              {/* <MenuItem>Documentation</MenuItem>
              <MenuItem>Calendar</MenuItem> */}
            </Menu>
          </div>
        </Sidebar>
      </div>
      <div className="w-full">
        <Breadcurmb />
        <Outlet />
      </div>
    </div>
  );
};

export default LeftSideNav;
// import React from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { useNavContext } from "../Context/NavContext";
// import {
//   Finance,
//   Continuous_Control_Management,
//   Continuous_Monitoring,
//   Control_Managment,
//   Issu_Management,
//   Risk_Managment,
//   Result_Management,
//   Tools,
//   Setup_and_Administration,
// } from "../assets/Left_Nav_Icon";
// interface INav {
//   id: number;
//   label: string;
//   icon: React.ImgHTMLAttributes<HTMLImageElement> | String | React.ReactNode;
//   in_navs?: {
//     id: number;
//     name: string;
//     icon: React.ImgHTMLAttributes<HTMLImageElement> | String | React.ReactNode;
//     link: string;
//   }[];
// }

// const LeftSideNav: React.FC = () => {
//   const { collapsed } = useNavContext();
//   const location = useLocation();

//   const navs: INav[] = [
//     {
//       id: 0,
//       label: "Finance",
//       icon: Finance,
//       in_navs: [
//         {
//           id: 0,
//           name: "Risk Management",
//           icon: Risk_Managment,
//           link: "/risk-management",
//         },
//         {
//           id: 1,
//           name: "Control Management",
//           icon: Control_Managment,
//           link: "/control-management",
//         },
//         {
//           id: 2,
//           name: "Issue Management",
//           icon: Issu_Management,
//           link: "/issue-management",
//         },
//       ],
//     },
//     {
//       id: 1,
//       label: "Continuous monitoring",
//       icon: Continuous_Monitoring,
//       in_navs: [
//         {
//           id: 0,
//           name: "Continuous Control Management",
//           icon: Continuous_Control_Management,
//           link: "/continuous-control-management",
//         },
//         {
//           id: 1,
//           name: "Result Management",
//           icon: Result_Management,
//           link: "/result-management",
//         },
//       ],
//     },
//     {
//       id: 2,
//       label: "Tools",
//       icon: Tools,
//       in_navs: [
//         {
//           id: 0,
//           name: "Setup and Administration",
//           icon: Setup_and_Administration,
//           link: "/setup-and-administration",
//         },
//       ],
//     },
//   ];
//   //

//   //SubMenu Active ..........
//   const getMenuItemStyle = (path: string): React.CSSProperties => {
//     const isActive = location.pathname === path;
//     return {
//       color: isActive ? "red" : "inherit",
//       backgroundColor: isActive ? "#D3E2FD" : "",
//     };
//   };

//   const getMenuItemClassName = (path: string): string => {
//     const isActive = location.pathname === path;
//     const isPending = false;
//     return isActive ? "active" : isPending ? "pending" : "";
//   };

//   return (
//     <div className="flex gap-5 fixed mt-[70px]">
//       <div>
//         <Sidebar collapsed={collapsed} transitionDuration={1000}>
//           <div className="bg-nav h-screen">
//             <Menu transitionDuration={600}>
//               {navs.map((nav) => (
//                 <div key={nav.id}>
//                   <SubMenu
//                     icon={
//                       <img
//                         className="h-6 w-6"
//                         src={nav.icon as string}
//                         alt="icon"
//                       />
//                     }
//                     label={nav.label}
//                   >
//                     {nav.in_navs?.map((in_nav) => (
//                       <MenuItem
//                         key={in_nav.id}
//                         component={<NavLink to={in_nav.link} />}
//                         icon={
//                           <img
//                             className="h-6 w-6"
//                             src={in_nav.icon as string}
//                             alt="icon"
//                           />
//                         }
//                         style={getMenuItemStyle(in_nav.link)}
//                         className={getMenuItemClassName(in_nav.link)}
//                       >
//                         {in_nav.name}
//                       </MenuItem>
//                     ))}
//                   </SubMenu>
//                 </div>
//               ))}

//               {/* <MenuItem>Documentation</MenuItem>
//               <MenuItem>Calendar</MenuItem> */}
//             </Menu>
//           </div>
//         </Sidebar>
//       </div>
//       <div>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default LeftSideNav;
