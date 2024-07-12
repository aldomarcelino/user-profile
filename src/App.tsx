import React from "react";
import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "components/template";
import theme from "styles/theme";
import Dashboard from "./pages/dashboard";
import { store } from "./store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Dashboard />
        </Layout>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
