import { useState } from "react";
import Header from "../../components/Header/Header";
import { Box, useTheme, TextField, Button } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";

const Add = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [url, setUrl] = useState("");
  const [sizeStr, setSizeStr] = useState([]);
  const [expenseStr, setExpenseStr] = useState(null);

  const handleSubmit = async (url, sizeStr) => {
    const size = sizeStr[0].split(",").map(Number);
    const expense = Number(expenseStr);
    const data = { url, size, expense };
    await axios.post("/add", data);
  };

  return (
    <Box>
      <Box>
        <Header title="Add" subtitle="Add sneakers to inventory" />
      </Box>
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
          id="outlined-required"
          label="SNEAKER URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Expense"
          onChange={(e) => setExpenseStr(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Size"
          helperText="Please type sizes like 4,5,8,9"
          onChange={(e) => setSizeStr([e.target.value])}
        />
        <Button
          variant="outlined"
          style={{
            color: colors.primary[100],
            border: `1px solid ${colors.primary[100]}`,
          }}
          onClick={() => handleSubmit(url, sizeStr)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
