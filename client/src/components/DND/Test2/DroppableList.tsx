import { CSS } from "@dnd-kit/utilities";
import React, { CSSProperties } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IMergeUsersData } from "@/Context/SqliteContext";

interface DroppableListProps {
  id: string;
  items: IMergeUsersData[];
  setItems?: React.Dispatch<React.SetStateAction<IMergeUsersData[]>>;
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
      <div className="w-1/2 p-4 bg-gray-200">
        {items.map((item) => (
          <DroppableItem
            key={item.user_id}
            id={item.user_id.toString()}
            user={item}
          />
        ))}
      </div>
    </SortableContext>
  );
};

interface DroppableItemProps {
  id: string;
  user: IMergeUsersData;
}

export const DroppableItem: React.FC<DroppableItemProps> = ({ id, user }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: user.user_id });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 mb-2 bg-slate-400 border rounded shadow cursor-pointer"
    >
      <div className="flex flex-col w-[25%]">
        <label htmlFor="">Job Title</label>
        <input
          className="px-2 rounded"
          type="text"
          value={user.job_title}
          readOnly
        />
      </div>
      {user.user_name}
    </div>
  );
};

export default DroppableList;
