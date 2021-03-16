import { Paper } from "@material-ui/core";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import happy_crypto from "./images/happy_crypto.PNG";
import "./static/main.css";

const wrapperRight = {
  marginTop: "40px",
  alignItems: "right",
  justifyContent: "right",
  marginLeft: "auto",
  width: "50%",
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
`;

const ImageInfo = () => {
  return (
    <div className="focus" style={wrapperRight}>
      <Paper elevation={2} style={{borderRadius:"20px"}}>
        <Wrapper>
          <Image fluid rounded alt="Happy Crypto" src={happy_crypto} />
        </Wrapper>
      </Paper>
    </div>
  );
};

export default ImageInfo;
