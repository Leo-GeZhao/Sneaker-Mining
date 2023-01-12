import Header from "../../components/Header/Header";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import Transaction from "../../components/Transaction/Transaction";
import PieChart from "../../components/PieChart/PieChart";
import Logout from "../../components/Logout/Logout";
import { logout } from "../../utilities/service/user";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ currencyEx, currencyCal, currency, setUser, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  function handleLogOut() {
    logout();
    setUser(null);
    navigate("/");
    // setShowGoogleSignIn(true);
  }

  return (
    <Box sx={{ mt: 3, mx: 1 }}>
      <Box>
        <Header
          title="Dashboard"
          subtitle="Welcome to dashboard"
          note={currencyEx === currency.CAD ? "CAD $" : "USD $"}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Box
                display="flex"
                sx={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mb: 2 }}>Welcome, {user.name}</Typography>
                <Logout
                  colors={colors}
                  handleLogout={handleLogOut}
                  setUser={setUser}
                />
              </Box>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <PieChart
                currencyEx={currencyEx}
                currency={currency}
                currencyCal={currencyCal}
                height={200}
                user={user}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Transaction
                currencyEx={currencyEx}
                currency={currency}
                currencyCal={currencyCal}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
