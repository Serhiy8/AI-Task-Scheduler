import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTaskById } from "../redux/slice/operations/taskOperation";
import { useEffect } from "react";
import { tokenHeader } from "../api/api";
import { PencilBtn } from "../components/tasks/pencilBtn";

export const Card = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.tasks.currentTask);
  const tokenFromState = useAppSelector((state) => state.auth.token);
  const date = task?.created_at
    ? new Date(task.created_at).toDateString().slice(4)
    : "";

  useEffect(() => {
    if (!tokenFromState) {
      return;
    }
    tokenHeader.set(tokenFromState);

    if (!id) return;
    dispatch(getTaskById(id));
  }, [dispatch, id, tokenFromState]);

  return (
    task && (
      <div
        className="
      group relative flex flex-col justify-between max-w-2xl min-h-[calc(100vh-64px)]
      rounded-b-2xl border border-gray-200 bg-white p-5
      shadow-sm transition-all duration-200 m-auto
      
    "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {task.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          {/* Priority badge */}
          <span
            className={`rounded-full px-3 py-1
          text-xs font-medium ${
            task.priority === "Low"
              ? "bg-green-100 text-green-700"
              : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between flex-1">
          {/* Status */}
          <div className="flex items-end gap-2 ">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

            <span className="text-sm text-gray-600">
              {task.status ? "Completed" : "pending"}
            </span>
          </div>

          {id ? <PencilBtn task={task} /> : null}
          {/* Date */}
          {date ? (
            <span className="flex items-end text-xs text-gray-400">{date}</span>
          ) : (
            <span className="flex items-end text-xs text-gray-400">
              --- -- ----
            </span>
          )}
        </div>
      </div>
    )
  );
};
