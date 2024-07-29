import React, { useEffect, useRef, useState } from "react";
import navData from "../Navs.json";
import SideMenu from "./SideMenu";
import { useNavContext } from "../../Context/NavContext";
import { useLocation } from "react-router-dom";
import { useThemeContext } from "@/Context/ThemeContext";

interface NavItem {
  id: number;
  name: string;
  icon: string;
  link: string;
}

interface NavGroup {
  id: number;
  label: string;
  icon: string;
  in_navs: NavItem[];
}

const SideNav: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<number[]>([]);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const { collapsed } = useNavContext();
  const location = useLocation();
  const path = location.pathname;
  const { LeftNav } = navData;
  const { themeMode, darkTheme, lightTheme } = useThemeContext();

  //Toggle Collapse
  const toggleGroup = (groupId: number) => {
    if (collapsed) {
      setActiveGroup(activeGroup === groupId ? null : groupId);
    } else {
      if (openGroups.includes(groupId)) {
        setOpenGroups(openGroups.filter((id) => id !== groupId));
      } else {
        setOpenGroups([...openGroups, groupId]);
      }
    }
  };
  useEffect(() => {
    const collapsedFun = async () => {
      const isCollapsed = await collapsed;
      if (!isCollapsed) {
        setActiveGroup(null);
        setOpenGroups([]);
      } else {
        setOpenGroups([]);
      }
    };
    collapsedFun();
  }, [collapsed]);

  //SubMenu Active Check
  const [subMenuActiveValue, setSubMenuActiveValue] = useState<string>("");
  useEffect(() => {
    if (
      path === "/finance/risk-management" ||
      path === "/finance/control-management" ||
      path === "/finance/issue-management"
    ) {
      setSubMenuActiveValue("Finance");
    } else if (
      path === "/continuous-monitoring/continuous-control-management" ||
      path === "/continuous-monitoring/result-management"
    ) {
      setSubMenuActiveValue("Continuous Monitoring");
    } else if (path === "/tools/setup-and-administration") {
      setSubMenuActiveValue("Tools");
    } else setSubMenuActiveValue("No SubMenu");
  }, [path]);

  // close any menu start
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      // setOpenGroups([]);
      setActiveGroup(null);
    }
  };

  useEffect(() => {
    if (openGroups) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openGroups]);
  // close any menu end

  //Theme Mode
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const modeStatus = e.currentTarget.checked;
    if (modeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <div
      ref={menuRef}
      className={`flex flex-col justify-between transition-all duration-500 bg-nav h-[92vh] ${
        collapsed ? "w-[73px] " : "w-72 overflow-auto"
      }`}
    >
      <ul className=" ">
        {LeftNav.map((group: NavGroup) => (
          <SideMenu
            key={group.id}
            id={group.id}
            label={group.label}
            icon={group.icon}
            inNavs={group.in_navs}
            isOpen={openGroups.includes(group.id)}
            collapsed={collapsed}
            toggleGroup={toggleGroup}
            activeGroup={activeGroup}
            subMenuActiveValue={subMenuActiveValue}
            path={path}
          />
        ))}
      </ul>
      <div className="p-3">
        <input
          hidden
          type="checkbox"
          name=""
          id=""
          onChange={handleThemeChange}
          checked={themeMode === "dark"}
        />
      </div>
    </div>
  );
};
export default SideNav;
