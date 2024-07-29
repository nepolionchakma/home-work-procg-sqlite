import { ReactNode, createContext, useContext, useState } from "react";
interface NavProviderProps {
  children: ReactNode;
}
interface NavTypes {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  active_url: string;
  setActive_url: React.Dispatch<React.SetStateAction<string>>;
}

export const NavContext = createContext<NavTypes | null>(null);
export const useNavContext = () => {
  const navConsumer = useContext(NavContext);
  if (!navConsumer) {
    throw new Error("Error inside .");
  }
  return navConsumer;
};

export const NavContextProvider = ({ children }: NavProviderProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [active_url, setActive_url] = useState<string>("");
  const value = { collapsed, setCollapsed, active_url, setActive_url };
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};
