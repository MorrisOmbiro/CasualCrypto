import React from "react";

export type BitcoinUSD = {
  code: "USD";
  rate: string;
  description: "United States Dollar";
  rate_float: number;
};

export interface Context {
  bitcoinPrice?: BitcoinUSD;
  userPrice?: number;
  setUserPrice: (a: number) => void;
}

const CoinbaseContext = React.createContext<Context>({
  bitcoinPrice: undefined,
  userPrice: undefined,
  setUserPrice: () => null,
});

export default CoinbaseContext;
