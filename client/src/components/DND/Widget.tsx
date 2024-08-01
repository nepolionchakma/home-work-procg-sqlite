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
interface SortTableItemProps {
  id: number;
  index: number;
  item: IMergeUsersData;
  items: IMergeUsersData[];
  setItems: Dispatch<SetStateAction<IMergeUsersData[]>>;
}
const Widget: React.FC<SortTableItemProps> = ({
  id,
  index,
  item,
  items,
  setItems,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
  };
  // const handleMinMax = (index: number, user_id: number) => {
  //   const updatedItems = [...items];
  //   // updatedWidget_state[index].user_id = employee_id;
  //   // updatedWidget_state[index].position = index;
  //   // updatedWidget_state[index].widget_state =
  //   //   !updatedWidget_state[index].widget_state;
  //   const currentItem = updatedItems[index];
  //   updatedItems[index] = {
  //     ...currentItem,
  //     user_id,
  //   };
  //   setItems(updatedItems);
  // };
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
                  //   handleDeleteEmployee(employee.employee_id, "users")
                  // }
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div
            className="hover:bg-sky-500 hover:text-white rounded-md p-1"
            // onClick={() => handleMinMax(index, item.user_id)}
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
                value={item.user_name}
                readOnly
                onChange={(e) =>
                  handleChange(index, "user_name", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Widget;
