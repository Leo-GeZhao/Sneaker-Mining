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
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/search"
                element={
                  <Search
                    currencyEx={currencyEx}
                    currencyCal={currencyCal}
                    currency={currency}
                  />
                }
              />
              <Route path="/add" element={<Add />} />
              <Route
                path="/inventory"
                element={
                  <Inventory
                    currencyEx={currencyEx}
                    currencyCal={currencyCal}
                    currency={currency}
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
