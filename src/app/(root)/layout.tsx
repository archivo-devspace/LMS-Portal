"use client";
import React from "react";
import Main from "./main";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
