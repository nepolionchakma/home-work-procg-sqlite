import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import data from "@/JSONData/JSONData";
import { FilePlus2, Pen, Pencil, Plus, X } from "lucide-react";
const DataSource1 = () => {
  return (
    <div className="">
      <div className="flex">
        <div className="flex gap-3 border px-6 py-3">
          <h3>actions</h3>
          <h3>view</h3>
        </div>
        <div className="flex gap-3 border px-6 py-3">
          <FilePlus2 />
          <Pencil />
          <X />
        </div>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="bg-slate-100 py-3">
            <TableHead className="border">Datasource Name</TableHead>
            <TableHead className="border">Description</TableHead>
            <TableHead className="border">Application Type</TableHead>
            <TableHead className="border">Application Type Version</TableHead>
            <TableHead className="border">
              Last Access Synchronization Date
            </TableHead>
            <TableHead className="border">
              Last Access Synchronization Status
            </TableHead>
            <TableHead className="border">
              Last Transaction Synchronization Date
            </TableHead>
            <TableHead className="border">
              Last Transaction Synchronization Status
            </TableHead>
            <TableHead className="text-right border">
              Default Datasource
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="border">{data.datasource_name}</TableCell>
              <TableCell className="border">{data.description}</TableCell>
              <TableCell className="border">{data.application_type}</TableCell>
              <TableCell className="border">
                {data.application_type_version}
              </TableCell>
              <TableCell className="border">
                {data.last_access_synchronization_date}
              </TableCell>
              <TableCell className="border">
                {data.last_access_synchronization_status}
              </TableCell>
              <TableCell className="border">
                {data.last_transaction_synchronization_date}
              </TableCell>
              <TableCell className="border">
                {data.last_transaction_synchronization_status}
              </TableCell>
              <TableCell className="text-right">
                {data.default_datasource}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};
export default DataSource1;
