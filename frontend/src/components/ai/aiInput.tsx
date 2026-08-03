import { useState, useRef, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createAiMessage } from "../../redux/slice/operations/aiOperations";
import { toast } from "react-toastify";

export const AiInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const isHidden = useAppSelector(state => state.aiMessages.isHidden);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [value]);

  const handleSubmit = async () => {
      const message = {
        text: value,
      };
      if(value.trim() === "") {
        toast.warning("Request can't be empty.");
        return;
      }
      await dispatch(createAiMessage(message));
    };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-3xl border border-gray-700/50 p-2">
        <textarea
          id="message"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          rows={1}
          placeholder="Message..."
          className="
        flex-1
        resize-none
        overflow-y-auto
        bg-transparent
        px-3
        py-2
        outline-none
      "
        />

        <button
          className="
        h-10
        w-10
        rounded-full
        bg-black
        text-white
      "
      disabled={isHidden}
          onClick={handleSubmit}          
        >
          ↑
        </button>
      </div>
    </div>
  );
};
