import Header from "../../components/Header/Header";
import Transaction from "../../components/Transaction/Transaction";
import { Box } from "@mui/material";
const Overview = ({ currencyEx, currency, currencyCal }) => {
  return (
    <Box>
      <Box>
        <Header
          title="Overview"
          subtitle="Sales Transactions by date"
          note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
        />
      </Box>
      <Box>
        <Transaction />
      </Box>
    </Box>
  );
};

export default Overview;
