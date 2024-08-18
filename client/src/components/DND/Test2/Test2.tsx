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
import { useToast } from "@/components/ui/use-toast";

const id = Math.floor(Math.random() * 100000 + 1);
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
    widget_position: Number(),
    widget_state: 1,
  },
];
const App: React.FC = () => {
  const { user_data, users_data, toastify, formatDate, getusers } =
    useSqliteAuthContext();

  const users = [...users_data];
  const now = new Date();
  const [leftItems, setLeftItems] = useState<IMergeUsersData[]>(initialLeft);
  const [rightItems, setRightItems] = useState<IMergeUsersData[]>(users);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [isChanged, setIsChanged] = useState<boolean>(false);
  const newId = Math.floor(Math.random() * 100000 + 1);
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
    widget_position: Number(),
    widget_state: 1,
  };
  if (leftItems.length === 0) {
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
    if (findEmptyInput.length === 0 && !isChanged)
      return toastify("warning", "Please fill in the empty input");

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
    const updateDefWidgetAttributes = rightItems.map((user, index) => ({
      user_id: user.user_id,
      widget_position: user.widget_position,
      widget_state: user.widget_state,
    }));
    try {
      // Perform API requests in parallel
      await Promise.all([
        axios
          .post("http://localhost:3000/def-users/upsert", {
            users: updateDefUsers,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        axios
          .post("http://localhost:3000/def-persons/upsert", {
            persons: updateDefPersons,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
        axios
          .post("http://localhost:3000/def-widget-attributes/upsert", {
            widgets: updateDefWidgetAttributes,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err)),
      ]);
      toastify("success", "Successfully saved");
      setIsChanged(false);
      getusers();
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
    } else toastify("warning", " Please fill in the empty input");
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
          setRightItems(
            arrayMove(rightItems, oldIndex, newIndex).map((user, index) => ({
              ...user,
              widget_position: index,
            }))
          );
        }
      }
    }
  };
  const handleAddClick = () => {
    if (findEmptyInput.length === 0) {
      setRightItems((prev) => [newItem, ...prev]);
    } else toastify("warning", "Please fill in the empty input");
  };

  useEffect(() => {
    if (!rightItems || !users_data || rightItems.length !== users_data.length) {
      // console.error("Initial check failed: ", { rightItems, users_data });
      return;
    }

    const hasChanges: boolean = rightItems.some((user, index) => {
      if (!user || !users_data[index]) {
        // console.error("Undefined at index:", index, user, users_data[index]);
        return false;
      }

      return Object.keys(user).some(
        (key) =>
          user[key as keyof IMergeUsersData] !==
          users_data[index][key as keyof IMergeUsersData]
      );
    });

    setIsChanged(hasChanges);
  }, [rightItems]);

  const { toast } = useToast();
  console.log(rightItems);
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
          <div className="flex gap-2 sticky top-[52px] x-4">
            {findEmptyInput.length === 0 ? (
              <Plus
                onClick={handleAddClick}
                className="cursor-pointer hover:text-sky-700 duration-500"
              />
            ) : (
              <Plus className="cursor-not-allowed opacity-20 hover:text-sky-700 duration-500" />
            )}
            {isChanged && findEmptyInput.length === 0 ? (
              <SaveAll
                onClick={handleSaveAll}
                className={`cursor-pointer hover:text-green-700 duration-500}`}
              />
            ) : (
              <SaveAll
                className={`cursor-not-allowed opacity-20 hover:text-green-700 duration-500}`}
              />
            )}

            <Info
              onClick={() => {
                toast({
                  variant: "destructive",
                  description: "This is Info test shadcn toast.",
                });
              }}
              className="cursor-pointer hover:text-orange-700 duration-500"
            />
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
