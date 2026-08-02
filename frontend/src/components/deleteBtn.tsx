import { Trash2 } from "lucide-react";
import { useAppDispatch } from "../hooks/hooks";
import { removeTask } from "../redux/slice/operations/taskOperation";
import { toast } from "react-toastify";

export const DeleteBtn: React.FC<{ taskId: string }> = ({ taskId }) => {
  
  const dispatch = useAppDispatch();
  
    const handleDelete = async () => {
    const result = await dispatch(removeTask(taskId));
    
    if(!result) {
        throw new Error("Failed to delete task");
    }
    toast.success("Task deleted successfully");
  }
    return (
    <button
      type="button"
      className="absolute top-3 right-3 rounded-md p-2 text-gray-500 transition-colors duration-200 hover:bg-red-100 hover:text-red-600"
      aria-label="Delete product"
      onClick={handleDelete}
    >
      <Trash2 size={18} />
    </button>
  );
};
