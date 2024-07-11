import React from "react";
import { ThemeProvider } from "@mui/material";
import Layout from "components/template";
import theme from "styles/theme";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
