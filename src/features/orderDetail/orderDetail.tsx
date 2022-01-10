import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import OrderHistory from "./orderHistory";
import OrderInfo from "./orderInfo";
import { useParams } from "react-router-dom";
import { orderIdParams, productIdRouteParams } from "../../app/layouts/App";
import { useAppDispatch } from "../../app/hooks";
import { reloadOrderDetail } from "../../app/store/ui/orderDetailPage";
import OrderAction from "./orderAction";
import CancelledDialog from "./cancelledDialog";
import RatingDialog from "./ratingDialog";

interface OrderDetailProps {}

const OrderDetail = (props: OrderDetailProps) => {
  const params = useParams();

  const orderId = params[orderIdParams];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orderId !== "none" && orderId !== undefined) {
      dispatch(reloadOrderDetail(orderId));
    }
  }, [orderId, dispatch]);

  return (
    <Box sx={{ mt: 2 }}>
      <CancelledDialog />
      <RatingDialog />
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <OrderInfo />
        </Grid>
        <Grid item xs={3}>
          <OrderHistory />
          <OrderAction />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;
