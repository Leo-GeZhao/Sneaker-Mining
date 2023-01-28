export const expense = (inventory, brand) => {
  if (brand) {
    return inventory.data
      .filter((i) => i.brand === brand)
      .map((i) => i.size.length * i.expense)
      .reduce((a, b) => a + b, 0);
  } else {
    return inventory.data
      .map((i) => i.size.length * i.expense)
      .reduce((a, b) => a + b, 0);
  }
};

export const brandDetail = (inventory, detail) => {
  if (!detail) {
    return inventory
      .map((i) => i.size.filter((s) => s.isSold === false).length * i.expense)
      .reduce((a, b) => a + b, 0);
  } else if (detail === "lastSale") {
    return inventory
      .map((i) =>
        i.size
          .filter((i) => i.isSold === false)
          .map((i) => i.lastSale)
          .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  } else if (detail === "highestBid") {
    return inventory
      .map((i) =>
        i.size
          .filter((i) => i.isSold === false)
          .map((i) => i.highestBid)
          .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  } else if (detail === "lowestAsk") {
    return inventory
      .map((i) =>
        i.size
          .filter((i) => i.isSold === false)
          .map((i) => i.lowestAsk)
          .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
  }
};
