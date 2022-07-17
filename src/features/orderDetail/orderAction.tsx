import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderStatus } from "../../config.json";
import CancelIcon from "@mui/icons-material/Cancel";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  setCancelledDialogOpen,
  setRatingDialogOpen,
} from "../../app/store/ui/orderDetailPage";

export interface OrderActionProps {}

export default function OrderAction(props: OrderActionProps) {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.ui.orderDetailPage.orderDetail);

  if (order === null) return null;

  const renderButton = () => {
    const pending = orderStatus.pending.statusCode;
    const toPrepare = orderStatus.toPrepare.statusCode;
    const toPickup = orderStatus.toPickup.statusCode;

    if (
      order.status === pending ||
      order.status === toPrepare ||
      order.status === toPickup
    )
      return (
        <Button
          variant="contained"
          color="error"
          fullWidth
          endIcon={<CancelIcon />}
          onClick={() => {
            dispatch(setCancelledDialogOpen(true));
          }}
        >
          Hủy Đơn Hàng
        </Button>
      );

    if (order.status === orderStatus.shipped.statusCode)
      return (
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={order.isRated}
          endIcon={<StarBorderIcon />}
          onClick={() => dispatch(setRatingDialogOpen(true))}
        >
          Đánh giá
        </Button>
      );

    return null;
  };

  return <Box sx={{ mt: 2 }}>{renderButton()}</Box>;
}
