import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Dashboard from "./scenes/dashboard/Dashboard";
import Search from "./scenes/Search/Search";
import Add from "./scenes/Add/Add";
import Inventory from "./scenes/Inventory/Inventory";
import PieChart from "./components/PieChart/PieChart";
import BarChart from "./components/BarChart/BarChart";
import Overview from "./components/Overview/Overview";

const currency = {
  USD: 1,
  CAD: 1.36,
};

const App = () => {
  const [theme, colorMode] = useMode();
  const [currencyEx, setCurrencyEx] = useState(currency.USD);

  const currencyCal = (price) => {
    return Math.floor(price * currencyEx);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar
              currencyEx={currencyEx}
              setCurrencyEx={setCurrencyEx}
              currency={currency}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    currencyCal={currencyCal}
                    currencyEx={currencyEx}
                    currency={currency}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <Search
                    currencyCal={currencyCal}
                    currencyEx={currencyEx}
                    currency={currency}
                  />
                }
              />
              <Route path="/add" element={<Add />} />
              <Route
                path="/inventory"
                element={
                  <Inventory
                    currencyCal={currencyCal}
                    currencyEx={currencyEx}
                    currency={currency}
                  />
                }
              />
              <Route
                path="/pie"
                element={
                  <PieChart
                    currencyEx={currencyEx}
                    currency={currency}
                    currencyCal={currencyCal}
                  />
                }
              />
              <Route
                path="/bar"
                element={
                  <BarChart
                    currencyEx={currencyEx}
                    currency={currency}
                    currencyCal={currencyCal}
                  />
                }
              />
              <Route
                path="/overview"
                element={
                  <Overview
                    currencyEx={currencyEx}
                    currency={currency}
                    currencyCal={currencyCal}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
