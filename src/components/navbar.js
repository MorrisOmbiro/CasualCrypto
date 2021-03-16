import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 1.2em;
  text-align: center;
  color: #fbeded;
  font-family: "Helvetica";
  font-weight: bold;
  letter-spacing: 5px;
  span {
    color: #3978d3;
  }
`;

const MainLogo = () => {
  return (
    <Logo>
      Casual<span>Crypto</span>
    </Logo>
  );
};

const MainNavbar = () => {
  return (
    <Container maxWidth="lg">
      <div>
        <Navbar>
          <Navbar.Brand href="#home" style={{ paddingLeft: 30 }}>
            <MainLogo />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              style={{ paddingRight: 30, fontSize: "25px", color: "#FBEDED", fontWeight: "bold" }}
            >
              about
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Container>
  );
};

export default MainNavbar;
