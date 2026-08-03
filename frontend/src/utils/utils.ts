import { useAppDispatch } from "../hooks/hooks"
import { setMessage } from "../redux/slice/aiSlice";


export const DefaultMessageAi = () => {
    const dispatch = useAppDispatch();
    const pureMessage = {
        title: "",
        description: "What's the plan for today?",
        priority: "",
    }
    dispatch(setMessage(pureMessage))
}