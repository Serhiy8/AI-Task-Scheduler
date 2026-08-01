import supabase from "./supabaseCreate";
import { registerUser } from "../models/users";

// export const getTasks = async () => {
//   const { data, error } = await supabase.from("todolist").select();
//   if (error) {
//     return error;
//   }
//   return data;
// };

export const registerSB = async (newUser: registerUser) => {
  const res = await supabase
    .from("users")
    .insert(newUser)
    .select("*")
    .eq("email", newUser.email)
    .single();
  return res;
};

export const loginSB = async (email: string) => {
  return await supabase.from("users").select("*").eq("email", email).single();
};

export const getUserById = async (id: string) =>
  await supabase.from("users").select("*").eq("user_id", id).single();


export const removeUser = async (id: string) => {
  return await supabase.from("users")
    .delete()
    .eq("user_id", id);
}

// export const removeToken = async (id: string) => {
//   return await supabase.from("users")
//     .update({ token: "" })
//     .eq("user_id", id)
//     .select();
// }

