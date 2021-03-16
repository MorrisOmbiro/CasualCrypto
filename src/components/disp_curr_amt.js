
import styled from "styled-components";
import {useContext} from 'react';
import CurrentValue from "./current_value_context";

const Value = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #E18174;
  font-family: 'Helvetica';
  font-weight: bold;
`;

const Comparison = () => {
    const currAmt = useContext(CurrentValue);
    return(
        <Value>${currAmt}</Value>
    )
}

export default Comparison