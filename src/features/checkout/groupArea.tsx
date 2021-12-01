import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CartGroup } from "../../app/models/cart/cartGroup";
import { CartGroupItem } from "../../app/models/cart/cartGroupItem";
import { CartItemIndex } from "../../app/store/ui/cart";
import { formatMoney } from "../../app/utils/formatMoney";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ItemArea from "./itemArea";

export interface GroupAreaProps {
  cartGroup: CartGroup;
  cartItemIndexes: Array<CartItemIndex>;
}

export default function GroupArea({
  cartGroup,
  cartItemIndexes,
}: GroupAreaProps) {
  const cartItems = cartGroup.items;
  return (
    <Box>
      <Box>{cartGroup.shopInfo.shopName}</Box>
      <Box sx={{ mt: 2 }}>
        {cartItemIndexes.map((itemIndex) => {
          const item = cartItems[itemIndex.index];
          return <ItemArea item={item} />;
        })}
      </Box>
      <Divider sx={{ mt: 3 }} />
      <Box sx={{ mt: 2 }}>
        <Grid container>
          <Grid item xs={2}>
            <Stack direction="row" spacing={2}>
              <LocalShippingIcon color="primary" />
              <Typography>Van chuyen</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            Giao vào Thứ Năm, 25/11
          </Grid>

          <Grid item xs={4} display="flex" justifyContent="right">
            <Box sx={{ mt: 2 }} display="flex">
              <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="right">
                <Typography>Phi van chuyen:</Typography>
              </Box>
              <Box sx={{ ml: 3 }}>{formatMoney(20000)}</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box sx={{ mt: 2 }} display="flex">
        <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="right">
          <Typography>Tổng số tiền: </Typography>
        </Box>
        <Box sx={{ ml: 3 }}>{formatMoney(123124)}</Box>
      </Box>
    </Box>
  );
}
