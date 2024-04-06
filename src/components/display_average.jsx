import { Paper } from "@material-ui/core";
import React from "react";
import "./static/main.css";

const display = {
  marginTop: "50px",
  alignItems: "left",
  justifyContent: "left",
  width: "100%"
};

const paper_display = {
  padding: "30px",
  background: "#DF645F",
  borderRadius: "20px",
  textAlign: "center",
  opacity: "0.8",
};

const DisplayData = ({ amount }) => {
  return (
    <div style={display} className="focus">
        <Paper className="focus" elevation={2} style={paper_display}>
          <h1 style={{ color: "white" }}>Your Average: ${amount}</h1>
        </Paper>
    </div>
  );
};

export default DisplayData;
