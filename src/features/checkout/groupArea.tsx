import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { CartGroup } from "../../app/models/cart/cartGroup";
import { formatMoney } from "../../app/utils/formatMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ItemArea from "./itemArea";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  getExpectedDeliveryTime,
  getShippingCost,
} from "../../app/store/ui/checkout";

export interface GroupAreaProps {
  cartGroup: CartGroup;
}

export default function GroupArea({
  cartGroup,
}: GroupAreaProps) {
  const expectedDeliveryTime = useAppSelector(
    getExpectedDeliveryTime(cartGroup.shopInfo.shopId)
  );
  const shippingCost = useAppSelector(
    getShippingCost(cartGroup.shopInfo.shopId)
  );
  const cartItems = cartGroup.items;

  const totalItemPrice = () => {
    let sumOfItemPrice = 0;
    for (const item of cartItems) {
      if (item.checked)
        sumOfItemPrice += item.price * item.amount;
    }

    return sumOfItemPrice;
  };

  let totalPrice = 0;
  if (shippingCost?.cost) totalPrice = totalItemPrice() + shippingCost.cost;

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <StorefrontIcon color="error" />
        <Typography sx={{ ml: 1 }}>{cartGroup.shopInfo.shopName}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {cartItems.map((item, index) => {
          if (!item.checked) return null;
          return <ItemArea key={index} item={item} />;
        })}
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ mt: 2 }}>
        <Grid container>
          <Grid item xs={2}>
            <Stack direction="row" spacing={2}>
              <LocalShippingIcon color="primary" />
              <Typography>Vận chuyển</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {"Giao hàng dự kiến vào: " + expectedDeliveryTime?.time}
          </Grid>

          <Grid item xs={4} display="flex" justifyContent="right">
            <Box sx={{ mt: 2 }} display="flex">
              <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="right">
                <Typography>Phí vận chuyển: </Typography>
              </Box>
              <Box sx={{ ml: 3 }}>
                {formatMoney(shippingCost?.cost ? shippingCost.cost : 0) + "đ"}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box sx={{ mt: 2 }} display="flex">
        <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="right">
          <Typography>Tổng số tiền: </Typography>
        </Box>
        <Box sx={{ ml: 3 }}>{formatMoney(totalPrice) + "đ"}</Box>
      </Box>
    </Box>
  );
}
