import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTaskById } from "../redux/slice/operations/taskOperation";
import { useEffect } from "react";
import { token } from "../api/api";

export const Card = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.tasks.currentTask);
  const tokenFromState = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!tokenFromState) {
      return;
    }
    token.set(tokenFromState);

    if (!id) return;
    dispatch(getTaskById(id));
  }, [dispatch, id, tokenFromState]);

  return (
    task && (
      <div
        className="
      group relative flex flex-col justify-between
      rounded-b-2xl border border-gray-200 bg-white p-5
      shadow-sm transition-all duration-200
      
    "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {task.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500 line-clamp-3">
              {task.description}
            </p>
          </div>

          {/* Priority badge */}
          <span
            className="
          rounded-full bg-red-100 px-3 py-1
          text-xs font-medium text-red-600
        "
          >
            High
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

            <span className="text-sm text-gray-600">
              {task.status ? "Completed" : "pending"}
            </span>
          </div>

          {/* Date */}
          <span className="text-xs text-gray-400">Aug 03, 2026</span>
        </div>
      </div>
    )
  );
};
