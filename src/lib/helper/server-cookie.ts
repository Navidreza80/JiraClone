"use server";
import { cookies } from "next/headers";

// Function for saving and setting cookies
export const setServerCookie = async (cookieName: string, value: string) => {
  await (
    await cookies()
  ).set(cookieName, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

// Function for reading and getting cookies
export const getServerCookie = async (cookieName: string): Promise<string | null> => {
  const cookieValue = (await cookies()).get(cookieName);
  return cookieValue ? cookieValue.value : null;
};

// Function for deleting cookies
export const deleteServerCookie = async (cookieName: string) => {
  await (await cookies()).delete(cookieName);
};

// Function for review and Availability of cookies
export const hasServerCookie = async (cookieName: string): Promise<boolean> => {
  const hasCookie = (await cookies()).has(cookieName);
  return hasCookie;
};
