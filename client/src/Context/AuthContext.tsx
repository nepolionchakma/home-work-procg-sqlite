import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeContextProvider } from "./ThemeContext";

interface IAuthProviderProps {
  children: ReactNode;
}
interface IAuthTypes {
  login: (email: string, password: string) => void;
  logout: () => void;
  access_token: string | null;
  setAccess_token: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  user_data: IUserData[];
}
export interface IUserData {
  user_id: number;
  user_name: string;
  tenant_id: number;
  access_token: string;
}
export const AuthContext = createContext<IAuthTypes | null>(null);
export const useAuthContext = () => {
  const authconsumer = useContext(AuthContext);
  if (!authconsumer) {
    throw new Error("Error inside database");
  }
  return authconsumer;
};
export const AuthContextProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  //---------------------------------
  const [user_data, setUser_data] = useState<IUserData[]>([]);
  useEffect(() => {
    const storeData = localStorage.getItem("access_token");
    if (storeData) {
      try {
        const userData: IUserData[] = JSON.parse(storeData);
        setUser_data(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);
  //get access token when open
  const [access_token, setAccess_token] = useState<string | null>(() => {
    const storeData = localStorage.getItem("access_token");
    if (storeData) {
      try {
        const userData: IUserData = JSON.parse(storeData);
        return userData.access_token;
      } catch (error) {
        console.error("Error parsing stored access token:", error);
        return null;
      }
    }
    return null;
  });

  // login
  const login = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("http://129.146.85.244:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (res.ok) {
        const user_res_data: IUserData = await res.json();
        setAccess_token(user_res_data.access_token);
        setUserName(user_res_data.user_name);
        //-----------------------------------
        localStorage.setItem("access_token", JSON.stringify(user_res_data));
        setIsLoading(false);
      } else if (res.status === 404) {
        setError("Invalid Email");
        setIsLoading(false);
      } else if (res.status === 408) {
        setError("Invalid Credential");
        setIsLoading(false);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setError("Sorry, Database isn't connected ");
      setIsLoading(false);
    }
  };
  // logout
  const logout = () => {
    localStorage.removeItem("access_token");
    setAccess_token(null);
  };
  const value = {
    login,
    logout,
    access_token,
    setAccess_token,
    isLoading,
    setIsLoading,
    error,
    setError,
    userName,
    user_data,
  };
  return (
    <AuthContext.Provider value={value}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </AuthContext.Provider>
  );
};
