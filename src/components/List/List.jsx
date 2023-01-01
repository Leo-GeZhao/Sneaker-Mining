import React, { useState } from "react";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Image from "mui-image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ inventory, currencyEx, currencyCal, currency }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventorySize, setInventorySize] = useState(0);
  console.log(inventorySize);
  return (
    <TableRow>
      <TableCell component="th" scope="row" sx={{ width: "15%" }}>
        <Image src={inventory.image} width={50} />
      </TableCell>
      <TableCell component="th" scope="row">
        {inventory.name}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "15%" }}>
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
      </TableCell>
    </TableRow>
  );
};

export default List;
