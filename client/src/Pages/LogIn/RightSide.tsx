import { Button } from "../../components/ui/button";

import logo from "/Top_Nav_Icon/logo.png";
import language from "/LogIn/language.svg";
import down_arrow from "/LogIn/down_arrow.svg";
// import { useAuthContext } from "@/Context/AuthContext";
import { useState } from "react";
import { useSqliteAuthContext } from "@/Context/SqliteContext";
const RightSide: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, setError } = useSqliteAuthContext();
  const [checked, setChecked] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email) return setError("Field your email please");
      if (!password) return setError("Field your password please");
      await login(email, password);
    } catch (error: any) {
      console.error("login error");
    }
  };
  return (
    <div>
      <div className="p-4 flex flex-col gap-3 border shadow-2xl rounded-lg hover:shadow-login duration-700">
        {/* form stsrt */}
        <div className="flex flex-col gap-2 ">
          <img className="w-[100px]" src={logo} alt="Logo" />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg">Welcome to PROCG-POC Project</h3>
            <span className="text-slate-500  text-sm">
              Please enter your credentials to access your account.
            </span>
          </div>
        </div>
        <div className=" ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-slate-500 text-xs" htmlFor="email">
                Email address
              </label>
              <input
                autoFocus
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter mail address"
                className="py-1 px-2 rounded-md text-xs border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-slate-500 text-xs" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="py-1 px-2 rounded-md text-xs border"
              />
              <label
                className="flex flex-row-reverse text-url text-sm"
                htmlFor=""
              >
                Forget password?
              </label>
            </div>
            <div className="flex gap-4 text-xs">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            {error && (
              <div
                className="flex gap-1 items-center mx-auto text-xs text-login"
                id="error"
              >
                <i className="fa-solid fa-circle-exclamation"></i>
                <label htmlFor="error" className="w-[99%] ">
                  {error}
                </label>
              </div>
            )}
            <div>
              <Button
                disabled={!email || !password}
                type="submit"
                className="w-full bg-login text-xs"
              >
                Login
              </Button>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <Button className="w-full bg-button_sso text-xs">
                Continue with SSO
              </Button>
            </div>
            <div className="p-4 rounded-md bg-slate-200 text-xs">
              <span>
                By clicking Continue, you agree to our Terms of Service and
                Privacy Policy.
              </span>
            </div>
            <div className="flex gap-2 items-center justify-center text-xs">
              <img className="w-3" src={language} alt="language img" />
              <label>English</label>
              <img src={down_arrow} alt="down_arrow img" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RightSide;
