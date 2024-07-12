import React from "react";
import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "components/template";
import theme from "styles/theme";
import Dashboard from "./pages/dashboard";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Dashboard />
          <ToastContainer />
        </Layout>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
