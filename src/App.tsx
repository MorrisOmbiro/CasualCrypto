import React from "react";
import Main from "./components/main";
import CoinbaseProvider from "./components/CoinbaseProvider";
import { Grid } from "@material-ui/core";

const App: React.FC = () => (
  <CoinbaseProvider>
    <Main />
  </CoinbaseProvider>
);

export default App;
