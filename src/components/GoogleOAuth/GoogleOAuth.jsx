import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

//jwt-decode package
import jwt_decode from "jwt-decode";

//Google OAuth Service
import { googleSignIn } from "../../utilities/service/user";

const GoogleOAuth = ({ setUser }) => {
  //Navigate to other Pages
  const navigate = useNavigate();

  //Handel Google OAuth Callback
  const handleCallBackRes = async (res) => {
    const userObj = jwt_decode(res.credential);
    const { name, email } = userObj;
    const data = { name, email };
    const user = await googleSignIn(data);
    setUser(user);
    navigate("/dashboard");
  };

  //Handle Google OAuth SignIn
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
  }, []);

  return <Box id="signInDiv" className="mt-2"></Box>;
};

export default GoogleOAuth;
