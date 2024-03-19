import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MainRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainRoutes />
        <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
