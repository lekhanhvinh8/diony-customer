import { Box, Grid, Divider, Typography, Button } from "@mui/material";

export interface OrderAreaProps {}

export default function OrderArea(props: OrderAreaProps) {
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
              200.000
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography display="flex" justifyContent="right">
              Phí vận chuyển:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography display="flex" justifyContent="right">
              200.000
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
                2.000.000 ₫
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
          sx={{ width: 400 }}
        >
          Đặt hàng
        </Button>
      </Box>
    </Box>
  );
}
