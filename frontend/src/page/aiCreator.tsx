import { AiInput } from "../components/ai/aiInput";
import AIMessage from "../components/ai/AiMessage";

export const AiCreator = () => {
  return (
    <div className="flex justify-center pt-6">
      <AIMessage />
      <AiInput />
    </div>
  );
};
