import { AiInput } from "../components/ai/aiInput";
import AIMessage from "../components/ai/AiMessage";

export const AiCreator = () => {
  
  return (
    <div className="flex justify-center py-6 px-3.5">
      <AIMessage />
      <AiInput />
    </div>
  );
};
