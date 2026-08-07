import supabase from "./supabaseCreate";
import { Task } from "../models/users";
import { error } from "console";

interface NewTask {
  user_id: string;
  title: string;
  description: string;
  status: boolean;
}

interface UpdateValue {
  task_id: string;
  title?: string;
  description?: string;
  status?: boolean;
}

export const getTasksSB = async (id: string) => {
  const { data, error } = await supabase
    .from("todolist")
    .select("*")
    .eq("user_id", id);
  if (error) {
    return error;
  }
  return data;
};

export const getTasksByIdSB = async (id: string) => {
  const { data, error } = await supabase
    .from("todolist")
    .select()
    .eq("task_id", id);
  if (error) {
    return error;
  }
  return data;
};

export const updateTaskSB = async (updateValue: UpdateValue) => {
  const { data, error } = await supabase
    .from("todolist")
    .update(updateValue)
    .eq("task_id", updateValue.task_id)
    .select()
    .single();
  if (error) {
    throw error;
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

export const removeTaskSB = async (
  id: string,
): Promise<{ success: boolean; error?: any }> => {
  const result = await supabase.from("todolist").delete().eq("task_id", id);
  return result;
};
