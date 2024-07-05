import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CountryList from "./components/CountryList";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CountryList />
    </QueryClientProvider>
  );
}

export default App;
