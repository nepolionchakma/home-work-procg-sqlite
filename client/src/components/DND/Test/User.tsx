import { FiTrash } from "react-icons/fi";
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
import { IMergeUsersData } from "@/Context/SqliteContext";
import { Dispatch, SetStateAction } from "react";

export interface ISortableProps {
  id: number | string;
  index?: number;
  user?: IMergeUsersData;
  users: IMergeUsersData[];
  setUsers: Dispatch<SetStateAction<IMergeUsersData[]>>;
}

const User = (props: ISortableProps) => {
  const { id, index, user, users, setUsers } = props;

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    if (index !== undefined) {
      const updatedItems = [...users];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      setUsers((prev) => ({ updatedItems, ...prev }));
    }
  };

  return (
    <div className="flex p-3 bg-slate-500 border rounded gap-5 h-full">
      <div className="flex flex-col ">
        <label htmlFor={`user-name-${id}`}>User Name</label>
        <input
          id={`user-name-${id}`}
          className="px-2 rounded"
          type="text"
          value={user?.user_name || ""}
          readOnly
          onChange={(e) =>
            index !== undefined &&
            handleChange(index, "user_name", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default User;
