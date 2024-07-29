import { PropsWithChildren } from "react";

interface IItem {
  id: string;
  name: string;
  Icon: React.ImgHTMLAttributes<HTMLImageElement> | string | React.ReactNode;
  link: string;
}
const SidebarItem: React.FC<PropsWithChildren<IItem>> = () => {
  return (
    <div>
      <div>
        <div>
          <span>{}</span>
        </div>
      </div>
    </div>
  );
};
export default SidebarItem;
