"use client";

import { signOut } from "@/lib/actions/signout.action";
import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Logout from "./svg/Logout";

const UserMenuItems = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const lightOrDark = currentTheme !== "dark" ? "Dark mode" : "Light mode";
  const lightOrDarkIcon =
    currentTheme !== "dark" ? <Moon size={18} /> : <SunDim size={18} />;

  const userMenuItems = [
    {
      icon: lightOrDarkIcon,
      text: lightOrDark,
      onclick: () => setTheme(currentTheme === "dark" ? "light" : "dark"),
    },
    {
      icon: <Logout />,
      text: "Log out",
      onclick: signOut,
    },
  ];
  return userMenuItems.map((item) => (
    <div
      key={item.text}
      onClick={item.onclick}
      className="h-10 p-2 hover:bg-muted w-full cursor-pointer text-sm text-foreground flex gap-2 items-center rounded hover:text-blue-600 font-normal"
    >
      {item.icon} {item.text}
    </div>
  ));
};
export default UserMenuItems;
