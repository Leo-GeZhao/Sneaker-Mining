import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "mui-image";
import axios from "axios";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const Transaction = ({ currencyEx, currency, currencyCal }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(function () {
    async function getTransactions() {
      const transactions = await axios.get("/inventory/transactions");
      console.log(transactions.data);
      setTransactions(transactions.data);
      const test = transactions.data
        .map((i) => i.size)
        .map((s) => s.filter((t) => t.isSold === true));
      const test2 = test.map((t) => t).map((s) => s.lastSale);
      console.log(test);
    }
    getTransactions();
  }, []);
  return (
    <Box>
      <Box>
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
