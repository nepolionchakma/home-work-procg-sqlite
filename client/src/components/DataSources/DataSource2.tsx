import * as React from "react";
//
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

//
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  FilePlus2,
  MoreHorizontal,
  Pencil,
  SaveAll,
  Trash,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dataSources from "@/JSONData/JSONData";
import datapng from "/datasources.png";
import AddData from "../AddData/AddData";

export interface IDataSourceTypes {
  id: number;
  datasource_name: string;
  description: string;
  application_type: string;
  application_type_version: string;
  last_access_synchronization_date: string;
  last_access_synchronization_status: string;
  last_transaction_synchronization_date: string;
  last_transaction_synchronization_status: string;
  default_datasource: string;
}

const DataSources2 = () => {
  const [data, setData] = React.useState<IDataSourceTypes[]>([...dataSources]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 5, //default page size
  });
  const [editRow, setEditRow] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [editableCells, setEditableCells] = React.useState<{
    [key: string]: { [columnId: string]: string };
  }>({});
  const handleRowSelection = (id: number) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        // If the id is already selected, remove it
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        // If the id is not selected, add it
        return [...prevSelected, id];
      }
    });
  };
  const handleEditOpen = () => {
    setEditRow(!editRow);
  };
  const handleInputChange = (id: number, field: string, value: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  const idAlls = data.map((data) => data.id);
  const handleSelectAll = () => {
    setSelected(idAlls);
  };
  const maxID = Math.max(...idAlls);
  console.log(maxID, "maxid");
  const columns: ColumnDef<IDataSourceTypes>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onClick={handleSelectAll}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onClick={() => handleRowSelection(row.original.id)}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "datasource_name",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Datasource Name{" "}
            <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer inline-block" />
          </div>
        );
      },
      // header: "Datasource Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("datasource_name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize w-48">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "application_type",
      header: "Application Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("application_type")}</div>
      ),
    },
    {
      accessorKey: "application_type_version",
      header: "Application Type Version",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("application_type_version")}
        </div>
      ),
    },
    {
      accessorKey: "last_access_synchronization_date",
      header: "Last Access Synchronization Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("last_access_synchronization_date")}
        </div>
      ),
    },
    {
      accessorKey: "last_access_synchronization_status",
      header: "Last Access Synchronization Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("last_access_synchronization_status")}
        </div>
      ),
    },
    {
      accessorKey: "last_transaction_synchronization_date",
      header: "Last Transaction Synchronization Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("last_transaction_synchronization_date")}
        </div>
      ),
    },
    {
      accessorKey: "last_transaction_synchronization_status",
      header: "Last Transaction Synchronization Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("last_transaction_synchronization_status")}
        </div>
      ),
    },
    {
      accessorKey: "default_datasource",
      header: "Default Datasource",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("default_datasource")}</div>
      ),
    },
  ];
  // console.log(selected);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  console.log(selected, "edited");
  // shadcn form
  const FormSchema = z.object({
    datasource_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    application_type: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    application_type_version: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_access_synchronization_status: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    last_transaction_synchronization_status: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    default_datasource: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datasource_name: "",
      description: "",
      application_type: "",
      application_type_version: "",
      last_access_synchronization_status: "",
      last_transaction_synchronization_status: "",
      default_datasource: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="overflow-x-scroll">
      {/* top icon and columns*/}
      <div className="flex gap-3 items-center py-2">
        <div className="flex gap-3">
          <div className="flex gap-3 px-4 py-2 border rounded">
            <h3>actions</h3>
            <h3>view</h3>
          </div>
          <div className="flex gap-3 px-4 py-2 border rounded">
            <AlertDialog>
              <AlertDialogTrigger>
                <FilePlus2 className="cursor-pointer hover:text-green-500" />
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-300">
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Datasource</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <AddData />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Pencil
              onClick={handleEditOpen}
              className={`${
                editRow && "text-sky-500"
              } cursor-pointer hover:text-sky-500`}
            />
            <SaveAll className="cursor-pointer hover:text-green-500" />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash className="cursor-pointer hover:text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <Input
          placeholder="Filter Datasource Name..."
          value={
            (table.getColumn("datasource_name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("datasource_name")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm px-4 py-2"
        />
        {/* Columns */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border bg-slate-200">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id} className="border">
                      {index === 0 ? (
                        <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={(value) =>
                            row.toggleSelected(!!value)
                          }
                          onClick={() => handleRowSelection(row.original.id)}
                        />
                      ) : selected.find((id) => id === row.original.id) ===
                          row.original.id && editRow ? (
                        <input
                          type="text"
                          className="border w-full"
                          value={
                            editableCells[row.id]?.[cell.column.id] ??
                            cell.getValue()
                          }
                          onChange={(e) =>
                            handleInputChange(
                              row.original.id,
                              cell.column.id,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Start Pagination */}
      <div className="flex items-center justify-end space-x-2 py-1 fixed bottom-3">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 fixed right-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-slate-300"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-slate-300"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DataSources2;
