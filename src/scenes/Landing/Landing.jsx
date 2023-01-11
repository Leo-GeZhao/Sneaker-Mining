import React, { useState } from "react";
import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SignUp from "../../components/SignUp/SignUp";
import Login from "../../components/Login/Login";
import Logout from "../../components/Logout/Logout";
import { logout } from "../../utilities/service/user";

const Landing = ({ user, setUser }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [button, setButton] = useState("Login");

  function handleLogOut() {
    logout();
    setUser(null);
    // setShowGoogleSignIn(true);
  }

  return (
    <>
      <Box sx={{ height: "5vh" }}></Box>
      {!user && (
        <>
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
            {button === "Login" && <Login colors={colors} setUser={setUser} />}
            {button === "SignUp" && (
              <SignUp colors={colors} setUser={setUser} />
            )}
          </Box>
        </>
      )}
      <Box
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        display="flex"
      >
        {user && (
          <Logout
            colors={colors}
            handleLogout={handleLogOut}
            setUser={setUser}
          />
        )}
      </Box>
    </>
  );
};

export default Landing;
