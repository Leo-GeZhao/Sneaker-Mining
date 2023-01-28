import React from "react";

import { Box } from "@mui/material";

//Components
import Header from "../../components/Header/Header";
import PieChart from "../../components/PieChart/PieChart";

const Expense = ({ currencyEx, currency, currencyCal, user }) => {
  return (
    <Box>
      <Box>
        <Header
          title="Expense"
          subtitle="Total expense breakdown by each brand"
          note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
        />
      </Box>
      <PieChart currencyCal={currencyCal} height={500} user={user} />
    </Box>
  );
};

export default Expense;
