import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { signUp } from "../../utilities/service/user";

const defaultState = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

const SignUp = ({ colors, setUser }) => {
  const [formData, setFormData] = useState(defaultState);
  const { name, email, password, confirm } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, email } = formData;
    const data = { name, password, email };
    const user = await signUp(data);
    setUser(user);
  };

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  const disabled =
    password !== confirm || !name || !email || !password || !confirm;
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
        label="Name"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined"
        label="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined"
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined"
        label="Confirm Password"
        name="confirm"
        type="password"
        value={confirm}
        onChange={handleChange}
      />
      <Button
        style={{
          color: colors.primary[100],
          border: `1px solid ${colors.primary[100]}`,
        }}
        disabled={disabled}
        type="submit"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
