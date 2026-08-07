import { Pencil } from "lucide-react";
import { useState, type FC } from "react";
import { type Task } from "../../redux/slice/operations/taskOperation";
import { UpdateTask } from "./updateTask";

interface PencilBtnProps {
  task: Task;
}

export const PencilBtn: FC<PencilBtnProps> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex text-gray-600 items-end"
        onClick={() => setIsOpen(true)}
      >
        <Pencil size={18} />
      </button>
      {isOpen && <UpdateTask task={task} onClose={() => setIsOpen(false)} />}
    </>
  );
};
