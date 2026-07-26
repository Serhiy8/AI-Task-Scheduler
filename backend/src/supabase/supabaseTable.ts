import supabase from "./supabaseCreate";

export const getTasks = async () => {
  const { data, error } = await supabase.from("todolist").select();
  if (error) {
    return error;
  }
  return data;
};
