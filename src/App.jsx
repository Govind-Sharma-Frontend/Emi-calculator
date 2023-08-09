import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import EmiCalculater from "./Component/EmiCalculater";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EmiCalculater />
      {/* <ResponsiveAppBar /> */}
    </QueryClientProvider>
  );
}

export default App;
