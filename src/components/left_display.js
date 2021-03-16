import DataInput from "./data_input";
import DataDisplay from "./display_average";
import { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import ImageInfo from "./right_display";
import { useContext } from "react";
import CurrentValue from "./current_value_context";
import useSound from "use-sound";
import success from "./notifications/success.mp3";
import fail from "./notifications/fail.mp3";

const mainDiv = {
  display: "flex",
  flexFlow: "row",
  flexWrap: "wrap",
};

const wrapperLeft = {
  marginTop: "40px",
  alignItems: "left",
  justifyContent: "left",
  maxWidth: "45%",
};

const AmountDisplay = () => {
  const [amount, setAmount] = useState(0);
  const currAmt = useContext(CurrentValue);
  const [playSuccess] = useSound(success);
  const [playFail] = useSound(fail);

  useEffect(() => {
    const numberAmount = Number(localStorage.getItem("amount") || 0);
    setAmount(numberAmount);
  }, []);

  useEffect(() => {
    localStorage.setItem("amount", amount);
  }, [amount]);

  useEffect(() => {
    if (parseInt(currAmt.toString().replace(",", "")) > parseInt(amount)) {
      return playSuccess;
    }
    return playFail;
  }, [currAmt]);

  return (
    <div>
      <div style={mainDiv}>
        <Container maxWidth="lg">
          <div id="about" style={mainDiv}>
            <div style={wrapperLeft}>
              <DataInput setAmount={setAmount} />
              <DataDisplay amount={amount} />
            </div>
            <ImageInfo />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AmountDisplay;
