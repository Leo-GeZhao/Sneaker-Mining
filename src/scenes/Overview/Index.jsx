import { Box } from "@mui/material";

//Components
import Header from "../../components/Header/Header";
import Transaction from "../../components/Transaction/Transaction";

const Overview = ({ currencyEx, currency, currencyCal, transactions }) => {
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
        <Transaction currencyCal={currencyCal} transactions={transactions} />
      </Box>
    </Box>
  );
};

export default Overview;
