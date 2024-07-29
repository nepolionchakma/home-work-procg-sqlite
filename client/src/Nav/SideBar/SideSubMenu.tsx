import { NavLink } from "react-router-dom";

interface NavItemProps {
  id: number;
  name: string;
  icon: string;
  link: string;
  collapsed: boolean;
  path: string;
}

const SideSubMenu: React.FC<NavItemProps> = ({
  name,
  icon,
  link,
  collapsed,
  path,
}) => {
  const handleStopPropagation = (e: React.MouseEvent) => {
    if (!collapsed) {
      e.stopPropagation();
    }
  };
  return (
    // hover submenu item
    <li
      onClick={handleStopPropagation}
      className={`p-1 transition-all duration-700 border border-slate-50 rounded-xl  ${
        collapsed
          ? "flex items-center w-[310px] hover:bg-slate-50 "
          : "pl-8 hover:bg-menu_collapse "
      }
      ${path === link && "text-red-600"}`}
    >
      <NavLink to={link} className="flex items-center p-2 text-xs">
        <img src={icon} alt={name} className="w-4 h-4 mr-2" />
        <span>{name}</span>
        {/* {collapsed && <span>{name}</span>} */}
      </NavLink>
    </li>
  );
};
export default SideSubMenu;
