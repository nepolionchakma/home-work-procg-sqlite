import React from "react";
import { DragOverlay } from "@dnd-kit/core";
import { IMergeUsersData } from "@/Context/SqliteContext";

interface DragOverlayComponentProps {
  user: IMergeUsersData;
}

const DragOverlayComponent: React.FC<DragOverlayComponentProps> = ({
  user,
}) => {
  return (
    <DragOverlay>
      <div className="p-2 mb-2 bg-white border rounded shadow cursor-pointer">
        {user.user_name}
      </div>
    </DragOverlay>
  );
};

export default DragOverlayComponent;
