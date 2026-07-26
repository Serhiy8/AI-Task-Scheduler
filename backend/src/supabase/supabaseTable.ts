import supabase from "./supabaseCreate";
import { Task } from "../models/users";

interface NewTask {
  user_id: string;
  title: string;
  description: string;
  status: boolean;
}

export const getTasksSB = async () => {
  const { data, error } = await supabase.from("todolist").select();
  if (error) {
    return error;
  }
  return data;
};

export const addTaskSB = async (newTask: NewTask): Promise<Task> => {
  const { error, data } = await supabase
    .from("todolist")
    .insert(newTask)
    .select();

  if (error) {
    throw error;
  }

  if (!data?.length) {
    throw new Error("Failed to insert task");
  }

  return data[0];
};
