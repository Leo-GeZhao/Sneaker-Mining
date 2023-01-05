import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BarChart = ({ currencyEx, currency, currencyCal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [brand, setBrand] = useState("Nike");
  const [expense, setExpense] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [lowestAsk, setLowestAsk] = useState(null);
  const [lastSale, setLastSale] = useState(null);

  useEffect(
    function () {
      async function getInventoryByBrand() {
        const allInventory = await axios.get("/inventory");

        console.log(allInventory.data);

        const inventory = allInventory.data.filter((i) => i.brand === brand);

        const brandExpense = inventory
          .map(
            (i) => i.size.filter((s) => s.isSold === false).length * i.expense
          )
          .reduce((a, b) => a + b, 0);
        setExpense(brandExpense);

        const brandHighestBid = inventory
          .map((i) =>
            i.size
              .filter((i) => i.isSold === false)
              .map((i) => i.highestBid)
              .reduce((a, b) => a + b, 0)
          )
          .reduce((a, b) => a + b, 0);
        setHighestBid(brandHighestBid);

        const brandLowestAsk = inventory
          .map((i) =>
            i.size
              .filter((i) => i.isSold === false)
              .map((i) => i.lowestAsk)
              .reduce((a, b) => a + b, 0)
          )
          .reduce((a, b) => a + b, 0);
        setLowestAsk(brandLowestAsk);

        const brandLastSale = inventory
          .map((i) =>
            i.size
              .filter((i) => i.isSold === false)
              .map((i) => i.lastSale)
              .reduce((a, b) => a + b, 0)
          )
          .reduce((a, b) => a + b, 0);
        setLastSale(brandLastSale);
      }
      getInventoryByBrand();
    },
    [brand]
  );
  const data = [
    {
      comparison: "Expense",
      expense: currencyCal(expense),
      expenseColor: "hsl(229, 70%, 50%)",
    },
    {
      comparison: "Highest Bid",
      "Highest Bid": currencyCal(highestBid),
      "Highest BidColor": "hsl(111, 70%, 50%)",
    },
    {
      comparison: "Lowest Ask",
      "Lowest Ask": currencyCal(lowestAsk),
      "Lowest AskColor": "hsl(106, 70%, 50%)",
    },
    {
      comparison: "Last Sale",
      "Last Sale": currencyCal(lastSale),
      "Last SaleColor": "hsl(9, 70%, 50%)",
    },
  ];
  return (
    <Box>
      <Box>
        <Header
          title="Comparison"
          subtitle="Inventory comparison filtered by brand "
          note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
        />
      </Box>
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <FormControl sx={{ width: 150 }} size="small">
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
        </FormControl>
      </Box>
      <Box sx={{ height: 500 }}>
        <ResponsiveBar
          data={data}
          theme={{
            // added
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          keys={["Last Sale", "Lowest Ask", "Highest Bid", "expense"]}
          indexBy="comparison"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: isDashboard ? undefined : "country", // changed
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: isDashboard ? undefined : "food", // changed
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default BarChart;
