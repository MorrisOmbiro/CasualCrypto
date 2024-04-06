import { Paper } from "@material-ui/core";
import React from "react";
import "./static/main.css";

const display = {
  marginTop: "50px",
  alignItems: "left",
  justifyContent: "left",
  width: "100%",
};

interface Props {
  amount: number;
}

const DisplayData: React.FC<Props> = ({ amount }) => {
  return (
    <div style={display} className="focus">
      <Paper
        className="focus"
        elevation={2}
        style={{
          padding: "30px",
          background: "#DF645F",
          borderRadius: "20px",
          textAlign: "center",
          opacity: "0.8",
        }}
      >
        <h1 style={{ color: "white" }}>Your Average: ${amount}</h1>
      </Paper>
    </div>
  );
};

export default DisplayData;
