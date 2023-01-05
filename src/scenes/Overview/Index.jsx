import Header from "../../components/Header/Header";
import Transaction from "../../components/Transaction/Transaction";
import { Box } from "@mui/material";

const Overview = ({ currencyEx, currency, currencyCal }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Box>
        <Header
          title="Overview"
          subtitle="Sales Transactions by date"
          note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Transaction
          currencyEx={currencyEx}
          currency={currency}
          currencyCal={currencyCal}
        />
      </Box>
    </Box>
  );
};

export default Overview;
