import React from "react";

import { Box } from "@mui/material";

//Components
import Header from "../../components/Header/Header";
import BarChart from "../../components/BarChart/BarChart";

const Comparison = ({ currencyEx, currency, currencyCal, user }) => {
  return (
    <Box>
      <Header
        title="Comparison"
        subtitle="Inventory comparison filtered by brand "
        note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
      />
      <BarChart currencyCal={currencyCal} user={user} />
    </Box>
  );
};

export default Comparison;
