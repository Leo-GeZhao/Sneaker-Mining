import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle, note }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ m: "5px 0 0 20px" }}>
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 10px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
        <Typography color={colors.greenAccent[400]}>({note})</Typography>
      </Box>
    </Box>
  );
};

export default Header;
