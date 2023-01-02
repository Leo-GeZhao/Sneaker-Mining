import React, { useState } from "react";
import axios from "axios";
import { Box, Button, ButtonGroup, useTheme, Badge } from "@mui/material";
import { tokens } from "../../theme";
import Image from "mui-image";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const List = ({
  inventory,
  currencyEx,
  currencyCal,
  currency,
  setFinish,
  finish,
  update,
  setUpdate,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventorySize, setInventorySize] = useState(0);

  const handleUpdate = async (url, id, size) => {
    const data = { url, id, size };
    await axios.post("/update", data);
    setFinish(true);
  };

  const handleDeleteSize = async (data) => {
    const id = inventory._id;
    if (data === "all") {
      axios.delete(`/inventory/${id}/delete`);
      setFinish(true);
    } else {
      console.log(data);
    }
  };
  return (
    <TableRow>
      <TableCell component="th" scope="row" sx={{ width: "15%" }}>
        <Image src={inventory.image} width={70} style={{ borderRadius: 8 }} />
      </TableCell>
      <TableCell component="th" scope="row">
        {inventory.name}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "10%" }}>
        <ButtonGroup size="small" variant="text">
          {inventory.size.map((s, idx) => (
            <Button
              onClick={() => setInventorySize(idx)}
              style={{
                color: colors.primary[100],
              }}
            >
              {s.size}{" "}
            </Button>
          ))}
        </ButtonGroup>
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "15%" }}>
        {currencyCal(inventory.size[inventorySize].highestBid)}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "20%" }}>
        {currencyCal(inventory.size[inventorySize].lowestAsk)}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "20%" }}>
        {currencyCal(inventory.size[inventorySize].lastSale)}
        <Box
          component="span"
          sx={{
            ml: "3px",
            color:
              inventory.size[inventorySize].lastSale - inventory.expense > 0
                ? "success.main"
                : "error.main",
          }}
        >
          (
          {Math.round(
            (inventory.size[inventorySize].lastSale / inventory.expense - 1) *
              100
          )}
          % )
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "20%" }}>
        <Box display="flex">
          <Button
            style={{
              color: colors.primary[100],
            }}
            onClick={() => {
              const size = inventory.size.map((i) => i.size);
              handleUpdate(inventory.url, inventory._id, size);
              setUpdate("updated!");
            }}
          >
            {update}
          </Button>
          <FormControl sx={{ width: 80 }} size="small">
            <InputLabel id="demo-simple-select-label">Delete</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={brand}
              label="Delete"
            >
              {inventory.size.map((i) => (
                <MenuItem onClick={() => handleDeleteSize(i.size)}>
                  {i.size}
                </MenuItem>
              ))}
              <MenuItem onClick={() => handleDeleteSize("all")}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default List;
