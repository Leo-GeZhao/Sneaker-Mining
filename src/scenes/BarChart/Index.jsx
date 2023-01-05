import React from "react";
import Header from "../../components/Header/Header";
import BarChart from "../../components/BarChart/BarChart";
import { Box } from "@mui/material";

const Comparison = ({ currencyEx, currency, currencyCal }) => {
  return (
    <Box>
      <Header
        title="Comparison"
        subtitle="Inventory comparison filtered by brand "
        note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
      />
      <BarChart
        currencyEx={currencyEx}
        currency={currency}
        currencyCal={currencyCal}
      />
    </Box>
  );
};

export default Comparison;
