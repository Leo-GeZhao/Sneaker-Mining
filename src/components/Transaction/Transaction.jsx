import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "mui-image";

import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

const Transaction = ({
  currencyEx,
  currency,
  currencyCal,
  user,
  transactions,
}) => {
  return (
    <Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Sold Price</TableCell>
                <TableCell>Sold Date</TableCell>
                <TableCell>Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
        {transactions.map((t) => (
          <TableRow>
            <TableCell>
              <Image src={t.image} width={70} style={{ borderRadius: 8 }} />
            </TableCell>
            <TableCell component="th" scope="row" align="right">
              {t.brand}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "15%" }}
            >
              {t.name}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "15%" }}
            >
              {t.size}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "20%" }}
            >
              {t.price}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "20%" }}
            >
              {t.createdAt.substring(0, 10)}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "25%" }}
            >
              {t.profit}
            </TableCell>
          </TableRow>
        ))}
      </Box>
    </Box>
  );
};

export default Transaction;
