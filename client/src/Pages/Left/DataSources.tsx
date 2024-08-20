import DataSource1 from "@/components/DataSources/DataSource1";
import DataSource2 from "@/components/DataSources/DataSource2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const DataSources = () => {
  return (
    <div className="">
      <Tabs defaultValue="add" className=" w-full">
        <TabsList className=" flex items-center">
          <TabsTrigger value="add">Add User</TabsTrigger>
          <TabsTrigger value="manage">Manage User</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <DataSource1 />
        </TabsContent>
        <TabsContent value="manage" className="">
          <DataSource2 />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default DataSources;
