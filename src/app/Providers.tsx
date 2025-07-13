"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api, trpcClient } from "@/trpc/react";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        // Defensive: only check .data if it exists
        const err = error as any;
        if (
          err?.data?.code === "BAD_REQUEST" ||
          err?.data?.code === "UNAUTHORIZED"
        ) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
      </api.Provider>
    </QueryClientProvider>
  );
}
