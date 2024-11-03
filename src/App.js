import React, { Suspense } from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

// ** Router Import
import Router from "./router/Router";

const App = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
       refetchIntervalInBackground: true
      }
    }
  })

  return (
    <QueryClientProvider client={client}>
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
