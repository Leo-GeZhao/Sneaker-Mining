import React from "react";

import { Button } from "@mui/material";

const Logout = ({ colors, handleLogout }) => {
  return (
    <Button
      style={{
        color: colors.primary[100],
        border: `1px solid ${colors.primary[100]}`,
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
