import axios from "axios";
import { useState, useEffect, useRef } from "react";
import AmountDisplay from "./left_display"
import CurrentValue from "./current_value_context"; 
import MainScreen from "./mainscreen"

const useRefresh = (callback, delay) => {
  const savedCallBack = useRef();

  // remember the latest callback
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      savedCallBack.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const Main = () => {
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
        <MainScreen/>
        <AmountDisplay />
    </CurrentValue.Provider>
  );
};

export default Main; 