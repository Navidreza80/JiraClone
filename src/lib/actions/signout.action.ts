"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function signOut() {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    redirect("/authentication/login");
  } catch (err) {
    throw err;
  }
}
