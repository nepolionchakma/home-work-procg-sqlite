import { Link, Outlet } from "react-router-dom";
import AddUser from "../../components/AddUser/AddUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageUser from "@/components/ManageUser/ManageUser";
import { DataTable } from "@/components/DataTable/DataTable";
import DND1 from "@/components/DND/DND";
import DND from "@/components/DND/Test/Test";
import Test2 from "@/components/DND/Test2/Test2";
// import { DND } from "@/components/DND/Test/Test";

const Setup_and_Administration = () => {
  return (
    <div>
      {/* <AddUser /> */}
      <div>
        <Tabs defaultValue="add" className=" w-full">
          <TabsList className=" flex items-center">
            <TabsTrigger value="add">Add User</TabsTrigger>
            <TabsTrigger value="manage">Manage User</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="dnd">DND</TabsTrigger>
            <TabsTrigger value="dnd1">DND1</TabsTrigger>
            <TabsTrigger value="dnd2">DND2</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <AddUser />
          </TabsContent>
          <TabsContent value="manage" className="">
            <ManageUser />
          </TabsContent>
          <TabsContent value="settings">Change your password here.</TabsContent>
          <TabsContent value="dnd">
            <DND />
          </TabsContent>
          <TabsContent value="dnd1">
            <DND1 />
          </TabsContent>
          <TabsContent value="dnd2">
            <Test2 />
          </TabsContent>
          <TabsContent value="table">
            <DataTable />
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="flex gap-1 justify-between">
        <Link
          to="add-user"
          className="bg-slate-200 hover:bg-slate-200 px-3 py-2 border-b-2 border-slate-400"
        >
          Add User
        </Link>
        <Link
          to=""
          className="bg-slate-200 hover:bg-slate-200 px-3 py-2 border-b-2 border-slate-400"
        >
          Manage Users
        </Link>
        <Link
          to=""
          className="bg-slate-200 hover:bg-slate-200 px-3 py-2 border-b-2 border-slate-400"
        >
          Settings
        </Link>
      </div>
      <div className="w-full h-screen border-t-2">
        <Outlet />
      </div> */}
    </div>
  );
};
export default Setup_and_Administration;
