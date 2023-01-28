import React, { useEffect, useState } from "react";

import { useTheme, Box, Typography } from "@mui/material";

//Nivo Chart Package
import { ResponsivePie } from "@nivo/pie";

//Inventory API
import * as inventoryAPI from "../../utilities/api/inventory";

import * as inventoryService from "../../utilities/service/inventory";

//Color Theme
import { tokens } from "../../theme";

const PieChart = ({ currencyCal, height, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalExpense, setTotalExpense] = useState(null);
  const [nikeValue, setNikeValue] = useState(null);
  const [adidasValue, setAdidasValue] = useState(null);
  const [jordanValue, setJordanValue] = useState(null);
  const [yeezyValue, setYeezyValue] = useState(null);

  useEffect(
    function () {
      const getInventoryByBrand = async () => {
        const data = { id: user._id };
        const inventory = await inventoryAPI.getAll(data);

        //Total Expense
        const totalExpense = inventoryService.expense(inventory);
        setTotalExpense(totalExpense);

        //Nike Expense
        const nikeExpense = inventoryService.expense(inventory, "Nike");
        setNikeValue(nikeExpense);

        //Jordan Expense
        const jordanExpense = inventoryService.expense(inventory, "Jordan");
        setJordanValue(jordanExpense);

        //Adidas Expense
        const adidasExpense = inventoryService.expense(inventory, "Adidas");
        setAdidasValue(adidasExpense);

        //Yeezy Expense
        const yeezyExpense = inventoryService.expense(inventory, "Yeezy");
        setYeezyValue(yeezyExpense);
      };
      getInventoryByBrand();
    },
    [totalExpense]
  );

  //Pie Chart Data
  const data = [
    {
      id: "Nike",
      label: "Nike",
      value: currencyCal(nikeValue),
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "Jordan",
      label: "Jordan",
      value: currencyCal(jordanValue),
      color: "hsl(291, 70%, 50%)",
    },
    {
      id: "Adidas",
      label: "Adidas",
      value: currencyCal(adidasValue),
      color: "hsl(162, 70%, 50%)",
    },
    {
      id: "Yeezy",
      label: "Yeezy",
      value: currencyCal(yeezyValue),
      color: "hsl(229, 70%, 50%)",
    },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography>Total Expense: {currencyCal(totalExpense)}</Typography>
      </Box>

      <Box sx={{ height: height }}>
        <ResponsivePie
          data={data}
          theme={{
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
          margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={colors.grey[100]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 70,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default PieChart;
