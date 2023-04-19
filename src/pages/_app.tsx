import "@App/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { startWorker } from "../mocks";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [resolved, setIsResolved] = useState(false);

  useEffect(() => {
    startWorker().then(() => {
      setIsResolved(true);
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {resolved ? <Component {...pageProps} /> : null}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
