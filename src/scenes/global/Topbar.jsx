import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Box, IconButton, useTheme, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { TbCurrencyDollarCanadian } from "react-icons/tb";
import { IoLogoUsd } from "react-icons/io";
const Topbar = ({ currencyEx, setCurrencyEx, currency }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="end" p={2}>
      {/* search bar */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggoleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => setCurrencyEx(currency.CAD)}>
          <TbCurrencyDollarCanadian />
        </IconButton>
        <IconButton onClick={() => setCurrencyEx(currency.USD)}>
          <IoLogoUsd />
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
