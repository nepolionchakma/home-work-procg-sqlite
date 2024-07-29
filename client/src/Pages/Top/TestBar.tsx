import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import navData from "../../Nav/Navs.json";
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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

const TestBar: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<number[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const { LeftNav } = navData;

  const toggleGroup = (groupId: number) => {
    if (openGroups.includes(groupId)) {
      setOpenGroups(openGroups.filter((id) => id !== groupId));
    } else {
      setOpenGroups([...openGroups, groupId]);
    }
    // setOpenGroups([...openGroups, groupId]);
  };

  const handleGroupClick = (groupId: number) => {
    if (collapsed) {
      setActiveGroup(activeGroup === groupId ? null : groupId);
    } else {
      toggleGroup(groupId);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    setOpenGroups([]);
    setActiveGroup(null); // Reset active group when toggling collapse
  };

  return (
    <div
      className={`h-full   text-white transition-all duration-300 bg-sky-200 ${
        collapsed ? "w-28" : "w-64"
      }`}
    >
      <button
        onClick={toggleCollapse}
        className="p-2 bg-gray-700 hover:bg-gray-600 transition-all duration-300 w-full"
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
      <ul>
        {LeftNav.map((group: NavGroup) => (
          <li key={group.id} className="p-2">
            <div
              onClick={() => handleGroupClick(group.id)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-700 transition-all duration-300"
            >
              <img
                src={group.icon}
                alt={group.label}
                className="w-6 h-6 mr-3"
              />
              {collapsed && (
                <span className="h-2 w-2 rounded-full bg-url"></span>
              )}
              {!collapsed && <span>{group.label}</span>}
              {!collapsed && (
                <span className="ml-auto">
                  {openGroups.includes(group.id) ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </span>
              )}
            </div>
            {(openGroups.includes(group.id) ||
              (collapsed && activeGroup === group.id)) && (
              <ul
                className={`${
                  collapsed
                    ? "absolute left-20 bg-gray-700 rounded p-2 shadow-lg"
                    : ""
                }`}
              >
                {group.in_navs.map((item) => (
                  <li
                    key={item.id}
                    className="pl-8 p-2 hover:bg-gray-700 transition-all duration-300"
                  >
                    <NavLink to={item.link} className="flex items-center p-2">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-4 h-4 mr-2"
                      />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestBar;
