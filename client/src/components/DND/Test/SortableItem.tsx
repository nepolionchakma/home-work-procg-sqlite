import { IMergeUsersData } from "@/Context/SqliteContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import User, { ISortableProps } from "./User";
import { CSSProperties, PropsWithChildren } from "react";

const SortableItem = (props: PropsWithChildren<ISortableProps>) => {
  const { id, user, index, users, setUsers } = props;
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <div style={style} className="bg-yellow-200 rounded-md">
      <div
        className="cursor-grab py-2"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      ></div>
      <div>
        <User
          id={id}
          user={user}
          users={users}
          setUsers={setUsers}
          index={index}
        />
      </div>
    </div>
  );
};
export default SortableItem;
