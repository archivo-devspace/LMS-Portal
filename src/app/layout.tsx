import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Main from "./main";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "LMS",
  description: "Learning Managment System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={`theme`}>

        <ThemeProvider>

          <Main>{children}</Main>

        </ThemeProvider>

      </body>
    </html>
  );
}
