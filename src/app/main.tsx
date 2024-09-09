// Container.tsx
"use client";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Colors } from "@/theme";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const Main = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 40 } }, // 10 seconds
  });

  useEffect(() => {
    const root = document.documentElement;

    const colors = Colors[theme];

    root.style.setProperty("--primary-color", colors.primary);
    root.style.setProperty("--primary_weak-color", colors.primary_weak);
    root.style.setProperty("--primary_strong-color", colors.primary_strong);
    root.style.setProperty("--secondary-color", colors.secondary);
    root.style.setProperty("--secondary_weak-color", colors.secondary_weak);
    root.style.setProperty("--secondary_strong-color", colors.secondary_strong);
    root.style.setProperty("--text-color", colors.text);
    root.style.setProperty("--active-color", colors.active);
    root.style.setProperty("--success-color", colors.success);
    root.style.setProperty("--warnning-color", colors.warnning);
    root.style.setProperty("--danger-color", colors.danger);
  }, [theme]);

  return <>
  <QueryClientProvider client={queryClient}>
  {children}
  </QueryClientProvider>
  </>;
};

export default Main;
