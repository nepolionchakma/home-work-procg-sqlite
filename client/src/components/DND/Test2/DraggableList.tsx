import React, { CSSProperties } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IMergeUsersData } from "@/Context/SqliteContext";

interface DraggableListProps {
  id: string;
  items: IMergeUsersData[];
}

const DraggableList: React.FC<DraggableListProps> = ({ id, items }) => {
  return (
    <SortableContext
      id={id}
      items={items.map((user) => user.user_id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="p-4">
        {items.map((item) => (
          <DraggableItem
            key={item.user_id}
            id={item.user_id.toString()}
            user={item}
          />
        ))}
      </div>
    </SortableContext>
  );
};

interface DraggableItemProps {
  id: string;
  user: IMergeUsersData;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, user }) => {
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
      className="bg-gray-300 shadow-lg border border-sky-500 rounded-lg cursor-pointer shadow-slate-400 hover:shadow-sky-500 hover:shadow-lg hover:duration-500"
    >
      <div className="flex justify-between bg-sky-500 rounded-t-lg py-1 px-2 items-center text-sky-500">
        {user.user_id}
      </div>
      <div className="p-3">
        <input
          autoComplete="on"
          type="text"
          className="rounded-lg"
          id={String(user.user_id)}
          name={String(user.user_id)}
        />
      </div>
    </div>
  );
};

export default DraggableList;
