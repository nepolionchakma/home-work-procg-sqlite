import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeContext, ThemeContextProvider } from "./ThemeContext";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IAuthProviderProps {
  children: ReactNode;
}
export interface ICreateUserTypes {
  user_name: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  job_title: string;
  user_type: string;
  tenant_id: number;
  email_addresses: string;
  password: string;
  confirm_password?: string;
  created_by?: string;
  created_on?: string;
  last_update_by?: string;
  last_update_on?: string;
}
export interface IDefUsersType {
  user_id: number;
  user_name: string;
  user_type: string;
  tenant_id: number;
  email_addresses: string;
  created_by?: string;
  created_on?: string;
  last_update_by?: string;
  last_update_on?: string;
}
export interface IDefPersonsType {
  user_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  job_title: string;
}
export interface IMergeUsersData {
  user_id: number;
  user_name: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  job_title: string;
  user_type: string;
  tenant_id: number;
  email_addresses: string;
  created_by?: string;
  created_on?: string;
  last_update_by?: string;
  last_update_on?: string;
}
export interface IUserData {
  user_id: number;
  user_name: string;
  tenant_id: number;
  access_token: string;
}
export interface IAuthTypes {
  signup: (userData: ICreateUserTypes) => void;
  getusers: () => void;
  deleteUser: (id: number) => void;
  users_data: IMergeUsersData[];
  login: (email: string, password: string) => void;
  logout: () => void;
  access_token: string | null;
  setAccess_token: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  user_data: IUserData | null;
  toastify: (info: string, msg: string) => void;
  formatDate: (data: any) => void;
}

const toastify = (info: string, msg: string) => {
  switch (info) {
    case "success":
      toast.success(msg);
      break;
    case "warning":
      toast.warn(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "info":
      toast.info(msg);
      break;
    default:
      toast(msg);
  }
};
export const SqliteAuthContext = createContext<IAuthTypes | null>(null);
export const useSqliteAuthContext = () => {
  const authconsumer = useContext(SqliteAuthContext);
  if (!authconsumer) {
    throw new Error("Error inside database");
  }
  return authconsumer;
};
export const SqliteAuthContextProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [user_data, setUser_data] = useState<IUserData | null>(null);
  const [users_data, setUsers_data] = useState<IMergeUsersData[]>([]);
  const now = new Date();
  const formatDate = (date: any) => {
    // Extract components
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");

    // Convert hours and minutes to 12-hour format with AM/PM
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, "0");

    // Return the formatted date and time string
    return `${year}-${month}-${day} ${formattedHours}:${minutes}${ampm} UTC+0`;
  };
  //---------------------------------
  // Get localstorage data
  useEffect(() => {
    const storeData = localStorage.getItem("access_token");
    if (storeData) {
      try {
        const userData: IUserData = JSON.parse(storeData);
        setUser_data(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  // get access token when open
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

  // sign up
  const signup = async (userData: ICreateUserTypes) => {
    try {
      setIsLoading(true);
      // Make requests in parallel
      const [res_def_users, res_def_person, res_def_user_credentials] =
        await Promise.all([
          axios.post("http://localhost:3000/def-users", {
            user_name: userData.user_name,
            user_type: userData.user_type,
            email_addresses: userData.email_addresses,
            created_by: user_data?.user_id,
            last_update_by: user_data?.user_id,
            tenant_id: Number(userData.tenant_id),
          }),
          axios.post("http://localhost:3000/def-persons", {
            first_name: userData.first_name,
            middle_name: userData.middle_name,
            last_name: userData.last_name,
            job_title: userData.job_title,
          }),
          axios.post("http://localhost:3000/def-user-credentials", {
            password: userData.password,
          }),
        ]);

      // Log the results
      if (
        res_def_users.status === 200 &&
        res_def_person.status === 200 &&
        res_def_user_credentials.status === 200
      ) {
        toastify("success", "Successfully added a user.");
      } else {
        toastify("error", "An error occurred during user creation.");
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      toastify("error", "Failed to sign up user.");
    } finally {
      setIsLoading(false);
    }
  };

  // get users
  const getusers = async () => {
    try {
      const [resDefUsers, resDefPersons] = await Promise.all([
        axios.get<IDefUsersType[]>("http://localhost:3000/def-users"),
        axios.get<IDefPersonsType[]>("http://localhost:3000/def-persons"),
      ]);

      const users = resDefUsers.data;
      const persons = resDefPersons.data;

      // Create a map of persons by user_id for quick lookup
      const personsMap = new Map<number, IDefPersonsType>();
      persons.forEach((person) => personsMap.set(person.user_id, person));

      // Merge data based on user_id
      const mergedData: IMergeUsersData[] = users.map((user) => {
        const person = personsMap.get(user.user_id) || {
          first_name: "",
          middle_name: "",
          last_name: "",
          job_title: "",
        };
        return {
          ...user,
          ...person,
        };
      });
      setUsers_data(mergedData);
    } catch (error) {
      console.error("Error fetching users or persons:", error);
    }
  };
  // update user
  // const updateUser = async () => {};
  // delete user
  const deleteUser = async (id: number) => {
    const [res_def_users, res_def_person, res_def_user_credentials] =
      await Promise.all([
        axios.delete(`http://localhost:3000/def-users/${id}`),
        axios.delete(`http://localhost:3000/def-persons/${id}`),
        axios.delete(`http://localhost:3000/def-user-credentials/${id}`),
      ]);
    console.log(res_def_users, res_def_person, res_def_user_credentials);
    if (
      res_def_users.status === 200 &&
      res_def_person.status === 200 &&
      res_def_user_credentials.status === 200
    ) {
      toastify("success", "Succesfully delete a user.");
      setIsLoading(false);
    }
  };
  // login
  const login = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);
    // console.log(email, password);
    try {
      await axios
        .post(
          "http://localhost:3000/login",
          // "http://localhost:3000/login",
          {
            email,
            password,
          }
        )
        .then((res) => {
          const user_res_data: IUserData = res.data;
          setAccess_token(user_res_data.access_token);
          setUserName(user_res_data.user_name);
          //-----------------------------------
          localStorage.setItem("access_token", JSON.stringify(user_res_data));
          setIsLoading(false);
          toastify("success", "Login successfully");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setError("Invalid Email");
            setIsLoading(false);
          } else if (error.response.status === 408) {
            setError("Invalid Credential");
            setIsLoading(false);
          }
          console.error("Error creating post:", error);
          toastify("warning", "Login Failed");
          return;
        });
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
    signup,
    getusers,
    deleteUser,
    users_data,
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
    toastify,
    formatDate,
  };
  return (
    <SqliteAuthContext.Provider value={value}>
      <ThemeContextProvider>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </ThemeContextProvider>
    </SqliteAuthContext.Provider>
  );
};
