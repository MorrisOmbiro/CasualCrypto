import styled from "styled-components";
import React from "react";
import { useContext } from "react";
import CurrentValue from "./current_value_context";

const Value = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #e18174;
  font-family: "Helvetica";
  font-weight: bold;
`;

const Comparison: React.FC = () => {
  const currAmt = useContext(CurrentValue);
  return <Value>${currAmt}</Value>;
};

export default Comparison;
