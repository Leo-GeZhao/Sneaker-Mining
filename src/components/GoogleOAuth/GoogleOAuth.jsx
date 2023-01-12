import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import jwt_decode from "jwt-decode";
import { googleSignIn } from "../../utilities/service/user";

const GoogleOAuth = ({ setUser }) => {
  const navigate = useNavigate();

  async function handleCallBackRes(res) {
    const userObj = jwt_decode(res.credential);
    const { name, email } = userObj;
    const data = { name, email };
    const user = await googleSignIn(data);
    setUser(user);
    navigate("/dashboard");
  }
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallBackRes,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  });

  return (
    <Box
      id="signInDiv"
      className="mt-2"
      //   onClick={() => setShowGoogleSignIn(false)}
    ></Box>
  );
};

export default GoogleOAuth;
