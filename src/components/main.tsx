import React from "react";
import styled from "styled-components";
import { useCoinbaseResp } from "./CoinbaseProvider/hooks";
import {
  Box,
  Button,
  createTheme,
  FormControlLabel,
  Grid,
  IconButton,
  MuiThemeProvider,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Add,
  AddAlert,
  Alarm,
  AlarmOff,
  AlarmOn,
  CancelSharp,
} from "@mui/icons-material";
import { Close } from "@material-ui/icons";
import { Divider } from "semantic-ui-react";
import success from "./notifications/success.mp3";
import fail from "./notifications/fail.mp3";
import useSound from "use-sound";
import { BitcoinUSD } from "./CoinbaseProvider/context";

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

const vibratingAnimation = {
  "0%": { transform: "translateX(0)" },
  "20%": { transform: "translateX(-5px)" },
  "40%": { transform: "translateX(5px)" },
  "60%": { transform: "translateX(-5px)" },
  "80%": { transform: "translateX(5px)" },
  "100%": { transform: "translateX(0)" },
};

const Main: React.FC = () => {
  const { bitcoinPrice, userPrice, setUserPrice } = useCoinbaseResp();
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const successAudio = new Audio(success);
  const failAudio = new Audio(fail);

  React.useEffect(() => {
    setUserPrice(localStorage.getItem("currentUserPrice") as unknown as number);
  }, [userPrice]);
  const [playSound, setPlaySound] = React.useState(false);

  React.useEffect(() => {
    if (playSound) {
      if (userPrice && bitcoinPrice) {
        if (userPrice < bitcoinPrice?.rate_float) {
          successAudio.play();
          return;
        }
        failAudio.play();
      }
    }
  }, [userPrice, bitcoinPrice?.rate_float, playSound]);

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

  const difference =
    bitcoinPrice && userPrice ? bitcoinPrice.rate_float - userPrice : 0;

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        padding: "200px",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ width: "1000px" }}
      >
        <Grid item container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Logo>
              Casual<span>Crypto</span>
            </Logo>
            <Typography variant="h1" color="textSecondary">
              ${bitcoinPrice?.rate}
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginRight: "24px" }}
              >
                current BITCOIN price
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    aria-label="sound-check"
                    icon={<AlarmOff />}
                    color="primary"
                    checkedIcon={<AlarmOn />}
                    size="medium"
                    onClick={() => {
                      setPlaySound((prev) => !prev);
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ fontSize: "12px" }}
                  >
                    Sound notification
                  </Typography>
                }
              />
            </Box>
          </Grid>
          <Grid item>
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
                      <AddAlert color="info" style={{ marginRight: "8px" }} />
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
                placement="top-end"
                enterDelay={1}
                leaveDelay={1}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setDialogOpen((prev) => !prev);
                  }}
                  style={{
                    outline: "none",
                  }}
                  startIcon={
                    <Add
                      fontSize="large"
                      color={difference > 0 ? "success" : "error"}
                    />
                  }
                >
                  {!dialogOpen
                    ? "Update average buy-in"
                    : "Hide average buy-in"}
                </Button>
              </Tooltip>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        {dialogOpen && (
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "24px" }}
          >
            <Grid container item justifyContent="space-between">
              <Grid
                container
                item
                justifyContent="space-between"
                style={{ marginBottom: "12px" }}
              >
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
                    color={difference > 0 ? "primary" : "error"}
                  >
                    <strong>
                      {`Net return: $${(
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
                  Track the value of your Bitcoin investments effortlessly with
                  our BTC stock value tracker. Input your average buy-in price
                  and stay updated on the real-time market value of your
                  holdings. Whether you're a seasoned investor or just starting
                  out, our user-friendly interface makes it easy to monitor your
                  BTC portfolio's performance and make informed decisions. Keep
                  tabs on fluctuations in the cryptocurrency market and seize
                  opportunities to optimize your investment strategy. Start
                  tracking your Bitcoin journey today and take control of your
                  financial future.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Main;
