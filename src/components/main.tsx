import React from "react";
import styled from "styled-components";
import { useCoinbaseResp } from "./CoinbaseProvider/hooks";
import {
  Box,
  createTheme,
  Grid,
  IconButton,
  MuiThemeProvider,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Add, AddAlert, CancelSharp } from "@mui/icons-material";
import { Close } from "@material-ui/icons";
import { Divider } from "semantic-ui-react";
import success from "./notifications/success.mp3";
import fail from "./notifications/fail.mp3";
import useSound from "use-sound";

const Logo = styled.h1`
  font-size: 1.8em;
  color: #fbed00;
  font-family: "Helvetica";
  font-weight: bold;
  letter-spacing: 5px;
  span {
    color: #3978d3;
  }
`;

const LogoTiny = styled.h1`
  font-size: 10px;
  color: #fbed00;
  font-family: "Helvetica";
  font-weight: bold;
  letter-spacing: 5px;
  span {
    color: #3978d3;
  }
`;

const Main: React.FC = () => {
  const { bitcoinPrice, userPrice, setUserPrice } = useCoinbaseResp();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [play] = useSound(success);
  const [playFail] = useSound(fail);

  React.useEffect(() => {
    setUserPrice(localStorage.getItem("currentUserPrice") as unknown as number);
  }, [userPrice]);

  React.useEffect(() => {
    if (userPrice && bitcoinPrice) {
      console.log("ay");
      if (userPrice > bitcoinPrice.rate_float) {
        play();
      }
      playFail();
    }
  }, [userPrice, bitcoinPrice]);

  const theme = createTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "2em",
          color: "#fefefe",
          backgroundColor: "#333333",
        },
      },
    },
  });

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          position: "absolute",
          top: "50%",
          left: " 20%",
          marginTop: "-50px",
          marginLeft: "-50px",
          width: "700px",
          height: "100px",
        }}
      >
        {dialogOpen ? (
          <Grid container spacing={1}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Logo>
                  Casual<span>Crypto</span>
                </Logo>
              </Grid>
              <Grid item>
                <Typography variant="body2">${bitcoinPrice?.rate}</Typography>
                <Typography variant="body2" color="textSecondary">
                  BTC
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid container item justifyContent="space-between">
                  <TextField
                    id="standard-helperText"
                    label="Avg. BTC buy-in"
                    helperText="Enter as number; e.g: 69420"
                    variant="standard"
                    type="number"
                    value={
                      userPrice ??
                      (localStorage.getItem(
                        "currentUserPrice"
                      ) as unknown as number)
                    }
                    onChange={(e) => {
                      setUserPrice(e.target.value as unknown as number);
                      localStorage.setItem("currentUserPrice", e.target.value);
                    }}
                  />
                  {bitcoinPrice && userPrice && (
                    <Typography
                      variant="subtitle1"
                      color={
                        bitcoinPrice.rate_float - userPrice > 0
                          ? "primary"
                          : "error"
                      }
                    >
                      <strong>
                        {`$${(
                          bitcoinPrice.rate_float - userPrice
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                      </strong>
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    Track the value of your Bitcoin investments effortlessly
                    with our BTC stock value tracker. Input your average buy-in
                    price and stay updated on the real-time market value of your
                    holdings. Whether you're a seasoned investor or just
                    starting out, our user-friendly interface makes it easy to
                    monitor your BTC portfolio's performance and make informed
                    decisions. Keep tabs on fluctuations in the cryptocurrency
                    market and seize opportunities to optimize your investment
                    strategy. Start tracking your Bitcoin journey today and take
                    control of your financial future.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Logo>
                Casual<span>Crypto</span>
              </Logo>
              <Typography variant="h1" color="textSecondary">
                ${bitcoinPrice?.rate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                current BITCOIN price
              </Typography>
            </Grid>
          </Grid>
        )}
        <div style={{ marginLeft: "16px" }}>
          {dialogOpen ? (
            <Grid item>
              <IconButton
                onClick={() => {
                  setDialogOpen(false);
                }}
                style={{ outline: "none" }}
              >
                <CancelSharp fontSize="large" color="primary" />
              </IconButton>
            </Grid>
          ) : (
            <Grid item>
              <IconButton
                onClick={() => {
                  setDialogOpen(true);
                }}
                style={{
                  outline: "none",
                }}
              >
                <MuiThemeProvider theme={theme}>
                  <Tooltip
                    title={
                      <Box
                        style={{
                          margin: "8px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                          }}
                        >
                          <AddAlert
                            color="info"
                            style={{ marginRight: "8px" }}
                          />
                          <Typography variant="body2">
                            Modify your average buy-in price to start getting
                            notifications
                          </Typography>
                        </Box>
                        <Divider style={{ marginBottom: "8px" }} />
                        <LogoTiny>
                          Casual<span>Crypto</span>
                        </LogoTiny>
                      </Box>
                    }
                    placement="top-start"
                    open
                  >
                    <Add fontSize="large" color="primary" />
                  </Tooltip>
                </MuiThemeProvider>
              </IconButton>
            </Grid>
          )}
        </div>
      </Grid>
    </>
  );
};

export default Main;
