import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  DragOverEvent,
  DragCancelEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DraggableList from "./DraggableList";
import DroppableList, { DroppableItem } from "./DroppableList";

interface User {
  user_id: number;
  user_name: string;
}
const id = Math.floor(Math.random() * 1000 + 1);
const initialLeft: User[] = [{ user_id: id, user_name: String(id) }];
const initialRight: User[] = [
  { user_id: 1, user_name: "b" },
  { user_id: 2, user_name: "c" },
  { user_id: 3, user_name: "d" },
  { user_id: 4, user_name: "e" },
];

const App: React.FC = () => {
  const [leftItems, setLeftItems] = useState<User[]>(initialLeft);
  const [rightItems, setRightItems] = useState<User[]>(initialRight);
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };
  //Active Item
  const left = leftItems.find((item) => item.user_id === activeId);
  const right = rightItems.find((item) => item.user_id === activeId);
  const activeItem = activeId ? left || right : null;

  //Find left or left container
  const findContainer = (id: string | number): string | undefined => {
    if (leftItems.some((item) => item.user_id === id)) {
      return "left";
    }
    if (rightItems.some((item) => item.user_id === id)) {
      return "right";
    }
    return undefined;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Find containers for active and over items
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    const activeItemId = active.id;
    const overItemId = over.id;

    // Ensure that leftEmptyWidget and users are arrays
    if (!Array.isArray(leftItems) || !Array.isArray(rightItems)) {
      console.error("Expected leftItems and users to be arrays");
      return;
    }

    const activeIndexInLeft = leftItems.findIndex(
      (item) => item.user_id === activeItemId
    );
    const activeIndexInRight = rightItems.findIndex(
      (item) => item.user_id === activeItemId
    );

    let newIndex = rightItems.length; // Default new index at end

    if (overItemId) {
      // Determine new index for the item being moved
      const overIndexInRight = rightItems.findIndex(
        (item) => item.user_id === overItemId
      );
      newIndex = overIndexInRight === -1 ? rightItems.length : overIndexInRight;
    }

    if (activeContainer === "left" && overContainer === "right") {
      // Move item from leftEmptyWidget to users
      setRightItems((prev) => {
        const updatedRight = [...prev];
        const [movedItem] = leftItems.splice(activeIndexInLeft, 1);
        updatedRight.splice(newIndex, 0, movedItem);

        // Generate a new item and add it to the left side
        const newId = Math.floor(Math.random() * 1000 + 1);
        const newItem = {
          user_id: newId,
          user_name: String(newId),
        };
        setLeftItems((prev) => [...prev, newItem]);

        return updatedRight;
      });
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over) {
      const activeItemId = active.id;
      const overItemId = over.id;

      // Handling dragging from left to right
      if (active.data.current?.sortable?.containerId === "left") {
        const draggedItem = leftItems.find(
          (item) => item.user_id === activeItemId
        );

        if (draggedItem) {
          // Add the dragged item to the right side
          setRightItems((prev) => [...prev, draggedItem]);

          // Remove the dragged item from the left side
          setLeftItems((prev) =>
            prev.filter((item) => item.user_id !== activeItemId)
          );
        }
      }

      // Handling reordering within right side
      else if (active.data.current?.sortable?.containerId === "right") {
        const oldIndex = rightItems.findIndex(
          (item) => item.user_id === activeItemId
        );
        const newIndex = rightItems.findIndex(
          (item) => item.user_id === overItemId
        );

        if (oldIndex !== -1 && newIndex !== -1) {
          setRightItems(arrayMove(rightItems, oldIndex, newIndex));
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex">
        <DraggableList id="left" items={leftItems} />
        <DroppableList id="right" items={rightItems} setItems={setRightItems} />
      </div>
      <DragOverlay>
        {activeItem ? (
          <div>
            <DroppableItem user={activeItem} id={String(activeItem.user_id)} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
