import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { login } from "../../utilities/service/user";

const Login = ({ colors, setUser }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(credentials);
    console.log(user);
    setUser(user);
  };
  return (
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
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="outlined"
        label="Email"
        value={credentials.email}
        name="email"
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined"
        label="Password"
        value={credentials.password}
        name="password"
        type="password"
        onChange={handleChange}
        autoComplete="current-password"
      />
      <Button
        style={{
          color: colors.primary[100],
          border: `1px solid ${colors.primary[100]}`,
        }}
        type="submit"
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
