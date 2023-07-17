import { ApolloProvider } from "@apollo/client";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  colors,
  createTheme,
  css,
} from "@mui/material";
import { createRoot } from "react-dom/client";

import { client } from "~src/graphql/client";
import { App } from "~src/modules/app";

const container = document.getElementById("app");
const root = createRoot(container!);

const preparedTheme = createTheme({
  palette: {
    mode: "dark",
    primary: colors.orange,
    secondary: colors.blue,
  },
  typography: {
    fontFamily: "Inter",
    fontSize: 16,
  },
});

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={preparedTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={css`
          body {
            font-family: "Inter", sans-serif;
          }
        `}
      />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
