import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import Landing from "./scenes/Landing/Landing";
import Dashboard from "./scenes/dashboard/Dashboard";
import Search from "./scenes/Search/Search";
import Add from "./scenes/Add/Add";
import Inventory from "./scenes/Inventory/Inventory";
import Expense from "./scenes/Expense/Index";
import Comparison from "./scenes/BarChart/Index";
import Overview from "./scenes/Overview/Index";

import { getUser } from "./utilities/service/user";

const currency = {
  USD: 1,
  CAD: 1.36,
};

const App = () => {
  const [theme, colorMode] = useMode();
  const [currencyEx, setCurrencyEx] = useState(currency.USD);
  const [user, setUser] = useState(getUser);

  console.log(user);

  const currencyCal = (price) => {
    return Math.floor(price * currencyEx);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar user={user} />
          <main className="content">
            <Topbar
              currencyEx={currencyEx}
              setCurrencyEx={setCurrencyEx}
              currency={currency}
            />
            <Routes>
              {!user ? (
                <Route
                  path="/"
                  element={<Landing user={user} setUser={setUser} />}
                />
              ) : (
                <>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard
                        currencyCal={currencyCal}
                        currencyEx={currencyEx}
                        currency={currency}
                        setUser={setUser}
                        user={user}
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
                      <Expense
                        currencyEx={currencyEx}
                        currency={currency}
                        currencyCal={currencyCal}
                      />
                    }
                  />
                  <Route
                    path="/bar"
                    element={
                      <Comparison
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
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
