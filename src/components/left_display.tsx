import DataInput from "./data_input";
import DataDisplay from "./display_average";
import React from "react";
import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import ImageInfo from "./right_display";
import { useContext } from "react";
import CurrentValue from "./current_value_context";
import useSound from "use-sound";
import success from "./notifications/success.mp3";
import fail from "./notifications/fail.mp3";
import { Grid } from "@material-ui/core";

const wrapperLeft = {
  marginTop: "40px",
  alignItems: "left",
  justifyContent: "left",
  maxWidth: "45%",
};

const AmountDisplay: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const currAmt = useContext(CurrentValue);
  const [playSuccess] = useSound(success);
  const [playFail] = useSound(fail);

  useEffect(() => {
    const numberAmount = Number(localStorage.getItem("amount") || 0);
    setAmount(numberAmount);
  }, []);

  useEffect(() => {
    localStorage.setItem("amount", `${amount}`);
  }, [amount]);

  useEffect(() => {
    if (parseInt(currAmt.toString().replace(",", "")) > parseInt(`${amount}`)) {
      return playSuccess;
    }
    return playFail;
  }, [currAmt]);

  return (
    <Grid container direction="column">
      <Grid item>
        <DataInput setAmount={setAmount} />
      </Grid>
      <Grid item>
        <DataDisplay amount={amount} />
      </Grid>
    </Grid>
  );
};

export default AmountDisplay;
