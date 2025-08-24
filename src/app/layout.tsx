import { ThemeProvider } from "@/components/provider/provider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jira",
  description: "Complete task management app!",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${manrope.className} antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
