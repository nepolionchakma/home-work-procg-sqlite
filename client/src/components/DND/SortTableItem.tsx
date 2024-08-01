import React, { Dispatch, SetStateAction } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IMergeUsersData } from "@/Context/SqliteContext";
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
import {
  FiMaximize,
  FiMinimize2,
  FiPlus,
  FiSave,
  FiTrash,
} from "react-icons/fi";
import { useDraggable } from "@dnd-kit/core";
interface SortTableItemProps {
  id: number;
  user: IMergeUsersData;
  index: number;
}
const SortTableItem: React.FC<SortTableItemProps> = ({ id, user }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div style={style}>
      <div
        className={`border-2 p-4 pt-0 shadow-xl  touch-none duration-700 rounded bg-slate-400 w-[100%] mx-auto hover:shadow-slate-600 `}
      >
        <div
          className="cursor-grab py-4"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        ></div>
        <div className="flex flex-row-reverse gap-3 ">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="hover:bg-red-500 hover:text-white rounded-md p-1">
                {" "}
                <FiTrash />{" "}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Really Want To <span className="text-red-600">Delete</span> ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently{" "}
                  <span className="text-red-600">delete</span> from database and{" "}
                  <span className="text-red-600">remove</span> your data from
                  our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-green-700 text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  // onClick={() =>
                  //   handleDeleteEmployee(employee.employee_id, "employees")
                  // }
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div
            className="hover:bg-sky-500 hover:text-white rounded-md p-1"
            // onClick={() => handleMinMax(index, employee.employee_id)}
          >
            {/* {" "}
            {widget_state ? <FiMaximize /> : <FiMinimize2 />}{" "} */}
          </div>
        </div>
        <div className={`flex flex-col gap-5 `}>
          <div className={` flex gap-5 `}>
            <div>
              <label htmlFor="">User Name</label>
              <input
                className="px-2 rounded  "
                type="text"
                readOnly
                value={user.user_name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SortTableItem;
