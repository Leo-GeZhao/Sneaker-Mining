import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import axios from "axios";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Button,
} from "@mui/material";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../components/Header/Header";

const Search = () => {
  const [sneaker, setSneaker] = useState(null);
  const [size, setSize] = useState(null);
  const [detail, setDetail] = useState(null);

  console.log(size);
  console.log(detail);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSneakerSearch = async () => {
    await axios.get("/search-sneaker").then((prod) => setSneaker(prod.data));
  };

  const onGetDetail = (size) => {
    const detail = sneaker.variants.filter((s) => s.size === size);
    setDetail(detail[0]);
  };

  return (
    <Box>
      <Header title="Search" subtitle="Search the sneaker from StockX" />
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        width="200px"
        sx={{ m: "20px 0 0 20px" }}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Sneaker Name" />
        <IconButton type="button" sx={{ p: 1 }} onClick={onSneakerSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
      {sneaker ? (
        <Box
          display="flex"
          // backgroundColor={colors.primary[400]}
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            m: "20px 0 0 40px",
          }}
        >
          <img
            src={sneaker.image}
            alt="sneaker-pic"
            width="400px"
            heigh="400px"
            style={{
              borderRadius: "15px",
            }}
          />
          <Typography variant="h4">Sneaker Name: {sneaker.urlKey}</Typography>
          <Typography variant="h5" sx={{ m: "10px 0 40px 0" }}>
            Style: {sneaker.pid}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {sneaker.variants.map((v, index) => (
              <Grid item xs={1} sm={2} md={2} key={index}>
                <Box>
                  <Button
                    variant="outlined"
                    style={{
                      color: colors.primary[100],
                      border: `1px solid ${colors.primary[100]}`,
                    }}
                    onClick={() => onGetDetail(v.size)}
                  >
                    {v.size}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
          {detail && (
            <Box
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                m: "20px 0",
                width: "400px",
              }}
              display="flex"
            >
              <Typography variant="h5">Product Detail</Typography>
              <Box
                display="flex"
                sx={{
                  m: "20px 0",
                  width: "400px",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <Typography>Size: {detail.size}</Typography>
                  <Typography>
                    Annual Range: {detail.market.annualLow} -{" "}
                    {detail.market.annualHigh}
                  </Typography>
                  <Typography>Last Sale: {detail.market.lastSale}</Typography>
                </Box>
                <Box>
                  <Typography>Hight Bid: {detail.market.highestBid}</Typography>
                  <Typography>Lowest Ask: {detail.market.lowestAsk}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Search;
