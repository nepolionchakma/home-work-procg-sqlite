import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavContext } from "@/Context/NavContext";
import { IMergeUsersData, useSqliteAuthContext } from "@/Context/SqliteContext";
import { useEffect, useState } from "react";
import { EllipsisVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
const ManageUser = () => {
  const { toast } = useToast();
  const { getusers, users_data, deleteUser } = useSqliteAuthContext();
  // const { collapsed } = useNavContext();
  const [deleteActionId, setDeleteActionId] = useState<number>();
  useEffect(() => {
    getusers();
  }, [deleteActionId]);
  console.log(deleteActionId);
  // Start Action
  const handleAction = (id: number) => {
    setDeleteActionId(id);
    deleteUser(id);
  };
  // End Action
  // -----------------------------Pagination Start-------------------------------
  const [pageUsers, setPageUsers] = useState<number>(0);
  // Number of items per page
  const itemsPerPageUsers = 6;
  // Calculate the total number of pages
  const totalPagesUsers = Math.ceil(users_data?.length / itemsPerPageUsers);
  console.log(users_data?.length);
  // Handle page change
  const handleSelectPageUsers = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPagesUsers) {
      setPageUsers(newPage);
    }
  };
  const sortUsers = users_data?.sort((a, b) => a.user_id - b.user_id);
  // Slice data for the current page
  const sliceDataForPaginationUsers = sortUsers?.slice(
    pageUsers * itemsPerPageUsers,
    (pageUsers + 1) * itemsPerPageUsers
  );
  // Check if the length is valid
  const pageArrayLengthUsers = Number.isFinite(totalPagesUsers)
    ? totalPagesUsers
    : 0;
  // -----------------------------Pagination end--------------------------------

  return (
    <div className="flex flex-col h-[50%] justify-between">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
          });
        }}
      >
        Show Toast
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">id</TableHead>
            <TableHead>username</TableHead>
            <TableHead>job title</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead className="text-right">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sliceDataForPaginationUsers.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell className="font-medium">{user.user_id}</TableCell>
              <TableCell>{user.user_name}</TableCell>
              <TableCell>{user.job_title}</TableCell>
              <TableCell>{user.email_addresses}</TableCell>
              <TableCell>{user.tenant_id}</TableCell>
              <TableCell className="text-left">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(String(user.user_id))
                      }
                    >
                      Copy User ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*--------------------------------- pagination start--------------------------- */}
      <div className=" flex gap-1 p-1 fixed bottom-2 bg-white w-full">
        <button
          className={
            pageUsers > 0
              ? "cursor-pointer px-2 py-1 border-2 hover:bg-green-300"
              : "disabled cursor-pointer px-2 py-1 border-2 bg-slate-300 "
          }
          onClick={() => handleSelectPageUsers(pageUsers - 1)}
        >
          Prev
        </button>
        {[...Array(pageArrayLengthUsers)].map((_, i) => (
          <button
            key={i}
            className={
              pageUsers === i
                ? "cursor-pointer px-2 bg-green-300 py-1 border-2"
                : "cursor-pointer px-2 py-1 border-2 hover:bg-green-300"
            }
            onClick={() => handleSelectPageUsers(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={
            pageUsers < totalPagesUsers - 1
              ? "cursor-pointer px-2 py-1 border-2 hover:bg-green-300"
              : "disabled cursor-pointer px-2 py-1 border-2 bg-slate-300"
          }
          onClick={() => handleSelectPageUsers(pageUsers + 1)}
        >
          Next
        </button>
      </div>
      {/*--------------------------------- pagination End--------------------------- */}
    </div>
  );
};
export default ManageUser;
