import { Box, Grid, Divider, Typography, Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { formatMoney } from "../../app/utils/formatMoney";

export interface OrderAreaProps {}

export default function OrderArea(props: OrderAreaProps) {
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);
  const cartPage = useAppSelector((state) => state.ui.cartPage);
  const shippingCosts = useAppSelector(
    (state) => state.ui.checkoutPage.shippingCosts
  );

  const hasAnyItems = () => {
    let flag = false;

    for (const groupIndex of cartPage.cartGroupIndexes) {
      if (groupIndex.cartItemIndexes.map((i) => i.checked).includes(true))
        flag = true;
    }

    return flag;
  };

  const getTotalShippingCosts = () => {
    let sum = 0;
    for (const cost of shippingCosts) {
      if (cost.cost) sum += cost.cost;
    }

    return sum;
  };

  const getTotalItemPrices = () => {
    let sum = 0;

    if (cartGroups.length !== cartPage.cartGroupIndexes.length) return sum;

    for (let i = 0; i < cartPage.cartGroupIndexes.length; i++) {
      const groupIndex = cartPage.cartGroupIndexes[i];
      const cartGroup = cartGroups[i];

      if (cartGroup) {
        let totalGroupPrice = 0;
        for (let j = 0; j < groupIndex.cartItemIndexes.length; j++) {
          const itemIndex = groupIndex.cartItemIndexes[j];
          const item = cartGroup.items[j];

          if (itemIndex.checked && item) {
            totalGroupPrice += item.price * item.amount;
          }
        }

        sum += totalGroupPrice;
      }
    }

    return sum;
  };

  return (
    <Box sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
      <Box display="flex">
        <Box sx={{ flexGrow: 1 }}></Box>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography display="flex" justifyContent="right">
              Tổng tiền hàng:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography display="flex" justifyContent="right">
              {formatMoney(getTotalItemPrices()) + "₫"}
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography display="flex" justifyContent="right">
              Phí vận chuyển:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography display="flex" justifyContent="right">
              {formatMoney(getTotalShippingCosts()) + "₫"}
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography
              display="flex"
              justifyContent="right"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              Tổng thanh toán:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="right" alignItems="center">
              <Typography fontSize={30} color="red">
                {formatMoney(getTotalShippingCosts() + getTotalItemPrices()) +
                  "₫"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box display="flex" justifyContent="right" sx={{ mt: 3 }}>
        <Button
          size="large"
          color="error"
          variant="contained"
          disabled={!hasAnyItems()}
          sx={{ width: 400 }}
        >
          Đặt hàng
        </Button>
      </Box>
    </Box>
  );
}
