import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InstaCashPage } from "./modules/instacash";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <InstaCashPage />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
