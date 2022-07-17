import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import GroupArea from "./groupArea";

export interface ItemsCheckoutProps {}

export default function ItemsCheckout(props: ItemsCheckoutProps) {
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);

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
      {cartGroups.map((cartGroup, index) => {
        if (
          cartGroup.items.map((item) => item.checked).includes(true)
        ) {
          return (
            <Box key={index} sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
              <GroupArea
                cartGroup={cartGroup}
              />
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
}
