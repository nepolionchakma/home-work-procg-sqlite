import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface IThemeProviderProps {
  children: ReactNode;
}
interface IThemetypes {
  themeMode: string;
  darkTheme: () => void;
  lightTheme: () => void;
}
export const ThemeContext = createContext<IThemetypes | null>(null);
export const useThemeContext = () => {
  const themeConsumer = useContext(ThemeContext);
  if (!themeConsumer) {
    throw new Error("Error inside database");
  }
  return themeConsumer;
};
export const ThemeContextProvider = ({ children }: IThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState("light");
  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);
  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  const value = { themeMode, darkTheme, lightTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
