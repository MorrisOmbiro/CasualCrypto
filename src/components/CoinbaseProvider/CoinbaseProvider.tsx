import React from "react";
import CoinbaseContext, { BitcoinUSD } from "./context";
import { getCoinbaseData } from "../../service/coinbase";

const CoinbaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bitcoinPrice, setCoinbaseResp] = React.useState<
    BitcoinUSD | undefined
  >();
  const [userPrice, setUserPrice] = React.useState<number | undefined>();

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const resp = await getCoinbaseData();
        setCoinbaseResp(resp.data.bpi.USD as BitcoinUSD);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    }, 1_000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <CoinbaseContext.Provider value={{ bitcoinPrice, userPrice, setUserPrice }}>
      {children}
    </CoinbaseContext.Provider>
  );
};

export default CoinbaseProvider;
