import { useEffect, useState } from "react";
// import { useAppSelector } from "../hooks/hooks";

interface AIResponse {
  title: string;
  description: string;
  priority: string;
}

interface Props {
  data: AIResponse;
}

export default function AIMessage({ data }: Props) {
    const [text, setText] = useState("");
    
    // const selector = useAppSelector((state) => state.aiMessages.aiMessages);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText(data.description.slice(0, index));

      index++;

      if (index > data.description.length) {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [data.description]);

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
          <h3 className="font-semibold text-gray-900">{data.title}</h3>

          <span
            className={`
              rounded-full px-3 py-1 text-xs font-medium
              ${
                data.priority === "low"
                  ? "bg-green-100 text-green-700"
                  : data.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }
            `}
          >
            {data.priority}
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
      </div>
    </div>
  );
}
