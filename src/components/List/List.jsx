import React, { useState } from "react";
import * as inventoryAPI from "../../utilities/api/inventory";
import * as transactionAPI from "../../utilities/api/transaction";
import { Box, Button, ButtonGroup, useTheme, Badge } from "@mui/material";
import { tokens } from "../../theme";
import Image from "mui-image";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const List = ({
  inventory,
  currencyEx,
  currencyCal,
  currency,
  setFinish,
  finish,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inventorySize, setInventorySize] = useState(0);
  const [open, setOpen] = useState(false);
  const [soldSize, setSoldSize] = useState(null);
  const [soldPrice, setSoldPrice] = useState(null);

  const handleClickOpen = (e) => {
    setSoldSize(e.target.textContent);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    setSoldPrice(null);
  };

  const handleSubmit = async () => {
    const id = inventory._id;
    const data = { soldPrice, soldSize };

    if (!!data.soldPrice) {
      const soldInformation = await inventoryAPI.sold(id, data);

      const { brand, name, image, expense, user } = soldInformation.data;
      const soldItem = {
        brand,
        name,
        image,
        expense,
        user,
        size: soldSize,
        price: soldPrice,
      };

      await transactionAPI.createTransaction(soldItem);
    }
    setFinish(true);
    handleClose();
  };

  const handleUpdate = async (url, id, size, e) => {
    const data = { url, id, size };
    await inventoryAPI.update(data);
    e.target.textContent = "updated!";
    setFinish(true);
  };

  const handleDeleteSize = async (size) => {
    const id = inventory._id;
    if (size === "all") {
      await inventoryAPI.deleteAll(id);
    } else {
      const data = { size: size };
      await inventoryAPI.deleteOne(id, data);
    }
    setFinish(true);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row" sx={{ width: "15%" }}>
        <Image src={inventory.image} width={70} style={{ borderRadius: 8 }} />
      </TableCell>
      <TableCell component="th" scope="row">
        {inventory.name}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "10%" }}>
        <ButtonGroup size="small" variant="text">
          {inventory.size
            .filter((i) => i.isSold === false)
            .map((s, idx) => (
              <Button
                onClick={() => setInventorySize(idx)}
                style={{
                  color: colors.primary[100],
                }}
              >
                {s.size}{" "}
              </Button>
            ))}
        </ButtonGroup>
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "15%" }}>
        {currencyCal(inventory.size[inventorySize].highestBid)}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "20%" }}>
        {currencyCal(inventory.size[inventorySize].lowestAsk)}
      </TableCell>
      <TableCell component="th" scope="row" align="right" sx={{ width: "20%" }}>
        {currencyCal(inventory.size[inventorySize].lastSale)}
        <Box
          component="span"
          sx={{
            ml: "3px",
            color:
              inventory.size[inventorySize].lastSale - inventory.expense > 0
                ? "success.main"
                : "error.main",
          }}
        >
          (
          {Math.round(
            (inventory.size[inventorySize].lastSale / inventory.expense - 1) *
              100
          )}
          % )
        </Box>
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        <Box display="flex">
          <Button
            style={{
              color: colors.primary[100],
            }}
            onClick={(e) => {
              const size = inventory.size.map((i) => i.size);
              handleUpdate(inventory.url, inventory._id, size, e);
            }}
          >
            UPDATE
          </Button>
          <Box>
            <FormControl sx={{ width: 80 }} size="small">
              <InputLabel id="demo-simple-select-label">Delete</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={brand}
                label="Delete"
              >
                {inventory.size
                  .filter((i) => i.isSold === false)
                  .map((s, idx) => (
                    <MenuItem onClick={() => handleDeleteSize(s.size)}>
                      {s.size}
                    </MenuItem>
                  ))}
                <MenuItem onClick={() => handleDeleteSize("all")}>All</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: 80, mt: 1 }} size="small">
              <InputLabel id="demo-simple-select-label">Sold</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={brand}
                label="Sold"
              >
                {inventory.size
                  .filter((i) => i.isSold === false)
                  .map((s, idx) => (
                    <MenuItem onClick={handleClickOpen}>{s.size}</MenuItem>
                  ))}
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Congradulations!</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter the sold price for your inventory.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Sold Price (USD $)"
                      type="number"
                      fullWidth
                      variant="standard"
                      value={soldPrice}
                      onChange={(e) => setSoldPrice(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleSubmit}>Confirm</Button>
                  </DialogActions>
                </Dialog>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default List;
