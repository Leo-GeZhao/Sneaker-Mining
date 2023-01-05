import Header from "../../components/Header/Header";
import Transaction from "../../components/Transaction/Transaction";
import { Box } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {/* <FormControl sx={{}} size="small">
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={brand}
                      label="Brand"
                      onChange={(e) => {
                        setBrand(e.target.value);
                      }}
                    >
                      <MenuItem value="Nike">Nike</MenuItem>
                      <MenuItem value="Jordan">Jordan</MenuItem>
                      <MenuItem value="Adidas">Adidas</MenuItem>
                      <MenuItem value="Yeezy">Yeezy</MenuItem>
                    </Select>
                  </FormControl> */}
                </TableCell>
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
