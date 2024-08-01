import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  items: { user_id: number; user_name: string }[];
  children: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = isOver ? "bg-green-200" : "bg-gray-200";

  return (
    <div ref={setNodeRef} className={`p-4 border rounded w-1/2 ${style}`}>
      {children}
    </div>
  );
};

export default Droppable;
