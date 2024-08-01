import { IMergeUsersData, useSqliteAuthContext } from "@/Context/SqliteContext";
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Container from "../Test/Container";
import User from "./User";

const DND = () => {
  const { getusers, users_data, toastify } = useSqliteAuthContext();
  const [users, setUsers] = useState<IMergeUsersData[]>(users_data);
  useEffect(() => {
    getusers();
  }, []);
  const id = Math.floor(Math.random() * 1000 + 1);
  const [leftEmptyWidget, setLeftEmptyWidget] = useState<IMergeUsersData[]>([
    {
      user_id: id,
      user_name: String(id),
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
  const findContainer = (id: string | number): string | undefined => {
    if (leftEmptyWidget.some((item) => item.user_id === id)) {
      return "left";
    }
    if (users.some((item) => item.user_id === id)) {
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
    if (!Array.isArray(leftEmptyWidget) || !Array.isArray(users)) {
      console.error("Expected leftEmptyWidget and users to be arrays");
      return;
    }

    const activeIndexInLeft = leftEmptyWidget.findIndex(
      (item) => item.user_id === activeItemId
    );
    const activeIndexInRight = users.findIndex(
      (item) => item.user_id === activeItemId
    );

    let newIndex = users.length; // Default new index at end

    if (overItemId) {
      // Determine new index for the item being moved
      const overIndexInRight = users.findIndex(
        (item) => item.user_id === overItemId
      );
      newIndex = overIndexInRight === -1 ? users.length : overIndexInRight;
    }

    if (activeContainer === "left" && overContainer === "right") {
      // Move item from leftEmptyWidget to users
      setUsers((prev) => {
        const updatedRight = [...prev];
        const [movedItem] = leftEmptyWidget.splice(activeIndexInLeft, 1);
        updatedRight.splice(newIndex, 0, movedItem);

        return updatedRight;
      });

      setLeftEmptyWidget([
        {
          user_id: id,
          user_name: String(id),
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
    } else if (activeContainer === "right" && overContainer === "left") {
      // Move item from users to leftEmptyWidget
      setUsers((prev) => {
        const updatedRight = [...prev];
        updatedRight.splice(activeIndexInRight, 1);
        return updatedRight;
      });

      setLeftEmptyWidget((prev) => {
        const updatedLeft = [...prev];
        updatedLeft.splice(newIndex, 0, users[activeIndexInRight]);
        return updatedLeft;
      });
    }
  };

  // Helper function to generate a unique ID (you can use any unique ID generator)
  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    if (active.id !== over.id) {
      const activeIndexInLeft = leftEmptyWidget.findIndex(
        (widget) => widget.user_id === active.id
      );
      const activeIndexInRight = users.findIndex(
        (widget) => widget.user_id === active.id
      );
      const overIndexInLeft = leftEmptyWidget.findIndex(
        (widget) => widget.user_id === over.id
      );
      const overIndexInRight = users.findIndex(
        (widget) => widget.user_id === over.id
      );

      setUsers((user) => {
        return arrayMove(user, activeIndexInRight, overIndexInRight);
      });

      if (activeIndexInLeft !== -1) {
        const newLeftWidgets = [...leftEmptyWidget];
        const movedItem = newLeftWidgets.splice(activeIndexInLeft, 1)[0];
        // movedItem.widget_state = false;

        if (overIndexInRight !== -1) {
          const newRightWidgets = [...users];
          newRightWidgets.splice(overIndexInRight, 0, movedItem); // Insert after the hovered item
          setUsers(newRightWidgets);
        } else if (overIndexInLeft !== -1) {
          newLeftWidgets.splice(overIndexInLeft, 0, movedItem);
        } else {
          const newRightWidgets = [...users, movedItem]; // Insert at the bottom if no specific position
          setUsers(leftEmptyWidget);
        }

        // setLeftEmptyWidget(newLeftWidgets);
        // if (newLeftWidgets.length === 0) {
        //   setLeftEmptyWidget([
        //     {
        //       user_id: id,
        //       user_name: "",
        //       first_name: "",
        //       middle_name: "",
        //       last_name: "",
        //       job_title: "",
        //       user_type: "",
        //       tenant_id: 1,
        //       email_addresses: "",
        //       created_by: "",
        //       created_on: "",
        //       last_update_by: "",
        //       last_update_on: "",
        //     },
        //   ]);
        // }
      }
    }
  };
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };
  const left = leftEmptyWidget.find((user) => user.user_id === activeId);
  const right = users.find((user) => user.user_id === activeId);
  const activeUser = left || right;
  return (
    <div className="flex ga-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        autoScroll
      >
        <Container id="root" users={leftEmptyWidget} setUsers={setUsers} />

        <Container id="root1" users={users} setUsers={setUsers} />

        <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>
          {activeUser ? (
            <div>
              <User
                id={activeUser.user_id}
                user={activeUser}
                users={users}
                setUsers={setUsers}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
export default DND;
