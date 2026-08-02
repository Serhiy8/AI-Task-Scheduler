import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTasks } from "../redux/slice/operations/taskOperation";
import { token } from "../api/api";
import { DeleteBtn } from "./deleteBtn";

export const TaskItems = () => {
  const dispatch = useAppDispatch();
  const tokenFromState = useAppSelector((state) => state.auth.token);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  useEffect(() => {
    try {
      if (!tokenFromState) {
        console.log("No token available");
        return;
      }
      token.set(tokenFromState);
      dispatch(getTasks());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, tokenFromState]);

  return (
  <div className="mx-auto w-full max-w-7xl px-4 py-6">
    
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {tasks.map((task) => (
      <li
        key={task.task_id}
        className="flex min-h-55 flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <DeleteBtn taskId={task.task_id ?? ""} />
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          {task.title}
        </h2>

        <p className="mb-6 flex-1 line-clamp-3 text-sm leading-6 text-gray-600">
          {task.description}
        </p>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
            task.status
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status ? "Completed" : "Pending"}
        </span>
      </li>
    ))}
  </ul>
</div>
);
};

export default TaskItems;
