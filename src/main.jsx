import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { theme } from "./theme/index.js";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import InternetConnectionProvider from "./provider/InternetConnectionProvider.jsx";

// تهيئة QueryClient
const queryClient = new QueryClient();

// إنشاء جذر ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </InternetConnectionProvider>
    </Provider>
  </QueryClientProvider>
);
