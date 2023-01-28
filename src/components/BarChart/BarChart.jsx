import { useEffect, useState } from "react";

import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//Nivo Chart Package
import { ResponsiveBar } from "@nivo/bar";

//Inventory API
import * as inventoryAPI from "../../utilities/api/inventory";

//Inventory Service
import * as inventoryService from "../../utilities/service/inventory";

//Color Theme
import { tokens } from "../../theme";

const BarChart = ({ currencyCal, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [brand, setBrand] = useState("Nike");
  const [expense, setExpense] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [lowestAsk, setLowestAsk] = useState(null);
  const [lastSale, setLastSale] = useState(null);

  useEffect(
    function () {
      const getInventoryByBrand = async () => {
        const data = { id: user._id };
        const allInventory = await inventoryAPI.getAll(data);

        const inventory = allInventory.data.filter((i) => i.brand === brand);

        //Get Total Expense by Brand
        const brandExpense = inventoryService.brandDetail(inventory);
        setExpense(brandExpense);

        //Get Total HighestBid by Brand
        const brandHighestBid = inventoryService.brandDetail(
          inventory,
          "highestBid"
        );
        setHighestBid(brandHighestBid);

        //Get Total LowestAsk by Brand
        const brandLowestAsk = inventoryService.brandDetail(
          inventory,
          "lowestAsk"
        );
        setLowestAsk(brandLowestAsk);

        //Get Total LastSale by Brand
        const brandLastSale = inventoryService.brandDetail(
          inventory,
          "lastSale"
        );
        setLastSale(brandLastSale);
      };
      getInventoryByBrand();
    },
    [brand]
  );

  //Bar Chart Data
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
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
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
        />
      </Box>
    </Box>
  );
};

export default BarChart;
