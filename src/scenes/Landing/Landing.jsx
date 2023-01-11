import React, { useState } from "react";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Landing = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [button, setButton] = useState("SignUp");
  return (
    <>
      <Box sx={{ height: "5vh" }}></Box>
      <Box
        sx={{ justifyContent: "center", alignItems: "center" }}
        display="flex"
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          size="large"
        >
          <Button
            style={{
              color: colors.primary[100],
              border: `1px solid ${colors.primary[100]}`,
            }}
            onClick={() => setButton("SignUp")}
          >
            Sign Up
          </Button>
          <Button
            style={{
              color: colors.primary[100],
              border: `1px solid ${colors.primary[100]}`,
            }}
            onClick={() => setButton("Login")}
          >
            Login
          </Button>
          <Button
            style={{
              color: colors.primary[100],
              border: `1px solid ${colors.primary[100]}`,
            }}
          >
            Google Auth
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          //   height: "40vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        display="flex"
      >
        {button === "Login" && (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "250px" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "20px",
            }}
            noValidate
            autoComplete="off"
            display="flex"
          >
            <TextField
              required
              id="outlined-password-input"
              label="Email"
              autoComplete="current-password"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              style={{
                color: colors.primary[100],
                border: `1px solid ${colors.primary[100]}`,
              }}
            >
              Login
            </Button>
          </Box>
        )}
        {button === "SignUp" && (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "250px" },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "20px",
            }}
            noValidate
            autoComplete="off"
            display="flex"
          >
            <TextField
              required
              id="outlined-password-input"
              label="Name"
              autoComplete="current-password"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Email"
              autoComplete="current-password"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              style={{
                color: colors.primary[100],
                border: `1px solid ${colors.primary[100]}`,
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Landing;
