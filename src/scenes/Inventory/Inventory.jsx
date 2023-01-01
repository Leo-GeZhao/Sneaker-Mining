import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import List from "../../components/List/List";
import { tokens } from "../../theme";
import axios from "axios";
import { Box, useTheme, Grid } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Inventory = ({ currencyEx, currencyCal, currency }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventory, setInventory] = useState([]);
  const [finish, setFinish] = useState(false);

  useEffect(
    function () {
      async function getInventory() {
        const inventory = await axios.get("/inventory");
        setFinish(false);
        setInventory(inventory.data);
      }
      getInventory();
    },
    [finish]
  );

  return (
    <Box>
      <Box>
        <Header
          title="Inventory"
          subtitle="Inventory List"
          note={currencyEx === currency.CAD ? "CAD" : "USD"}
        />
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Highest Bid</TableCell>
                <TableCell align="right">Lowest Ask</TableCell>
                <TableCell align="right">Last Sale</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
        {inventory.map((i) => (
          <List
            inventory={i}
            currencyEx={currencyEx}
            currencyCal={currencyCal}
            currency={currency}
            setFinish={setFinish}
            finish={finish}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Inventory;
