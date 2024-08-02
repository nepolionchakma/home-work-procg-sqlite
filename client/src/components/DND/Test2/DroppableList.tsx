import { CSS } from "@dnd-kit/utilities";
import React, { CSSProperties } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface User {
  user_id: number;
  user_name: string;
}

interface DroppableListProps {
  id: string;
  items: User[];
  setItems?: React.Dispatch<React.SetStateAction<User[]>>;
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
  user: User;
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
      className="p-2 mb-2 bg-white border rounded shadow cursor-pointer"
    >
      {user.user_name}
    </div>
  );
};

export default DroppableList;
