import React, { useState } from "react";
import { Plus } from "lucide-react";
import { CreateTaskModal } from "./createTaskModal";

const AddTaskBtn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="
        fixed bottom-6 right-6
        flex h-14 w-14 items-center justify-center
        rounded-full
     bg-blue-600 text-white
        shadow-lg
        transition hover:scale-110 hover:bg-blue-700
        z-1
    "
        onClick={() => setIsOpen(true)}
      >
        <Plus size={28} />
      </button>
      {isOpen && <CreateTaskModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default AddTaskBtn;
