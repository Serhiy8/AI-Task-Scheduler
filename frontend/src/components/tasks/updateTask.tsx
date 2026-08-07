import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import {
  updateTaskById,
  type Task,
} from "../../redux/slice/operations/taskOperation";
import { toast } from "react-toastify";
import { AiMessagePriority } from "../../redux/slice/aiSlice";

interface UpdateTaskProps {
  onClose: () => void;
  task: Task;
}

export const UpdateTask = ({ task, onClose }: UpdateTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      toast.error("Please fill in all fields");
      return;
    }
    const updateTask = {
      task_id: task.task_id,
      title,
      description,
      priority: AiMessagePriority.Low,
    };
    try {
      await dispatch(updateTaskById(updateTask));
      toast.success("The task has been successfully updated.");
    } catch (error) {
      toast.error("Failed to update task");
      return error;
      }
      onClose()
  };

  return (
    <div
      className="
        fixed inset-0
        flex items-center justify-center
        bg-black/50
        p-4
         z-1
      "
    >
      <form
        className="
          w-full max-w-md
          rounded-xl
          bg-white
          p-6
          shadow-xl
        "
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-xl/9 text-gray-700 font-semibold">
          Update task
        </h2>

        <label
          htmlFor="title"
          className="block text-sm/6 font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          className="
            mb-3 w-full rounded-lg border
            px-4 py-2
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Create a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          htmlFor="description"
          className="block text-sm/6 font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          className="
            mb-4 w-full rounded-lg border h-50
            px-4 py-2
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Create a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor=""></label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              rounded-lg px-4 py-2
              text-gray-600
              hover:bg-gray-100
            "
            type="button"
          >
            Cancel
          </button>

          <button
            className="
              flex justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
            "
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
