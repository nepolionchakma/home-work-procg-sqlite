import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import Alerts from "./Pages/Top/Alerts";
import Task from "./Pages/Top/Tasks";
import Notification from "./Pages/Top/Notifications";
import Home from "./Pages/Top/Home";
import Risk_Management from "./Pages/Left/Risk_Management";
import Control_Management from "./Pages/Left/Control_Management";
import Issue_Management from "./Pages/Left/Issue_Management";
import Setup_and_Administration from "./Pages/Left/Setup_and_Administration";
import Result_Management from "./Pages/Left/Result_Management";
import Continuous_Control_Management from "./Pages/Left/Continuous_Control_Management";
import LogIn from "./Pages/LogIn/LogIn";
import Profile from "./Pages/Top/Profile";
import Security from "./Pages/Top/Security";
import Settings from "./Pages/Top/Settings";
import AddUser from "./components/AddUser/AddUser";
import DataSources from "./Pages/Left/DataSources";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/alerts",
        element: <Alerts />,
      },
      {
        path: "/tasks",
        element: <Task />,
      },
      {
        path: "/notifications",
        element: <Notification />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/security",
        element: <Security />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/finance/risk-management",
        element: <Risk_Management />,
      },
      {
        path: "/finance/control-management",
        element: <Control_Management />,
      },
      {
        path: "/finance/issue-management",
        element: <Issue_Management />,
      },
      {
        path: "/continuous-monitoring/continuous-control-management",
        element: <Continuous_Control_Management />,
      },
      {
        path: "/continuous-monitoring/result-management",
        element: <Result_Management />,
      },
      {
        path: "tools",
        children: [
          {
            path: "setup-and-administration",
            element: <Setup_and_Administration />,
          },
          {
            path: "datasources",
            element: <DataSources />,
          },
          { path: "add-user", element: <AddUser /> },
          { path: "manage-user", element: <AddUser /> },
        ],
      },
      // /tools/datasources
      {
        path: "/add-user",
        element: <AddUser />,
      },
    ],
  },
  {
    path: "login",
    element: <LogIn />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
