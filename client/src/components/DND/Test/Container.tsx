import { IMergeUsersData } from "@/Context/SqliteContext";
import { useDroppable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortTableItem from "../Test/SortableItem";
import { Dispatch, SetStateAction } from "react";

interface IContainerProps {
  id: string;
  users: IMergeUsersData[];
  setUsers: Dispatch<SetStateAction<IMergeUsersData[]>>;
}
const Container = (props: IContainerProps) => {
  const { id, users, setUsers } = props;

  return (
    <SortableContext
      id={id}
      items={users.map((user) => user.user_id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="bg-slate-600 p-3 flex flex-col gap-5">
        {users.map((user, index) => (
          <SortTableItem
            key={user.user_id}
            id={user.user_id}
            index={index}
            user={user}
            users={users}
            setUsers={setUsers}
          />
        ))}
      </div>
    </SortableContext>
  );
};
export default Container;
