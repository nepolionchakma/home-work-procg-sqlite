import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortTableItem from "./SortTableItem";
import { IMergeUsersData, useSqliteAuthContext } from "@/Context/SqliteContext";
import Widget from "./Widget";

const DND1 = () => {
  const { getusers, users_data, toastify } = useSqliteAuthContext();
  const [items, setItems] = useState<IMergeUsersData[]>(users_data);
  useEffect(() => {
    getusers();
  }, []);
  const id = Math.floor(Math.random() * 1000 + 1);
  const [leftEmptyWidget, setLeftEmptyWidget] = useState<IMergeUsersData[]>([
    {
      user_id: id,
      user_name: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      job_title: "",
      user_type: "",
      tenant_id: 1,
      email_addresses: "",
      created_by: "",
      created_on: "",
      last_update_by: "",
      last_update_on: "",
    },
  ]);

  const [activeId, setActiveId] = useState<string | number | null>(null);
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-area",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    toastify("info", `Picked up draggable item ${active.id}.`);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    if (active.id !== over.id) {
      const activeIndexInLeft = leftEmptyWidget.findIndex(
        (widget) => widget.user_id === active.id
      );
      const activeIndexInRight = items.findIndex(
        (widget) => widget.user_id === active.id
      );
      const overIndexInLeft = leftEmptyWidget.findIndex(
        (widget) => widget.user_id === over.id
      );
      const overIndexInRight = items.findIndex(
        (widget) => widget.user_id === over.id
      );

      setItems((user) => {
        return arrayMove(user, activeIndexInRight, overIndexInRight);
      });

      if (activeIndexInLeft !== -1) {
        const newLeftWidgets = [...leftEmptyWidget];
        const movedItem = newLeftWidgets.splice(activeIndexInLeft, 1)[0];
        // movedItem.widget_state = false;

        if (overIndexInRight !== -1) {
          const newRightWidgets = [...items];
          newRightWidgets.splice(overIndexInRight, 0, movedItem); // Insert after the hovered item
          setItems(newRightWidgets);
        } else if (overIndexInLeft !== -1) {
          newLeftWidgets.splice(overIndexInLeft, 0, movedItem);
        } else {
          const newRightWidgets = [...items, movedItem]; // Insert at the bottom if no specific position
          setItems(leftEmptyWidget);
        }

        setLeftEmptyWidget(newLeftWidgets);
        if (newLeftWidgets.length === 0) {
          setLeftEmptyWidget([
            {
              user_id: id,
              user_name: "",
              first_name: "",
              middle_name: "",
              last_name: "",
              job_title: "",
              user_type: "",
              tenant_id: 1,
              email_addresses: "",
              created_by: "",
              created_on: "",
              last_update_by: "",
              last_update_on: "",
            },
          ]);
        }
      }
    }
  };
  // const renderActiveItem = () => {
  //   const activeWidget =
  //     leftEmptyWidget.find((widget) => widget.user_id === activeId) ||
  //     items.find((widget) => widget.user_id === activeId);
  //   return activeWidget ? <div className="h-[200px] w-[300px]"></div> : null;
  // };
  // console.log(items.map((item) => item.user_id));

  return (
    <div className="flex justify-between p-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-2">
          {leftEmptyWidget.map((user, index) => (
            <SortTableItem
              key={user.user_id}
              id={user.user_id}
              user={user}
              index={index}
            />
          ))}
          <div
          // ref={setNodeRef}
          // className={`p-3 ${isOver ? "bg-green-200" : "bg-gray-200"}`}
          >
            <SortableContext
              items={items.map((item) => item.user_id)}
              strategy={verticalListSortingStrategy}
            >
              <div className={`flex flex-col gap-2  `} ref={setNodeRef}>
                {items.map((item, index) => (
                  <Widget
                    key={item.user_id}
                    id={item.user_id}
                    index={index}
                    item={item}
                    items={items}
                    setItems={setItems}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </div>
        {/* <DragOverlay
          dropAnimation={{
            duration: 500,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {activeId ? renderActiveItem() : null}
        </DragOverlay> */}
      </DndContext>
    </div>
  );
};

export default DND1;
