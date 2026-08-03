import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setIsHidden } from "../../redux/slice/aiSlice";
import { toast } from "react-toastify";
import { createTask } from "../../redux/slice/operations/taskOperation";
import { useNavigate } from "react-router-dom";
import { DefaultMessageAi } from "../../utils/utils";

export default function AIMessage() {
  const [text, setText] = useState("");

  const selector = useAppSelector((state) => state.aiMessages.messages);
  const isHidden = useAppSelector((state) => state.aiMessages.isHidden);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    let index = 0;
    
    dispatch(setIsHidden(true))
    const interval = setInterval(() => {
      setText(selector.description.slice(0, index));

      index++;

      if (index > selector.description.length) {
        clearInterval(interval);
        dispatch(setIsHidden(false))
      }
    }, 25);

    return () => clearInterval(interval);
  }, [selector.description, dispatch]);

  const onCreateHandle = async() => {
    const newTask = {
      title: selector.title,
      description: selector.description,
      priority: selector.priority,
    }
    if(newTask.description.trim() === "" || newTask.title.trim() === ""){
      toast.warning("Fields can't be empty.");
      return;
    }
    try {
      await dispatch(createTask(newTask));
      toast.success("Task created successfully");
      DefaultMessageAi()
      navigate("/tasks")
      
    } catch (error) {
      toast.error("Failed to create task");
      return error;
    }
  }

  return (
    <div className="flex gap-3 max-w-2xl w-full">
      {/* AI avatar */}
      <div
        className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-full bg-black text-white
      "
      >
        AI
      </div>

      <div
        className="
        rounded-2xl
        bg-gray-100
        px-5
        py-4
        shadow-sm
        w-full
        
      "
      >
        <div className="mb-2 flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">{selector.title}</h3>

          <span
            className={`
              rounded-full px-3 py-1 text-xs font-medium
              ${
                selector.priority === "low"
                  ? "bg-green-100 text-green-700"
                  : selector.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }
            `}
          >
            {selector.priority}
          </span>
        </div>

        <p
          className="
          text-sm
          leading-6
          text-gray-700
          whitespace-pre-wrap
          
        "
        >
          {text}
          <span className="animate-pulse">|</span>
        </p>
        {!isHidden && <div className="flex justify-end gap-3">
                    <button
            className="
              flex justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
            "
            type="button"
            onClick={onCreateHandle}
          >
            Create
          </button>
        </div>}
      </div>
    </div>
  );
}
