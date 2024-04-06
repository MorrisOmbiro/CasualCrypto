import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import AmountDisplay from "./left_display";
import CurrentValue from "./current_value_context";
import MainScreen from "./mainscreen";

const useRefresh = (callback: () => void, delay: number) => {
  const savedCallBack = useRef();

  // remember the latest callback
  useEffect(() => {
    savedCallBack.current = callback as any;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      savedCallBack?.current;
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const Main: React.FC = () => {
  const [data, setData] = useState([]);
  useRefresh(() => {
    axios
      .get("/api/coinbase")
      .then((res) => setData(res.data.bpi.USD.rate))
      .catch((err) => console.log("error: ", err));
  }, 1000);
  var str = JSON.stringify(data);
  var currPrice = JSON.parse(str);

  return (
    <CurrentValue.Provider value={currPrice}>
      <MainScreen />
      <AmountDisplay />
    </CurrentValue.Provider>
  );
};

export default Main;
