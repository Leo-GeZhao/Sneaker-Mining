import React, { useState } from "react";
import axios from "axios";
import { Box, Button, ButtonGroup, useTheme, Badge } from "@mui/material";
import { tokens } from "../../theme";
import Image from "mui-image";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const List = ({
  inventory,
  currencyEx,
  currencyCal,
  currency,
  setFinish,
  finish,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventorySize, setInventorySize] = useState(0);
  const [update, setUpdate] = useState("update");

  const handleUpdate = async (url, id, size) => {
    const data = { url, id, size };
    await axios.post("/update", data);
    setFinish(true);
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
      </TableCell>
      <TableCell component="th" scope="row" align="right">
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
      </TableCell>
    </TableRow>
  );
};

export default List;
