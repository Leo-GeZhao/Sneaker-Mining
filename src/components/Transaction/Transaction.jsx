import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "mui-image";
import axios from "axios";

const Transaction = () => {
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
          <Box>
            <Image src={t.image} width={70} style={{ borderRadius: 8 }} />
            <Typography>{t.name}</Typography>
            <Typography>{t.brand}</Typography>
            <Typography>Expense: {t.expense}</Typography>
            {t.size
              .filter((s) => s.isSold === true)
              .map((a) => (
                <Box>
                  <Typography>SoldPrice: {a.soldPrice}</Typography>
                  <Typography>
                    Sold Date: {a.updatedAt.substring(0, 10)}
                  </Typography>
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Transaction;
