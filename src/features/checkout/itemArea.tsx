import { Box, Grid, Stack, Typography } from "@mui/material";
import { CartGroupItem } from "../../app/models/cart/cartGroupItem";
import { formatMoney } from "../../app/utils/formatMoney";

export interface ItemAreaProps {
  item: CartGroupItem;
}

export default function ItemArea({ item }: ItemAreaProps) {
  return (
    <Box>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={5}>
          <Stack direction="row">
            <Box sx={{ width: 40, height: 40 }}>
              <img
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                src={item.avatarUrl}
              ></img>
            </Box>
            <Box sx={{ width: "100%" }} display="flex" alignItems="center">
              <Typography sx={{ paddingLeft: 2 }}>{item.name}</Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ height: "100%" }} display="flex" alignItems="center">
            {item.combinationName}
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ height: "100%" }} display="flex" alignItems="center">
            {formatMoney(item.price) + "đ"}
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box sx={{ height: "100%" }} display="flex" alignItems="center">
            {item.amount}
          </Box>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="right">
          <Box sx={{ height: "100%" }} display="flex" alignItems="center">
            {formatMoney(item.amount * item.price) + "đ"}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
