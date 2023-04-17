import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthContext";

 
const queryClient = new QueryClient();

ReactDOM.render(
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            {/* <Route path={`/rtl`} component={RTLLayout} /> */}
            <Redirect from='/' to='/auth/sign-in' />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>
  </QueryClientProvider>
  </AuthProvider>,
  document.getElementById("root")
);
