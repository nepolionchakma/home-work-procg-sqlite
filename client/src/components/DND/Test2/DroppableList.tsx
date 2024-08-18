import { CSS } from "@dnd-kit/utilities";
import React, { CSSProperties } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IMergeUsersData, useSqliteAuthContext } from "@/Context/SqliteContext";
import { Maximize, Minimize, Trash } from "lucide-react";
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
export interface DroppableListProps {
  id: string;
  items: IMergeUsersData[];
  setItems: React.Dispatch<React.SetStateAction<IMergeUsersData[]>>;
}

const DroppableList: React.FC<DroppableListProps> = ({
  id,
  items,
  setItems,
}) => {
  return (
    <SortableContext
      id={id}
      items={items.map((user) => user.user_id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col gap-4 p-4 ">
        {items.map((item, index) => (
          <DroppableItem
            key={item.user_id}
            id={item.user_id.toString()}
            item={item}
            items={items}
            index={index}
            setItems={setItems}
          />
        ))}
      </div>
    </SortableContext>
  );
};

interface DroppableItemProps {
  id: string;
  item: IMergeUsersData;
  items: IMergeUsersData[];
  index: number;
  setItems: React.Dispatch<React.SetStateAction<IMergeUsersData[]>>;
}

export const DroppableItem: React.FC<DroppableItemProps> = ({
  id,
  item,
  items,
  index,
  setItems,
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.user_id });

  const { deleteUser } = useSqliteAuthContext();

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "grab",
  };

  const handleDelete = (id: number) => {
    deleteUser(id);
    const remainingUser = items.filter((item) => item.user_id !== id);
    if (remainingUser.length !== 0) {
      setItems(remainingUser);
    }
  };

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    if (index !== undefined) {
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      );
    }
  };
  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="bg-gray-300 shadow-lg border border-sky-500 rounded-lg cursor-pointer shadow-slate-400 hover:shadow-sky-500 hover:shadow-lg hover:duration-500"
    >
      <div className="flex justify-between bg-sky-500 rounded-t-lg px-2 text-white items-center">
        <span>{index}</span>
        <div className="flex text-xs duration-700">
          {item.widget_state === 1 ? (
            <Minimize
              size={30}
              onClick={() => handleChange(index, "widget_state", 0)}
              className="p-1 cursor-pointer hover:text-slate-800"
            />
          ) : (
            <Maximize
              size={30}
              onClick={() => handleChange(index, "widget_state", 1)}
              className="p-1 cursor-pointer hover:text-slate-800"
            />
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="hover:text-white rounded-md">
                <Trash
                  size={30}
                  className="p-1 cursor-pointer hover:text-red-600"
                />
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
                <AlertDialogCancel className="bg-sky-700 text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={() => handleDelete(item.user_id)}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="p-3">
        {/* 1st row */}
        <div className="flex gap-3">
          <div className="flex flex-col w-[25%]">
            <label htmlFor={`first_name-${index}`}>First Name</label>
            <input
              className="px-2 rounded"
              type="text"
              id={`first_name-${index}`}
              name={`first_name-${index}`}
              value={item.first_name}
              onChange={(e) =>
                handleChange(index, "first_name", e.target.value)
              }
            />
          </div>
          <div className="flex flex-col w-[25%]">
            <label htmlFor={`last_name-${index}`}>Last Name</label>
            <input
              className="px-2 rounded"
              type="text"
              id={`last_name-${index}`}
              name={`last_name-${index}`}
              value={item.last_name}
              onChange={(e) => handleChange(index, "last_name", e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[44.5%]">
            <label htmlFor={`email_addresses-${index}`}>Email</label>
            <input
              className="px-2 rounded"
              type="text"
              id={`email_addresses-${index}`}
              name={`email_addresses-${index}`}
              value={item.email_addresses}
              onChange={(e) =>
                handleChange(index, "email_addresses", e.target.value)
              }
            />
          </div>
        </div>
        {/* 2nd row */}
        {item.widget_state === 1 && (
          <div
            className={`flex gap-3 my-1 ease-in ${
              item.widget_state === 1 ? "duration-700" : "duration-700"
            }`}
          >
            <div className="flex flex-col w-[25%]">
              <label htmlFor={`user_name-${index}`}>User Name</label>
              <input
                className="px-2 rounded"
                type="text"
                id={`user_name-${index}`}
                name={`user_name-${index}`}
                value={item.user_name}
                onChange={(e) =>
                  handleChange(index, "user_name", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-[25%]">
              <label htmlFor={`job_title-${index}`}>Job Title : </label>
              <select
                className="border rounded py-[1px]"
                name={`job_title-${index}`}
                id={`job_title-${index}`}
                value={item.job_title}
                onChange={(e) =>
                  handleChange(index, "job_title", e.target.value)
                }
              >
                <option>None</option>
                <option value="full_stack">Full Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="ui_designer">UI Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="flex flex-col w-[25%]">
              <label htmlFor={`user_type-${index}`}>User Type : </label>
              <select
                className="border rounded py-[1px]"
                name={`user_type-${index}`}
                id={`user_type-${index}`}
                value={item.user_type}
                onChange={(e) =>
                  handleChange(index, "user_type", e.target.value)
                }
              >
                <option>None</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="client">Client</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex flex-col w-[25%]">
              <label htmlFor={`tenant_id-${index}`}>Tenant Id : </label>
              <select
                className="border rounded py-[1px]"
                name={`tenant_id-${index}`}
                id={`tenant_id-${index}`}
                value={item.tenant_id}
                onChange={(e) =>
                  handleChange(index, "tenant_id", e.target.value)
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DroppableList;
