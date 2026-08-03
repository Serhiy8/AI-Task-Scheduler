import { AiInput } from "../components/aiInput";
import AIMessage from "../components/AiMessage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { createAiMessage } from "../redux/slice/operations/aiOperations";

export const AiCreator = () => {
    const dispatch = useAppDispatch();
    const AiMessage = useAppSelector(state => state.aiMessages.messages)
    console.log(AiMessage)
  const handleSubmit = async (text: string) => {
    const message = {
      text,
    };
      await dispatch(createAiMessage(message));
      
  };
  return (
      <div className="flex justify-center py-6 px-3.5">
        <AIMessage data={AiMessage}/>
      <AiInput onSubmit={handleSubmit} />
    </div>
  );
};
