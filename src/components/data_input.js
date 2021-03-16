import React from "react";
import { Paper, ThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import "./static/main.css";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E18274",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const SubTitle = styled.h1`
  margin-top: 20px;
  font-size: 1.8em;
  color: #3978d3;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`;

const DataInput = ({ setAmount }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="focus">
      <form onSubmit={handleSubmit} autoComplete="off">
        <Paper elevation={2} style={{ padding: "20px", borderRadius: "20px", background: "#FBEDED" }}>
          <SubTitle>Input your Avg. buying price for BTC</SubTitle>
          <div style={{ paddingTop: "40px" }}>
            <ThemeProvider theme={theme}>
              <TextField
                id="standard-basic"
                label="Amount"
                variant="standard"
                size="small"
                color="primary"
                onChange={(e) => setAmount(e.target.value)}
              />
            </ThemeProvider>
          </div>
        </Paper>
      </form>
    </div>
  );
};

export default DataInput;
