import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "mui-image";
import axios from "axios";

import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

const Transaction = ({ currencyEx, currency, currencyCal }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(function () {
    async function getTransactions() {
      const transactions = await axios.get("/inventory/transactions");
      console.log(transactions.data);
      setTransactions(transactions.data);
    }
    getTransactions();
  }, []);
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
              {t.size
                .filter((s) => s.isSold === true)
                .map((a, idx) => (
                  <Box>
                    <Typography>{a.size}</Typography>
                  </Box>
                ))}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "20%" }}
            >
              {t.size
                .filter((s) => s.isSold === true)
                .map((a) => (
                  <Box>
                    <Typography>{currencyCal(a.soldPrice)}</Typography>
                  </Box>
                ))}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "25%" }}
            >
              {t.size
                .filter((s) => s.isSold === true)
                .map((a) => (
                  <Box>
                    <Typography>{a.updatedAt.substring(0, 10)}</Typography>
                  </Box>
                ))}
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              align="right"
              sx={{ width: "20%" }}
            >
              {t.size
                .filter((s) => s.isSold === true)
                .map((a) => (
                  <Box>
                    <Typography>
                      {currencyCal(a.soldPrice - t.expense)}
                    </Typography>
                  </Box>
                ))}
            </TableCell>
          </TableRow>
        ))}
      </Box>
    </Box>
  );
};

export default Transaction;
