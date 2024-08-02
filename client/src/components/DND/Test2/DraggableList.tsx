import React, { CSSProperties } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface User {
  user_id: number;
  user_name: string;
}

interface DraggableListProps {
  id: string;
  items: User[];
}

const DraggableList: React.FC<DraggableListProps> = ({ id, items }) => {
  return (
    <SortableContext
      id={id}
      items={items.map((user) => user.user_id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="w-1/2 p-4 bg-gray-100">
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
  user: User;
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
      className="p-2 mb-2 bg-white border rounded shadow cursor-pointer"
    >
      {user.user_name}
    </div>
  );
};

export default DraggableList;
