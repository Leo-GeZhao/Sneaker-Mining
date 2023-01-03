import React, { useState } from "react";
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

const Search = ({ currencyEx, currencyCal, currency }) => {
  const [sneaker, setSneaker] = useState(null);
  // const [size, setSize] = useState(null);
  const [detail, setDetail] = useState(null);
  const [url, setUrl] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e) => {
    e.preventDefault();
    const searchURL = e.target.value;
    setUrl(searchURL);
  };

  const onSneakerSearch = async () => {
    await axios
      .post("/search-sneaker", { url })
      .then((prod) => setSneaker(prod.data));
    setUrl("");
  };

  const onGetDetail = (size) => {
    const detail = sneaker.variants.filter((s) => s.size === size);
    setDetail(detail[0]);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Header
        title="Search"
        subtitle="Search the sneaker from StockX"
        note="Please input the full stockX link, since stockX has customized link for each sneaker"
      />
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        width="200px"
        sx={{ m: "20px 0 0 20px" }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Sneaker Name"
          onChange={handleChange}
          value={url}
        />
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
          <Box
            display="flex"
            sx={{
              mt: "20px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">{sneaker.urlKey}</Typography>
            <Typography variant="h5" sx={{ m: "10px 0 40px 0" }}>
              Style: {sneaker.pid}
            </Typography>
          </Box>
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
              <Typography variant="h5">
                Product Detail ({currencyEx === currency.CAD ? "CAD" : "USD"})
              </Typography>
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
                    Annual Range: {currencyCal(detail.market.annualLow)} -{" "}
                    {currencyCal(detail.market.annualHigh)}
                  </Typography>
                  <Typography>
                    Last Sale: {currencyCal(detail.market.lastSale)}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Hight Bid: {currencyCal(detail.market.highestBid)}
                  </Typography>
                  <Typography>
                    Lowest Ask: {currencyCal(detail.market.lowestAsk)}
                  </Typography>
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
