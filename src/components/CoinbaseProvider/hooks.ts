import React from "react";
import CoinbaseContext, { Context } from "./context";

export const useCoinbaseResp = (): Context => React.useContext(CoinbaseContext);
