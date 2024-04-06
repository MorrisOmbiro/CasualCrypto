import React from "react";
import styled from "styled-components";
import Comparison from "./disp_curr_amt";
import Container from "@material-ui/core/Container";
import Typewriter from "typewriter-effect";
import Paper from "@material-ui/core/Paper";
import "./static/main.css";

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: #3978d3;
  position: "relative";
  zindex: "-1";
`;

const SubTitle = styled.h1`
  font-size: 1.2em;
  text-align: center;
  color: gray;
  position: "relative";
  zindex: "-1";
`;
const btn = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "5vh",
};
const Rights = () => {
  return <div style={btn}>
  </div>;
};
const MainScreen: React.FC = () => {
  return (
    <div >
      <Container className="focus">
        <Paper elevation={3} style={{ background: "#FBEDED" }}>
          <Title style={{ paddingTop: "40px" }}>
            Track progress of your{" "}
            <span style={{ color: "black" }}>Bitcoin</span>
          </Title>
          <SubTitle>
            Get notified when the market exceeds your input
            <Typewriter
              options={{
                strings: [
                  "Safe Way to Crypto",
                  "Don't Miss Your Chance",
                  "Always Alert",
                  "BuyLowSellHigh Confidently",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </SubTitle>
          <Container maxWidth="md">
            <Comparison />
            <Rights />
          </Container>
        </Paper>
      </Container>
    </div>
  );
};

export default MainScreen;
