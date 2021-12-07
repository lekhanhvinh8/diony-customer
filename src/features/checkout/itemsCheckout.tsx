import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { formatMoney } from "../../app/utils/formatMoney";
import GroupArea from "./groupArea";

export interface ItemsCheckoutProps {}

export default function ItemsCheckout(props: ItemsCheckoutProps) {
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);
  const cartPage = useAppSelector((state) => state.ui.cartPage);

  return (
    <Box>
      <Box sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
        <Grid container>
          <Grid item xs={5}>
            Sản phẩm
          </Grid>
          <Grid item xs={2}>
            Phân loại
          </Grid>
          <Grid item xs={2}>
            Đơn giá
          </Grid>
          <Grid item xs={1}>
            Số lượng
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="right">
            <Typography>Thành tiền</Typography>
          </Grid>
        </Grid>
      </Box>
      {cartPage.cartGroupIndexes.map((groupIndex, index) => {
        if (
          groupIndex.cartItemIndexes.map((item) => item.checked).includes(true)
        ) {
          const cartGroup = cartGroups[index];
          const cartItemIndexes = groupIndex.cartItemIndexes;
          return (
            <Box key={index} sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
              <GroupArea
                cartGroup={cartGroup}
                cartItemIndexes={cartItemIndexes}
              />
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
}
