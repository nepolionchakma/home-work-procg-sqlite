import React, { useEffect, useState } from "react";
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
import { arrayMove } from "@dnd-kit/sortable";
import DraggableList from "./DraggableList";
import DroppableList, { DroppableItem } from "./DroppableList";
import { IMergeUsersData, useSqliteAuthContext } from "@/Context/SqliteContext";
import { Info, Plus, SaveAll } from "lucide-react";
import axios from "axios";

const id = Math.floor(Math.random() * 1000 + 1);
const initialLeft: IMergeUsersData[] = [
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
];
// const initialRight: User[] = [
//   { user_id: 1, user_name: "b" },
//   { user_id: 2, user_name: "c" },
//   { user_id: 3, user_name: "d" },
//   { user_id: 4, user_name: "e" },
// ];

const App: React.FC = () => {
  const { user_data, users_data, toastify, formatDate } =
    useSqliteAuthContext();
  // console.log(users_data);
  const users = [...users_data];
  const now = new Date();
  const [leftItems, setLeftItems] = useState<IMergeUsersData[]>(initialLeft);
  const [rightItems, setRightItems] = useState<IMergeUsersData[]>(users);
  const [activeId, setActiveId] = useState<number | null>(null);
  console.log(user_data);
  if (leftItems.length === 0) {
    const newId = Math.floor(Math.random() * 1000 + 1);
    const newItem = {
      user_id: newId,
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
    };
    setLeftItems((prev) => [...prev, newItem]);
  }

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
  const findEmptyInput = rightItems.filter(
    (user) =>
      user.first_name === "" ||
      user.last_name === "" ||
      user.email_addresses === "" ||
      user.job_title === "" ||
      user.user_name === "" ||
      user.user_type === "" ||
      user.tenant_id === Number()
  );
  //Save all data
  const handleSaveAll = async () => {
    const id = user_data?.user_id;

    // Ensure that `rightItems` contains valid data.
    if (!rightItems || !Array.isArray(rightItems)) {
      console.error("Invalid data in rightItems.");
      return;
    }

    // Prepare data for `def-users` and `def-persons` endpoints.
    const updateDefUsers = rightItems.map((user) => ({
      user_id: user.user_id,
      user_name: user.user_name,
      user_type: user.user_type,
      tenant_id: user.tenant_id,
      email_addresses: user.email_addresses,
      created_by: id,
      created_on: formatDate(now),
      last_update_by: id,
      last_updated_on: formatDate(now),
    }));

    const updateDefPersons = rightItems.map((user) => ({
      user_id: user.user_id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      job_title: user.job_title,
    }));

    console.log(typeof updateDefUsers);
    console.log(typeof updateDefPersons);
    console.log(typeof user_data);

    console.log("Def Users Data:", updateDefUsers);
    console.log("Def Persons Data:", updateDefPersons);
    console.log("User Data:", user_data);

    try {
      // Perform API requests in parallel
      const [defUsers, defPersons] = await Promise.all([
        axios
          .post(
            "http://localhost:3000/def-users/upsert",
            { users: updateDefUsers }
            // { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        axios
          .post(
            "http://localhost:3000/def-persons/upsert",
            { persons: updateDefPersons }
            // { headers: { "Content-Type": "application/json" } }
          )
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        ,
      ]);
      toastify("success", "Successfully saved");
    } catch (error) {
      // Handle error and log relevant information
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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

    if (findEmptyInput.length === 0) {
      if (activeContainer === "left" && overContainer === "right") {
        // Move item from leftEmptyWidget to users
        setRightItems((prev) => {
          const updatedRight = [...prev];
          const [movedItem] = leftItems.splice(activeIndexInLeft, 1);
          updatedRight.splice(newIndex, 0, movedItem);

          return updatedRight;
        });
      }
    } else toastify("warning", "Please field all fill");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over) {
      const activeItemId = active.id;
      const overItemId = over.id;

      // Handling dragging from left to right
      // if (active.data.current?.sortable?.containerId === "left") {
      //   const draggedItem = leftItems.find(
      //     (item) => item.user_id === activeItemId
      //   );

      //   // if (draggedItem) {
      //   //   // Add the dragged item to the right side
      //   //   setRightItems((prev) => [...prev, draggedItem]);

      //   //   // Remove the dragged item from the left side
      //   //   setLeftItems((prev) =>
      //   //     prev.filter((item) => item.user_id !== activeItemId)
      //   //   );
      //   // }
      // }

      // // Handling reordering within right side
      // else
      if (active.data.current?.sortable?.containerId === "right") {
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
      autoScroll
    >
      <div className="flex gap-1">
        <div className="w-1/2">
          <DraggableList id="left" items={leftItems} />
        </div>
        <div className="w-1/2">
          <div className="flex gap-2 sticky top-16 px-4">
            <Plus className="cursor-pointer hover:text-sky-700 duration-500" />
            <SaveAll
              onClick={handleSaveAll}
              className="cursor-pointer hover:text-green-700 duration-500"
            />
            <Info className="cursor-pointer hover:text-orange-700 duration-500" />
          </div>
          <DroppableList
            id="right"
            items={rightItems}
            setItems={setRightItems}
          />
        </div>
      </div>
      <DragOverlay>
        {activeItem ? (
          <DroppableItem
            item={activeItem}
            id={String(activeItem.user_id)}
            items={leftItems.includes(activeItem) ? leftItems : rightItems}
            setItems={
              leftItems.includes(activeItem) ? setLeftItems : setRightItems
            }
            index={0}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
// Generate a new item and add it to the left side
// const newId = Math.floor(Math.random() * 1000 + 1);
// const newItem = {
//   user_id: newId,
//   user_name: String(newId),
//   first_name: "",
//   middle_name: "",
//   last_name: "",
//   job_title: "",
//   user_type: "",
//   tenant_id: 1,
//   email_addresses: "",
//   created_by: "",
//   created_on: "",
//   last_update_by: "",
//   last_update_on: "",
// };
// setLeftItems((prev) => [...prev, newItem]);
